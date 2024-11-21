import React, { useCallback } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import colors from "../../style/Colors";
import { getBrandLogo } from "../../utils/CommonUtils";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utils/Metrics";
import RadioButton from "../Button/RadioButton";

const CardMenu = ({ title, subtitle, onSelect, option, brand }) => {
  const selectHandler = useCallback(() => {
    onSelect(title);
  }, [onSelect, title]);

  return (
    <View style={styles.cardContainer}>
      <RadioButton
        isSelected={title === option}
        onPress={() => selectHandler(title)}
      />
      <Content title={title} subtitle={subtitle} brand={brand} />
    </View>
  );
};

const Content = ({ title, subtitle, brand }) => (
  <View style={styles.textContainer}>
    <View style={styles.rowContainer}>
      {brand && (
        <Image
          source={getBrandLogo(brand)}
          style={styles.brandImage}
          resizeMode="contain"
        />
      )}
      <Text style={styles.titleStyle}>{title}</Text>
    </View>
    <Text style={styles.subtitleStyle}>{subtitle}</Text>
  </View>
);

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
    ...Platform.select({
      ios: {
        shadowColor: colors.grey700,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: moderateScale(2),
      },
    }),
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
    marginTop: verticalScale(6),
  },
  brandImage: {
    width: horizontalScale(40),
    height: verticalScale(20),
    marginRight: horizontalScale(4),
  },
  rowContainer: {
    flexDirection: "row",
  }
});

export default CardMenu;
