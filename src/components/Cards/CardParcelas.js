import React, { useCallback } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import colors from "../../style/Colors";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utils/Metrics";
import RadioButton from "../Button/RadioButton";

const CardParcelas = ({
  installments,
  installmentAmount,
  onSelect,
  option,
}) => {
  const handleSelect = useCallback(() => {
    onSelect(installments);
  }, [onSelect, installments]);

  return (
    <View style={styles.cardContainer}>
      <RadioButton
        isSelected={installments === option}
        onPress={() => handleSelect(installments)}
      />

      <InstallmentInfo
        installments={installments}
        installmentAmount={installmentAmount}
      />
    </View>
  );
};

const InstallmentInfo = ({ installments, installmentAmount }) => (
  <View style={styles.textContainer}>
    <Text style={styles.titleStyle}>
      {`${installments} x de ${installmentAmount}`}
    </Text>
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
    elevation: moderateScale(2),
    marginTop: verticalScale(8),
    marginHorizontal: horizontalScale(16),
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: colors.grey700,
        shadowOffset: { width: horizontalScale(0), height: verticalScale(2) },
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
});

export default CardParcelas;
