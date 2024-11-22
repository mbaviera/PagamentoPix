import React from "react";
import { View, Pressable } from "react-native";
import styles from "../../style";

const RadioButton = ({ isSelected, onPress }) => {
  return (
    <View style={styles.containerButton}>
      <Pressable
        style={({ pressed }) => [
          isSelected ? styles.selectedButton : styles.unselectedButton,
          pressed && styles.pressed,
        ]}
        onPress={onPress}
      />
    </View>
  );
}

export default RadioButton;