import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../constants/Colors/Colors";

export default function Footer({ valor, buttonDisabled, buttonText }) {
  return (
    <View style={styles.footerContainer}>
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.textTitle}>{`Valor a ser pago`}</Text>
        <Text style={styles.textSubtitle}>{`R$ ${valor}`}</Text>
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
        >
          <Text style={styles.textButtonContinuar}>{`${buttonText}`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    elevation: 20,
  },
  payButton: {
    paddingHorizontal: 16,
    paddingTop: 7,
    paddingBottom: 8,
    borderRadius: 100,
  },
  textTitle: {
    marginBottom: 2,
    fontVariant: "Montserrat-Regular",
    fontSize: 14,
  },
  textSubtitle: {
    marginTop: 2,
    fontVariant: "Montserrat-Bold",
    fontSize: 18,
  },
  textButtonContinuar: {
    textAlign: "center",
    color: colors.white,
  },
});
