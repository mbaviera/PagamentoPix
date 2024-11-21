import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../../constants/Colors";
import { getBrandLogo } from "../../utils/CommonUtils";

const CardMenu = ({ title, subtitle, onSelect, option, brand }) => {
  const [userOption, setUserOption] = useState("Saldo em conta");
  const selectHandler = (value) => {
    onSelect(value);
    setUserOption(value);
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.containerButton}>
        <Pressable
          style={title === option ? styles.selected : styles.unselected}
          onPress={() => selectHandler(title)}
        />
      </View>

      <View style={styles.textContainer}>
        <View style={{ flexDirection: 'row' }}>
          {brand && <Image source={getBrandLogo(brand)} style={styles.brandImage} resizeMode="contain"/>}
          <Text style={styles.titleStyle}>{`${title}`}</Text>
        </View>
        <Text style={styles.subtitleStyle}>{`${subtitle}`}</Text>
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
    elevation: 6,
    marginTop: 8,
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
  subtitleStyle: {
    color: colors.grey700,
    fontSize: 12,
    fontFamily: "Montserrat-Regular",
    lineHeight: 20,
    backgroundColor: colors.white,
    marginTop: 6
  },
  containerButton: {
    borderColor: colors.main700,
    borderRadius: 50,
    borderWidth: 2,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
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
  brandImage: {
    width: 40,
    height: 20,
    marginRight: 4
  },
});

export default CardMenu;
