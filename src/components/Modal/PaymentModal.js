import React from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  View,
} from "react-native";
import colors from "../../constants/Colors/Colors";
import CardParcelas from "../Cards/CardParcelas";
import Footer from "../Footer/Footer";
import RoundedButton from "../Button/RoundedButton";

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
              installmentAmount={item.installmentAmount}
              onSelect={(value) => onSelect(value, false, item)}
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
    marginTop: 80,
    elevation: 5,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  headerModalContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 16,
    marginTop: 25,
  },
  textTitleModal: {
    fontSize: 24,
  },
  subTitleModalContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    paddingBottom: 16,
  },
  textSubtitleModal: {
    fontSize: 16,
  },
});

export default PaymentModal;
