import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RoundedButton from "../Button/RoundedButton";
import colors from "../../style/Colors";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utils/Metrics";

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
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(16),
    backgroundColor: colors.grey100,
  },
  contentArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: verticalScale(32),
    marginBottom: verticalScale(24),
    backgroundColor: colors.grey100,
  },
  textTitle: {
    color: colors.grey800,
    fontSize: moderateScale(24),
    fontFamily: "Montserrat-Bold",
    lineHeight: verticalScale(24),
    backgroundColor: colors.grey100,
  },
});

export default Header;
