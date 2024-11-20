import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../../constants/Colors";

const CardParcelas = ({
  installments,
  installmentAmount,
  onSelect,
  option,
}) => {
  const handleSelect = () => onSelect(installments);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.containerButton}>
        <Pressable
          style={installments === option ? styles.selected : styles.unselected}
          onPress={handleSelect}
        />
      </View>

      <View style={styles.textContainer}>
        <Text
          style={styles.titleStyle}
        >{`${installments} x de ${installmentAmount}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 8,
    backgroundColor: colors.white,
    borderRadius: 6,
    elevation: 2,
    marginTop: 8,
    marginHorizontal: 16,
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "column",
    marginLeft: 10,
  },
  titleStyle: {
    color: colors.main700,
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
    lineHeight: 20,
    backgroundColor: colors.white,
  },
  containerButton: {
    borderColor: colors.main700,
    borderRadius: 50,
    borderWidth: 2,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  unselected: {
    width: 24,
    height: 24,
    backgroundColor: colors.white,
    margin: 5,
    borderRadius: 50,
  },
  selected: {
    width: 24,
    height: 24,
    backgroundColor: colors.main700,
    margin: 5,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.white,
  },
});

export default CardParcelas;
