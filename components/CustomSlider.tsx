import React from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';

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
  const sliderWidth = 280;
  const thumbSize = 24;
  
  const percentage = (value - min) / (max - min);
  const thumbPosition = percentage * (sliderWidth - thumbSize);
  
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt, gestureState) => {
      const { locationX } = evt.nativeEvent;
      updateValue(locationX);
    },
    onPanResponderMove: (evt, gestureState) => {
      const { locationX } = evt.nativeEvent;
      updateValue(locationX);
    },
    onPanResponderRelease: () => {
      // Optional: Add any cleanup or final value setting
    },
  });

  const updateValue = (locationX: number) => {
    const clampedLocationX = Math.max(0, Math.min(sliderWidth, locationX));
    const percentage = clampedLocationX / sliderWidth;
    const newValue = min + percentage * (max - min);
    const steppedValue = Math.round(newValue / step) * step;
    const finalValue = Math.max(min, Math.min(max, steppedValue));
    onValueChange(finalValue);
  };

  const handleTrackPress = (evt: any) => {
    const { locationX } = evt.nativeEvent;
    updateValue(locationX);
  };

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          <Text style={[styles.value, { color }]}>
            {value.toLocaleString()}{unit}
          </Text>
        </View>
      )}
      
      <View style={styles.sliderContainer}>
        <View 
          style={[styles.track, { width: sliderWidth }]}
          onTouchEnd={handleTrackPress}
        >
          <View style={[styles.trackFill, { backgroundColor: color, width: thumbPosition + thumbSize / 2 }]} />
        </View>
        
        <View
          style={[styles.thumb, { backgroundColor: color, left: thumbPosition }]}
          {...panResponder.panHandlers}
        >
          <View style={styles.thumbInner} />
        </View>
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