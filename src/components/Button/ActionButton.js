import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../../style/Colors";
import { horizontalScale, moderateScale, verticalScale } from "../../utils/Metrics";

const ActionButton = ({ buttonDisabled, buttonText, onPress }) => (
  <TouchableOpacity
    style={[
      styles.payButton,
      { backgroundColor: buttonDisabled ? colors.grey : colors.main700 },
    ]}
    disabled={buttonDisabled}
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel="Continuar para pagamento"
  >
    <Text style={styles.textActionButton}>{buttonText}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  payButton: {
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(7),
    paddingBottom: verticalScale(8),
    borderRadius: moderateScale(100),
  },
  textActionButton: {
    textAlign: "center",
    color: colors.white,
  },
});

export default ActionButton;
