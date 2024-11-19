import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HeaderButton from "../Button/HeaderButton/HeaderButton";
import colors from "../../constants/Colors/Colors";

export default function Footer({ valor, buttonDisabled }) {
  return (
    <View style={styles.footerContainer}>
      <View style={{ flexDirection: "column" }}>        
        <Text
          style={{
            marginBottom: 2,
            fontVariant: "Montserrat-Regular",
            fontSize: 14,
          }}
        >
          Valor a ser pago
        </Text>
        <Text
          style={{ marginTop: 2, fontVariant: "Montserrat-Bold", fontSize: 18 }}
        >
          R$ {valor}
        </Text>
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
          <Text style={{ textAlign: "center", color: colors.white }}>
            Pagar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    elevation: 20
  },
  payButton: {
    paddingHorizontal: 16,
    paddingTop: 7,
    paddingBottom: 8,
    borderRadius: 100,
  },
});
