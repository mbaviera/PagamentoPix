import React from "react";
import { Text, View, ActivityIndicator } from "react-native";
import colors from "../../style/Colors";
import styles from "../../style";

const Loading = ({ text }) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.greenSea100} style={styles.loadingIcon} />
      <Text style={styles.loadingText}>{text}</Text>
    </View>
  );
};

export default Loading;