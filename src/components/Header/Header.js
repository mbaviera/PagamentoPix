import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HeaderButton from "../Button/HeaderButton/HeaderButton";
import colors from "../../constants/Colors/Colors";

export default function Header({ titleHeader }) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.contentArea}>
        <HeaderButton iconName='chevron-left' iconSize={24} iconColor={colors.main800} />       
      </View>

      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          lineHeight: 28,
          backgroundColor: "white",
        }}
      >
        Tranferencia Pix
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  contentArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 32,
    marginBottom: 24,
  },
});
