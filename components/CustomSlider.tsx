import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

interface CustomSliderProps {
  min: number;
  max: number;
  value: number;
  onValueChange: (value: number) => void;
  step?: number;
  label?: string;
  unit?: string;
  color?: string;
}

export default function CustomSlider({
  min,
  max,
  value,
  onValueChange,
  step = 1,
  label,
  unit = '',
  color = '#2563EB'
}: CustomSliderProps) {
  const screenWidth = Dimensions.get('window').width;
  const sliderWidth = screenWidth - 80; // Account for padding
  const thumbSize = 24;
  const trackRef = useRef<View>(null);
  
  const [sliderValue, setSliderValue] = useState(value);
  const [trackLayout, setTrackLayout] = useState({ x: 0, width: sliderWidth });
  
  // Update internal state when prop changes
  useEffect(() => {
    setSliderValue(value);
  }, [value]);
  
  const percentage = (sliderValue - min) / (max - min);
  const thumbPosition = percentage * (sliderWidth - thumbSize);
  
  const updateValue = (touchX: number) => {
    // Calculate relative position within the track
    const relativeX = touchX - trackLayout.x;
    const clampedX = Math.max(0, Math.min(trackLayout.width, relativeX));
    const percentage = clampedX / trackLayout.width;
    const newValue = min + percentage * (max - min);
    const steppedValue = Math.round(newValue / step) * step;
    const finalValue = Math.max(min, Math.min(max, steppedValue));
    
    // Only update if we have a valid number
    if (!isNaN(finalValue) && isFinite(finalValue)) {
      setSliderValue(finalValue);
      onValueChange(finalValue);
    }
  };

  const handleTrackPress = (evt: any) => {
    try {
      const { pageX } = evt.nativeEvent;
      if (typeof pageX === 'number' && !isNaN(pageX)) {
        updateValue(pageX);
      }
    } catch (error) {
      console.log('Slider touch error:', error);
    }
  };

  const handleTrackLayout = (event: any) => {
    const { x, width } = event.nativeEvent.layout;
    setTrackLayout({ x, width });
  };

  const handleThumbPress = (evt: any) => {
    // Prevent track press when thumb is pressed
    evt.stopPropagation();
  };

  // Format the display value to prevent NaN
  const displayValue = isNaN(sliderValue) || !isFinite(sliderValue) ? value : sliderValue;

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          <Text style={[styles.value, { color }]}>
            {displayValue.toLocaleString()}{unit}
          </Text>
        </View>
      )}
      
      <View style={styles.sliderContainer}>
        <TouchableOpacity
          ref={trackRef}
          style={[styles.track, { width: sliderWidth }]}
          onPress={handleTrackPress}
          onLayout={handleTrackLayout}
          activeOpacity={0.8}
        >
          <View style={[styles.trackFill, { backgroundColor: color, width: thumbPosition + thumbSize / 2 }]} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.thumb, { backgroundColor: color, left: thumbPosition }]}
          onPress={handleThumbPress}
          activeOpacity={0.8}
        >
          <View style={styles.thumbInner} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.rangeContainer}>
        <Text style={styles.rangeText}>{min.toLocaleString()}{unit}</Text>
        <Text style={styles.rangeText}>{max.toLocaleString()}{unit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
  },
  sliderContainer: {
    height: 40,
    justifyContent: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  track: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    position: 'absolute',
  },
  trackFill: {
    height: 6,
    borderRadius: 3,
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  thumbInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  rangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  rangeText: {
    fontSize: 12,
    color: '#6B7280',
  },
});