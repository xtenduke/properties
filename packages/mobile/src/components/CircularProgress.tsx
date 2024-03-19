import React from 'react';
import {View} from 'react-native';
import {Svg, Circle} from 'react-native-svg';

const CircularProgress = ({percentage, style}) => {
  // Extract width and height from styles
  const width = style.width;
  const height = style.height;

  // Thanks chatppt
  const strokeWidth = 2;
  const radius = (Math.min(width, height) / 2) - strokeWidth;

  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={[style, {width, height}]}>
      <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
        {/* Background Circle */}
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="white"
          fill="none"
          strokeOpacity={0.5}
        />
        {/* Progress Circle */}
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="#46E1B2"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${width / 2} ${height / 2})`}
        />
      </Svg>
    </View>
  );
};

export default CircularProgress;