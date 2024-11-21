import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../style/Colors";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utils/Metrics";
import ActionButton from "../Button/ActionButton";
import consts from "../../constants/Consts";

const Footer = ({ valor, buttonDisabled, buttonText, onPress }) => {
  return (
    <View style={styles.footerContainer}>
      <PaymentInfo valor={valor} />
      <ActionButton
        buttonDisabled={buttonDisabled}
        buttonText={buttonText}
        onPress={onPress}
      />
    </View>
  );
};

const PaymentInfo = ({ valor }) => (
  <View style={styles.paymentInfoContainer}>
    <Text style={styles.textTitle}>{consts.valorSerPago}</Text>
    <Text style={styles.textSubtitle}>{valor}</Text>
  </View>
);

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
    ...Platform.select({
      ios: {
        shadowColor: colors.grey700,
        shadowOffset: { width: horizontalScale(1), height: verticalScale(1) },
        shadowOpacity: 0.5,
        shadowRadius: moderateScale(1),
      },
    }),
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
});

export default Footer;
