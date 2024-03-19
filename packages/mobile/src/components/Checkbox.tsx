import React from 'react';
import {StyleSheet, View} from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import Checked from "../../assets/ic_checkbox_green.svg";

const Checkbox = ({ checked, style }) => {
    // Extract width and height from styles
    const width = style.width;
    const height = style.height;
    const strokeWidth = 2;
    const radius = (Math.min(width, height) / 2) - strokeWidth;

    const renderChecked = () => {
      return (<Checked height={height} width={width} />)
    }

    const renderUnchecked = () => {
      return (
      <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="white"
          fill="none"
          strokeOpacity={0.5}
        />
      </Svg>)
    }

    return (
      <View style={[style, {width, height, ...styles.container}]}>
        {checked ? renderChecked() : renderUnchecked()}
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
  }
})

export default Checkbox;