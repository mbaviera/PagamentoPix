import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../constants/Colors";
import { horizontalScale, moderateScale, verticalScale } from "../../utils/Metrics";

const Footer = ({ valor, buttonDisabled, buttonText, onPress }) => {
  return (
    <View style={styles.footerContainer}>
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.textTitle}>{`Valor a ser pago`}</Text>
        <Text style={styles.textSubtitle}>{`${valor}`}</Text>
      </View>

      <View style={{ justifyContent: "center" }}>
        <TouchableOpacity
          style={[
            styles.payButton,
            {
              backgroundColor: buttonDisabled ? colors.grey : colors.main700,
            },
          ]}
          disabled={buttonDisabled}
          onPress={onPress}
        >
          <Text style={styles.textButtonContinuar}>{`${buttonText}`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
    elevation: moderateScale(20),
  },
  payButton: {
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(7),
    paddingBottom: verticalScale(8),
    borderRadius: moderateScale(100),
  },
  textTitle: {
    marginBottom: verticalScale(2),
    fontFamily: "Montserrat-Regular",
    fontSize: moderateScale(14),
  },
  textSubtitle: {
    marginTop: verticalScale(2),
    fontFamily: "Montserrat-Bold",
    fontSize: moderateScale(18),
  },
  textButtonContinuar: {
    textAlign: "center",
    color: colors.white,
  },
});

export default Footer;
