import React, { useCallback } from "react";
import {
  Image,
  Text,
  View,
} from "react-native";
import { getBrandLogo } from "../../utils/CommonUtils";
import RadioButton from "../Button/RadioButton";
import styles from "../../style";

const CardMenu = ({ title, subtitle, onSelect, option, brand }) => {
  const selectHandler = useCallback(() => {
    onSelect(title);
  }, [onSelect, title]);

  return (
    <View style={styles.cardContainer}>
      <RadioButton
        isSelected={title === option}
        onPress={() => selectHandler(title)}
      />
      <Content title={title} subtitle={subtitle} brand={brand} />
    </View>
  );
};

const Content = ({ title, subtitle, brand }) => (
  <View style={styles.textContainer}>
    <View style={styles.rowContainer}>
      {brand && (
        <Image
          source={getBrandLogo(brand)}
          style={styles.brandImage}
          resizeMode="contain"
        />
      )}
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
    <Text style={styles.cardSubtitle}>{subtitle}</Text>
  </View>
);

export default CardMenu;
