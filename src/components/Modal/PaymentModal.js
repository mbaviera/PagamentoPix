import React from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  View,
} from "react-native";
import colors from "../../constants/Colors";
import CardParcelas from "../Cards/CardParcelas";
import Footer from "../Footer/Footer";
import RoundedButton from "../Button/RoundedButton";
import { horizontalScale, moderateScale, verticalScale } from "../../utils/Metrics";

const PaymentModal = ({
  visible,
  onClose,
  paymentSimulationItems,
  onSelect,
  amountToPay,
  buttonDisabled,
  onContinue,
  radioButtonInstallments
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.safeContainerModal}>
        {/* Cabeçalho do modal */}
        <View style={styles.headerModalContainer}>
          <Text style={styles.textTitleModal}>Parcelas do pagamento</Text>
          <RoundedButton
            iconName={"close"}
            iconSize={24}
            iconColor={colors.main800}
            onPress={onClose}
          />
        </View>

        {/* Lista de Parcelas */}
        <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
          {paymentSimulationItems?.map((item) => (
            <CardParcelas
              key={item.installments}
              installments={item.installments}
              installmentAmount={item.installmentAmount?.toFixed(2)}
              onSelect={(value) => onSelect(value, false, item, item.fees)}
              option={radioButtonInstallments}
            />
          ))}
        </ScrollView>

        {/* Rodapé */}
        <Footer
          valor={amountToPay}
          buttonText={"Continuar"}
          buttonDisabled={buttonDisabled}
          onPress={onContinue}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeContainerModal: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: verticalScale(80),
    elevation: moderateScale(5),
    borderTopLeftRadius: horizontalScale(12),
    borderTopRightRadius: horizontalScale(12),    
  },
  headerModalContainer: {
    flexDirection: "row",
    paddingHorizontal: horizontalScale(16),
    justifyContent: "space-between",
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(16),
    marginTop: verticalScale(25),
  },
  textTitleModal: {
    fontSize: moderateScale(24),
  },
  subTitleModalContainer: {
    flexDirection: "row",
    paddingHorizontal: horizontalScale(16),
    justifyContent: "space-between",
    paddingBottom: verticalScale(16),
  },
  textSubtitleModal: {
    fontSize: moderateScale(16),
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: verticalScale(5),
  },
});

export default PaymentModal;
