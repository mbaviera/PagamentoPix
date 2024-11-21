import React from "react";
import { StyleSheet, Text, View, Pressable, Platform } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utils/Metrics";
import colors from "../../style/Colors";
import RoundedButton from "../../components/Button/RoundedButton";
import consts from "../../constants/Consts";
import ResultRow from "../../components/Text/ResultRow";

const PixSuccess = ({ route, navigation }) => {
  const { name, transferredValue, payedValue, paymentDate } = route.params;
  const handleClose = () => {
    navigation.navigate("Payment", { resetData: true });
  };

  return (
    <View style={styles.container}>
      <View style={styles.closeButton} onPress={handleClose}>
        <RoundedButton
          iconName={"close"}
          iconSize={24}
          iconColor={colors.main800}
          onPress={handleClose}
        />
      </View>

      <Text style={styles.title}>{consts.pixSucesso}</Text>

      <View style={styles.iconContainer}>
        <Icon name="check-circle" size={80} color={colors.main700} />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <ResultRow title={consts.para} subtitle={name} />
          <ResultRow title={consts.data} subtitle={paymentDate} />
        </View>

        <View style={styles.row}>
          <ResultRow
            title={consts.valorTransferido}
            subtitle={`R$ ${transferredValue.toFixed(2)}`}
          />
          <ResultRow title={consts.valorPago} subtitle={payedValue} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: horizontalScale(16),
    paddingTop: Platform.OS === 'ios' ? verticalScale(50) : verticalScale(10),
    alignItems: "center",
  },
  closeButton: {
    alignSelf: "flex-end",
    top: verticalScale(20),
    right: horizontalScale(16),
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    color: colors.grey700,
    marginTop: verticalScale(40),
    marginBottom: verticalScale(20),
    textAlign: "center",
  },
  iconContainer: {
    width: horizontalScale(100),
    height: verticalScale(100),
    borderRadius: moderateScale(50),
    backgroundColor: colors.main100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(20),
  },
  infoContainer: {
    width: "100%",
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(8),
    backgroundColor: colors.grey100,
    elevation: moderateScale(2),
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: colors.grey700,
        shadowOffset: { width: horizontalScale(0), height: verticalScale(2) },
        shadowOpacity: 0.5,
        shadowRadius: moderateScale(2),
      },
    }),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBlock: 8,
  },
});

export default PixSuccess;
