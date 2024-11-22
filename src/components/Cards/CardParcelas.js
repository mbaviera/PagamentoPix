import React, { useCallback } from "react";
import { Text, View } from "react-native";
import RadioButton from "../Button/RadioButton";
import styles from "../../style";
import { horizontalScale } from "../../utils/Metrics";

const CardParcelas = ({
  installments,
  installmentAmount,
  onSelect,
  option,
}) => {
  const handleSelect = useCallback(() => {
    onSelect(installments);
  }, [onSelect, installments]);

  return (
    <View style={[styles.cardContainer, { marginHorizontal: horizontalScale(16)}]}>
      <RadioButton
        isSelected={installments === option}
        onPress={() => handleSelect(installments)}
      />

      <InstallmentInfo
        installments={installments}
        installmentAmount={installmentAmount}
      />
    </View>
  );
};

const InstallmentInfo = ({ installments, installmentAmount }) => (
  <View style={styles.textContainer}>
    <Text style={styles.cardTitle}>
      {`${installments} x de ${installmentAmount}`}
    </Text>
  </View>
);

export default CardParcelas;
