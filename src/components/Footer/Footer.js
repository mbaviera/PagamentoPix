import React from "react";
import {
  Text,
  View,
} from "react-native";
import ActionButton from "../Button/ActionButton";
import consts from "../../constants/Consts";
import styles from "../../style";

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
    <Text style={styles.footerTitle}>{consts.valorSerPago}</Text>
    <Text style={styles.footerSubtitle}>{valor}</Text>
  </View>
);

export default Footer;
