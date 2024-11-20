import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import colors from "../../constants/Colors";

export default function RadioButton({ data, onSelect }) {
  const [userOption, setUserOption] = useState(null);
  const selectHandler = (value) => {
    onSelect(value);
    setUserOption(value);
  };
  return (
    <View>
      {data.map((item) => {
        return (
          <View style={styles.containerButton}>
            <Pressable
              style={
                item.value === userOption ? styles.selected : styles.unselected
              }
              onPress={() => selectHandler(item.value)}
            >
              {/* <Text style={styles.option}>{item.value}</Text> */}
            </Pressable>
          </View>
        );
      })}
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
