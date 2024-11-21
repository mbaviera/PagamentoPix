import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { moderateScale, verticalScale } from "../../utils/Metrics";

const Loading = ({ text }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00bfa5" style={styles.loader} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00695c", // Cor de fundo
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    marginBottom: verticalScale(16), // Espaço entre o indicador e o texto
  },
  text: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
});

export default Loading;