import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../style/Colors";
import RoundedButton from "../../components/Button/RoundedButton";
import consts from "../../constants/Consts";
import ResultRow from "../../components/Text/ResultRow";
import styles from "../../style";

const PixSuccess = ({ route, navigation }) => {
  const { name, transferredValue, payedValue, paymentDate } = route.params;
  const handleClose = () => {
    navigation.navigate("Payment", { resetData: true });
  };

  return (
    <View style={styles.successContainer}>
      <View style={styles.closeButtonContainer} onPress={handleClose}>
        <RoundedButton
          iconName={"close"}
          iconSize={24}
          iconColor={colors.main800}
          onPress={handleClose}
        />
      </View>

      <Text style={styles.successScreenTitle}>{consts.pixSucesso}</Text>

      <View style={styles.successIconContainer}>
        <Icon name="check-circle" size={80} color={colors.main700} />
      </View>

      <View style={styles.successInfoContainer}>
        <View style={styles.successRowContainer}>
          <ResultRow title={consts.para} subtitle={name} />
          <ResultRow title={consts.data} subtitle={paymentDate} />
        </View>

        <View style={styles.successRowContainer}>
          <ResultRow
            title={consts.valorTransferido}
            subtitle={`R$ ${transferredValue.toFixed(2).replace('.', ',')}`}
          />
          <ResultRow title={consts.valorPago} subtitle={payedValue} />
        </View>
      </View>
    </View>
  );
};

export default PixSuccess;