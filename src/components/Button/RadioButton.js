import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import colors from "../../style/Colors";

const RadioButton = ({ isSelected, onPress }) => {
  return (
    <View style={styles.containerButton}>
      <Pressable
        style={({ pressed }) => [
          isSelected ? styles.selected : styles.unselected,
          pressed && styles.pressed,
        ]}
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerButton: {
    borderColor: colors.main700,
    borderRadius: 50,
    borderWidth: 2,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  option: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  unselected: {
    width: 24,
    height: 24,
    backgroundColor: colors.white,
    margin: 5,
    borderRadius: 50,
  },
  selected: {
    width: 24,
    height: 24,
    backgroundColor: colors.main700,
    margin: 5,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.white,
  },
});

export default RadioButton;