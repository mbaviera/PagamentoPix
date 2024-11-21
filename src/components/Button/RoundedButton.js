import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../constants/Colors";
import { horizontalScale, moderateScale, verticalScale } from "../../utils/Metrics";

const RoundButton = ({ iconName, iconSize, iconColor, onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Icon name={iconName} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: horizontalScale(32),
    height: verticalScale(32),
    borderRadius: moderateScale(145),
    backgroundColor: colors.main100,
    alignItems: 'center',
    justifyContent: 'center',
  },  
});

export default RoundButton;