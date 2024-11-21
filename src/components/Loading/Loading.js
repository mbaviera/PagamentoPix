import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { moderateScale, verticalScale } from "../../utils/Metrics";
import colors from "../../style/Colors";

const Loading = ({ text }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.blueGreen100} style={styles.loader} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blueGreen200, // Cor de fundo
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    marginBottom: verticalScale(16), // Espaço entre o indicador e o texto
  },
  text: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center",
  },
});

export default Loading;