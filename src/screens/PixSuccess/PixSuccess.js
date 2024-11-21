import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { horizontalScale, moderateScale, verticalScale } from "../../utils/Metrics";
import colors from "../../constants/Colors";

const PixSuccess = ({ route, navigation }) => {
  const { name, transferredValue, payedValue, paymentDate } = route.params;
  const handleClose = () => {
    navigation.navigate('Payment', { resetData: true });
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.closeButton} onPress={handleClose}>
        <Icon name="close" size={24} color="black" />
      </Pressable>

      <Text style={styles.title}>Pix realizado com sucesso!</Text>

      <View style={styles.iconContainer}>
        <Icon name="check-circle" size={80} color={colors.main700} />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Para</Text>
            <Text style={styles.receiver}>{name}</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>Data</Text>
            <Text style={styles.value}>{paymentDate}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Valor Transferido</Text>
            <Text style={styles.value}>R$ {transferredValue.toFixed(2)}</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>Valor Pago</Text>
            <Text style={styles.value}>{payedValue}</Text>
          </View>
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
    paddingTop: verticalScale(20),
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
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
  },
  label: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
    color: colors.grey700,
    marginBottom: verticalScale(4),
    textAlign: "center",
  },
  receiver: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
    color: colors.grey800,
    marginBottom: verticalScale(16),
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  column: {
    alignItems: "center",
    flex: 1,
  },
  value: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
    color: colors.grey800,
    marginTop: verticalScale(4),
  },
});

export default PixSuccess;
