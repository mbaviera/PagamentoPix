import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import HeaderButton from "../Button/HeaderButton/HeaderButton";
import colors from "../../constants/Colors/Colors";
import Text from "../Text/Text";

export default function Header({ titleHeader }) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.contentArea}>
        <HeaderButton
          iconName="chevron-left"
          iconSize={24}
          iconColor={colors.main800}
        />
      </View>

      <Text
        titulo='Transferencias'
        color={colors.grey800}
        size={24}
        fontFamily='Montserrat-Regular'
        lineHeight={28}
        fontWeight={600}
        backgroundColor={colors.grey100}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: colors.grey100,
  },
  contentArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 32,
    marginBottom: 24,
    backgroundColor: colors.grey100,
  },
});
