import React from "react";
import { TouchableOpacity, Text } from "react-native";
import colors from "../../style/Colors";
import styles from "../../style";

const ActionButton = ({ buttonDisabled, buttonText, onPress }) => (
  <TouchableOpacity
    style={[
      styles.actionButton,
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

export default ActionButton;
