import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../../style";

const RoundButton = ({ iconName, iconSize, iconColor, onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Icon name={iconName} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
}

export default RoundButton;