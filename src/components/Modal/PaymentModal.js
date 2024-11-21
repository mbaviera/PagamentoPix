import React from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  View,
} from "react-native";
import colors from "../../style/Colors";
import CardParcelas from "../Cards/CardParcelas";
import Footer from "../Footer/Footer";
import RoundedButton from "../Button/RoundedButton";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utils/Metrics";
import consts from "../../constants/Consts";

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
      <SafeAreaView style={styles.safeContainerModal}>
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
    <Text style={styles.textTitleModal}>{consts.parcelasPagamento}</Text>
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
