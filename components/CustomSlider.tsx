import React from 'react';
import { View, Text, StyleSheet, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native';
import { useSharedValue, useAnimatedGestureHandler, useAnimatedStyle, runOnJS } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

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
  
  const translateX = useSharedValue((value - min) / (max - min) * (sliderWidth - thumbSize));
  
  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: (_, context) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      const newTranslateX = Math.max(0, Math.min(sliderWidth - thumbSize, context.startX + event.translationX));
      translateX.value = newTranslateX;
      
      const percentage = newTranslateX / (sliderWidth - thumbSize);
      const newValue = min + percentage * (max - min);
      const steppedValue = Math.round(newValue / step) * step;
      
      runOnJS(onValueChange)(Math.max(min, Math.min(max, steppedValue)));
    },
  });

  const thumbStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const trackFillStyle = useAnimatedStyle(() => {
    return {
      width: translateX.value + thumbSize / 2,
    };
  });

  // Update thumb position when value changes externally
  React.useEffect(() => {
    translateX.value = (value - min) / (max - min) * (sliderWidth - thumbSize);
  }, [value, min, max, sliderWidth, thumbSize]);

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
        <View style={[styles.track, { width: sliderWidth }]}>
          <Animated.View style={[styles.trackFill, { backgroundColor: color }, trackFillStyle]} />
        </View>
        
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.thumb, { backgroundColor: color }, thumbStyle]}>
            <View style={styles.thumbInner} />
          </Animated.View>
        </PanGestureHandler>
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