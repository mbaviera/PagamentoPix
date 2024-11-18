import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import Header from "../../components/Header/Header";
import colors from "../../constants/Colors/Colors";

export default function Payment({ navigation }) {
  return (
    <>
      <SafeAreaView>
        <View style={{ backgroundColor: colors.grey100 }}>
          <Header />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({});
