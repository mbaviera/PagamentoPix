import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RoundedButton from "../Button/RoundedButton";
import colors from "../../constants/Colors/Colors";

const Header = ({ titleHeader }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.contentArea}>
        <RoundedButton
          iconName="chevron-left"
          iconSize={20}
          iconColor={colors.main800}
        />
      </View>
      <Text style={styles.textTitle}>{`${titleHeader}`}</Text>
    </View>
  );
};

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
  textTitle: {
    color: colors.grey800,
    fontSize: 24,
    fontFamily: "Montserrat-Bold",
    lineHeight: 28,
    backgroundColor: colors.grey100,
  },
});

export default Header;
