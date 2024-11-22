import React from "react";
import {
  Modal,
  SafeAreaView,
  Text,
  ScrollView,
  View,
} from "react-native";
import colors from "../../style/Colors";
import CardParcelas from "../Cards/CardParcelas";
import Footer from "../Footer/Footer";
import RoundedButton from "../Button/RoundedButton";
import consts from "../../constants/Consts";
import styles from "../../style";

const PaymentModal = ({
  visible,
  onClose,
  paymentSimulationItems,
  onSelect,
  amountToPay,
  buttonDisabled,
  onContinue,
  radioButtonInstallments,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.safeModalContainer}>
        <PaymentModalHeader onClose={onClose} />
        <PaymentModalBody
          paymentSimulationItems={paymentSimulationItems}
          onSelect={onSelect}
          option={radioButtonInstallments}
        />
        <PaymentModalFooter
          valor={amountToPay || "R$ 0,00"}
          buttonDisabled={buttonDisabled}
          onPress={onContinue}
        />
      </SafeAreaView>
    </Modal>
  );
};

const PaymentModalHeader = ({ onClose }) => (
  <View style={styles.headerModalContainer}>
    <Text style={styles.modalTitle}>{consts.parcelasPagamento}</Text>
    <RoundedButton
      iconName="close"
      iconSize={24}
      iconColor={colors.main800}
      onPress={onClose}
    />
  </View>
);

const PaymentModalFooter = ({ valor, buttonDisabled, onPress }) => (
  <Footer
    valor={valor}
    buttonText="Continuar"
    buttonDisabled={buttonDisabled}
    onPress={onPress}
  />
);

const PaymentModalBody = ({ paymentSimulationItems, onSelect, option }) => (
  <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
    {paymentSimulationItems?.map((item) => (
      <CardParcelas
        key={item.installments}
        installments={item.installments}
        installmentAmount={item.installmentAmount?.toFixed(2).replace('.', ',')}
        onSelect={(value) => onSelect(value, false, item, item.fees)}
        option={option}
      />
    ))}
  </ScrollView>
);

export default PaymentModal;
