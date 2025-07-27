import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, PanResponder, GestureResponderEvent, PanResponderGestureState } from 'react-native';

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
  const thumbSize = 32; // Larger thumb
  const trackRef = useRef<View>(null);
  
  const [sliderValue, setSliderValue] = useState(value);
  const [trackLayout, setTrackLayout] = useState({ x: 0, width: sliderWidth });
  const [dragging, setDragging] = useState(false);
  
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

  // PanResponder for smooth dragging
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        setDragging(true);
      },
      onPanResponderMove: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        const touchX = evt.nativeEvent.pageX;
        updateValue(touchX);
      },
      onPanResponderRelease: () => {
        setDragging(false);
      },
      onPanResponderTerminate: () => {
        setDragging(false);
      },
    })
  ).current;

  // Format the display value to prevent NaN
  const displayValue = isNaN(sliderValue) || !isFinite(sliderValue) ? value : sliderValue;

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}
      <View style={styles.sliderRow}>
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
          <View
            style={[styles.thumb, { backgroundColor: '#FFF', borderColor: color, left: thumbPosition }]}
            {...panResponder.panHandlers}
          >
            <View style={[styles.thumbInner, { backgroundColor: color }]} />
          </View>
        </View>
        <Text style={[styles.value, { color }]}>{displayValue.toLocaleString()}{unit}</Text>
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
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginLeft: 2,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sliderContainer: {
    height: 48,
    justifyContent: 'center',
    position: 'relative',
    flex: 1,
    marginRight: 16,
  },
  track: {
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    position: 'absolute',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  trackFill: {
    height: 12,
    borderRadius: 6,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  thumb: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    elevation: 6,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
  },
  thumbInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#2563EB',
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 12,
    minWidth: 60,
    textAlign: 'right',
    display: 'none',
  },
  rangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginTop: 2,
  },
  rangeText: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '500',
  },
});