import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../../constants/Colors";
import { getBrandLogo } from "../../utils/CommonUtils";
import { horizontalScale, moderateScale, verticalScale } from "../../utils/Metrics";

const CardMenu = ({ title, subtitle, onSelect, option, brand }) => {
  const selectHandler = (value) => {
    onSelect(value);
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.containerButton}>
        <Pressable
          style={title === option ? styles.selected : styles.unselected}
          onPress={() => selectHandler(title)}
        />
      </View>

      <View style={styles.textContainer}>
        <View style={{ flexDirection: 'row' }}>
          {brand && <Image source={getBrandLogo(brand)} style={styles.brandImage} resizeMode="contain"/>}
          <Text style={styles.titleStyle}>{`${title}`}</Text>
        </View>
        <Text style={styles.subtitleStyle}>{`${subtitle}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    paddingVertical: verticalScale(12),
    paddingLeft: horizontalScale(16),
    paddingRight: horizontalScale(8),
    backgroundColor: colors.white,
    borderRadius: moderateScale(6),
    elevation: moderateScale(6),
    marginTop: verticalScale(8),
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "column",
    marginLeft: horizontalScale(10),
  },
  titleStyle: {
    color: colors.main700,
    fontSize: moderateScale(16),
    fontFamily: "Montserrat-SemiBold",
    lineHeight: verticalScale(20),
    backgroundColor: colors.white,
  },
  subtitleStyle: {
    color: colors.grey700,
    fontSize: moderateScale(12),
    fontFamily: "Montserrat-Regular",
    lineHeight: verticalScale(20),
    backgroundColor: colors.white,
    marginTop: verticalScale(6)
  },
  containerButton: {
    borderColor: colors.main700,
    borderRadius: moderateScale(50),
    borderWidth: horizontalScale(2),
    width: horizontalScale(28),
    height: verticalScale(28),
    justifyContent: "center",
    alignItems: "center",
  },
  unselected: {
    width: horizontalScale(24),
    height: verticalScale(24),
    backgroundColor: colors.white,
    marginVertical: horizontalScale(5),
    marginHorizontal: verticalScale(5),
    borderRadius: moderateScale(50),
  },
  selected: {
    width: horizontalScale(24),
    height: verticalScale(24),
    backgroundColor: colors.main700,
    marginVertical: horizontalScale(5),
    marginHorizontal: verticalScale(5),
    borderRadius: moderateScale(50),
    borderWidth: 2,
    borderColor: colors.white,
  },
  brandImage: {
    width: horizontalScale(40),
    height: verticalScale(20),
    marginRight: horizontalScale(4)
  },
});

export default CardMenu;
