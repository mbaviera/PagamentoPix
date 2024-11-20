import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import Header from "../../components/Header/Header";
import colors from "../../constants/Colors/Colors";
import CardMenu from "../../components/Cards/CardMenu";
import {
  getUserAccount,
  getUserCards,
  getPaymentSimulationItems,
  getPaymentInfo,
} from "../../service/UserApi";
import Footer from "../../components/Footer/Footer";
import Icon from "react-native-vector-icons/FontAwesome";
import CardParcelas from "../../components/Cards/CardParcelas";
import RoundedButton from "../../components/Button/RoundedButton";

export default function Payment({ navigation }) {
  const [cardInstallments, setCardInstallments] = useState(`Escolher Parcelas`); //card exibido ao selecionar algum cartao de credito
  const [paymentAmount, setPaymentAmount] = useState(100.00); //valor total sem taxas
  const [amountToPay, setAmountToPay] = useState(`R$ ${paymentAmount.toFixed(2)}`); //installments x installmentAmount
  const [installments, setInstallments] = useState(); //installments
  const [installmentAmount, setInstallmentAmount] = useState(); //installmentAmount

  const [cardFee, setCardFee] = useState();//taxa do cartao de credito
  const [installmentsFee, setInstallmentsFee] = useState();//taxa das parcelas

  const [userAccount, setUserAccount] = useState(getUserAccount());//dados da conta do usuario
  const [userCards, setUserCards] = useState(getUserCards());//cartoes de credito do usuario
  const [paymentInfo, setPaymentInfo] = useState(getPaymentInfo());//informacoes do pagamento do pix
  const [paymentSimulationItems, setPaymentSimulationItems] = useState(getPaymentSimulationItems());//informacoes do simulacao do pagamento do pix

  const [radioButtonMenu, setRadioButtonMenu] = useState("Saldo em conta");//radio button do menu principal
  const [radioButtonInstallments, setRadioButtonInstallments] = useState();//radio button do modal com a lista de parcelas

  const [buttonDisabled, setButtonDisabled] = useState(false);//habilitacao do botao de pagar/continuar
  const [modalVisible, setModalVisible] = useState(false);//modal com a lista das parcelas do pagamento

  //funcao de controle do click nos botoes radio da tela de menu
  const handleRadioButtonMenuClick = (value, buttonDisabled) => {
    setRadioButtonMenu(value);
    setButtonDisabled(buttonDisabled);
  };

  //funcao de controle do click nos botoes radio das parcelas de pagamento
  const handleRadioButtonInstallmentsClick = (
    value,
    buttonDisabled,
    amountToPay,
    installmentAmount,
    installments,
    fees
  ) => {
    setRadioButtonInstallments(value);
    setButtonDisabled(buttonDisabled);

    setInstallmentAmount(installmentAmount);
    setAmountToPay(`${installments}x de R$ ${installmentAmount.toFixed(2)}`);
    setInstallments(installments);

    setCardFee(fees.fixedAmount);
    setInstallmentsFee(fees.installmentAmount);    
  };

  //funcao de controle para mostrar o modal com as parcelas de pagamento
  const handleShowModal = (modalVisible) => {
    setModalVisible(modalVisible);
    setButtonDisabled(true);
  };

  //funcao de controle para fechar o modal com as parcelas de pagamento
  const handleCloseModal = () => {
    setRadioButtonInstallments();
    setAmountToPay(`R$ ${paymentAmount.toFixed(2)}`);
    setModalVisible(false);
    setButtonDisabled(true);
  };

  const renderModalParcelas = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => handleCloseModal()}
      >
        <SafeAreaView style={styles.safeContainerModal}>
          <View style={styles.headerModalContainer}>
            <Text style={styles.textTitleModal}>Parcelas do pagamento</Text>
            <RoundedButton
              iconName={"close"}
              iconSize={24}
              iconColor={colors.main800}
              onPress={() => handleCloseModal(false)}
            />
          </View>

          <View style={styles.subTitleModalContainer}>
            <Text style={styles.textSubtitleModal}>
              O destinatário receberá a vista e você pagara parcelado.
            </Text>
          </View>

          <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
            {paymentSimulationItems?.map((item) => (
              <CardParcelas
                key={item.installments}
                installments={item.installments}
                installmentAmount={item.installmentAmount}
                onSelect={(value) =>
                  handleRadioButtonInstallmentsClick(
                    value,
                    false,
                    item.amountToPay,
                    item.installmentAmount,
                    item.installments,
                    item.fees
                  )
                }
                option={radioButtonInstallments}
              />
            ))}
          </ScrollView>
          <Footer
            valor={amountToPay}
            buttonText={"Continuar"}
            buttonDisabled={buttonDisabled}
          />
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderModalParcelas()}
      <Header titleHeader={"Transferência Pix"} />
      <View style={styles.textContainer}>
        <Text style={styles.paymentSubtitle}>
          Escolha uma forma de pagamento
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
        <View style={styles.textContainer}>
          <Text style={styles.textConta}>Conta Midway</Text>
          {userAccount?.map((item) => (
            <CardMenu
              key={item.accountId}
              title={"Saldo em conta"}
              subtitle={`Disponível R$ ${item.balance}`}
              onSelect={(value) => handleRadioButtonMenuClick(value, false)}
              option={radioButtonMenu}
            />
          ))}
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.textCartoes}>Cartões de Crédito</Text>
          {userCards?.map((item) => (
            <>
              <CardMenu
                key={item.name}
                title={item.name}
                subtitle={item.cardNumber}
                onSelect={(value) =>
                  handleRadioButtonMenuClick(value, true)
                }
                option={radioButtonMenu}
              />
              {radioButtonMenu === item.name ? (
                <TouchableOpacity
                  style={styles.parcelasContainer}
                  onPress={() => handleShowModal(true)}
                >
                  <Text style={styles.textParcelas}>{`${cardInstallments}`}</Text>
                  <Icon name="chevron-right" size={18} color={colors.main700} />
                </TouchableOpacity>
              ) : null}
            </>
          ))}
        </View>
      </ScrollView>
      <Footer
        valor={amountToPay}
        buttonDisabled={buttonDisabled}
        buttonText={"Pagar"}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey100,
  },
  textContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: colors.grey100,
  },
  paymentSubtitle: {
    color: colors.black,
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
    lineHeight: 20,
    backgroundColor: colors.grey100,
  },
  textConta: {
    color: colors.lightBlack,
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
    lineHeight: 20,
    backgroundColor: colors.grey100,
    paddingVertical: 12,
  },
  textCartoes: {
    color: colors.lightBlack,
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
    lineHeight: 20,
    backgroundColor: colors.grey100,
    paddingVertical: 12,
    textAlign: "center",
  },
  parcelasContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    marginVertical: 16,
    borderRadius: 8,
  },
  textParcelas: {
    color: colors.main700,
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
    lineHeight: 20,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 5
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
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
