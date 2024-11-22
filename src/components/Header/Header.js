import React from "react";
import { Text, View } from "react-native";
import RoundedButton from "../Button/RoundedButton";
import colors from "../../style/Colors";
import styles from "../../style";

const Header = ({ titleHeader }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContentArea}>
        <RoundedButton
          iconName="chevron-left"
          iconSize={20}
          iconColor={colors.main800}
        />
      </View>
      <Text style={styles.headerTitle}>{`${titleHeader}`}</Text>
    </View>
  );
};

export default Header;
