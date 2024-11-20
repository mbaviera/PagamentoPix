import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import colors from "../../constants/Colors/Colors";
import CardMenu from "../../components/Cards/CardMenu";
import {
  getUserAccount,
  getUserCards,
  getPaymentSimulationItems,
  getPaymentInfo,
  getPaymentInitialData,
} from "../../service/UserApi";
import Footer from "../../components/Footer/Footer";
import Icon from "react-native-vector-icons/FontAwesome";
import CardParcelas from "../../components/Cards/CardParcelas";
import RoundedButton from "../../components/Button/RoundedButton";
import ProcessingTransferLoading from "../../components/Loading/ProcessingTransferLoading";

const Payment = ({ navigation }) => {
  const paymentInitialData = getPaymentInitialData();
  const [userAccount, setUserAccount] = useState(getUserAccount()); //dados da conta do usuario
  const [userCards, setUserCards] = useState(getUserCards()); //cartoes de credito do usuario
  const [paymentInfo, setPaymentInfo] = useState(getPaymentInfo()); //informacoes do pagamento do pix
  const [paymentSimulationItems, setPaymentSimulationItems] = useState(
    getPaymentSimulationItems()
  ); //informacoes do simulacao do pagamento do pix

  const [cardFee, setCardFee] = useState(); //taxa do cartao de credito
  const [installmentsFee, setInstallmentsFee] = useState(); //taxa das parcelas

  const [paymentAmount, setPaymentAmount] = useState(paymentInitialData.amount); //valor total sem taxas
  const [receiverName, setReceiverName] = useState(paymentInitialData.name); //nome de quem esta recebendo o pix
  const [amountToPay, setAmountToPay] = useState(
    `R$ ${paymentAmount?.toFixed(2)}`
  ); //valor a pagar (installments x installmentAmount)
  const [installments, setInstallments] = useState(); //parcelas (installments)
  const [installmentAmount, setInstallmentAmount] = useState(); //valor das parcelas (installmentAmount)

  const [cardInstallments, setCardInstallments] = useState(`Escolher Parcelas`); //card exibido ao selecionar algum cartao de credito
  const [radioButtonMenu, setRadioButtonMenu] = useState("Saldo em conta"); //radio button do menu principal
  const [radioButtonInstallments, setRadioButtonInstallments] = useState(); //radio button do modal com a lista de parcelas

  const [buttonDisabled, setButtonDisabled] = useState(false); //habilitacao do botao de pagar/continuar
  const [modalVisible, setModalVisible] = useState(false); //modal com a lista das parcelas do pagamento
  const [showCheckCard, setShowCheckCard] = useState(false); //card com as informacoes finais do pagamento com cartao de credito
  const [processPayment, setProcessPayment] = useState(false);  

  //funcao de controle do click nos botoes radio da tela de menu
  const handleRadioButtonMenuClick = (value, buttonDisabled) => {
    setRadioButtonMenu(value);
    setButtonDisabled(buttonDisabled);
    setShowCheckCard(false);
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

  //funcao de controle do botao de continuar dentro do modal com as listas de parcelas
  const handleContinueButton = () => {
    setShowCheckCard(true);
    setCardInstallments(amountToPay);
    setModalVisible(false);
  };

  //funcao de controle do pagamento
  const handleProcessPayment = () => {
    setProcessPayment(true);
    setTimeout(() => {//timeout adicionado apenas para fins de exibicao da tela de loaging
      setProcessPayment(false);
      navigation.navigate("PixSuccess");
    }, 1000);
  };

  if (processPayment) {
    return <ProcessingTransferLoading text={"Processando sua transferência"} />;
  }

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
            onPress={() => handleContinueButton()}
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
            <View key={item.name}>
              <CardMenu
                title={item.name}
                subtitle={item.cardNumber}
                onSelect={(value) => handleRadioButtonMenuClick(value, true)}
                option={radioButtonMenu}
              />
              {radioButtonMenu === item.name ? (
                <>
                  <TouchableOpacity
                    style={styles.parcelasContainer}
                    onPress={() => handleShowModal(true)}
                  >
                    <Text
                      style={styles.textParcelas}
                    >{`${cardInstallments}`}</Text>
                    <Icon
                      name="chevron-right"
                      size={18}
                      color={colors.main700}
                    />
                  </TouchableOpacity>
                  {showCheckCard ? (
                    <View style={styles.checkContainer}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text>Valor a transferir</Text>
                        <Text>{`R$ ${paymentAmount?.toFixed(2)}`}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text>Taxa do cartão</Text>
                        <Text>100</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text>Taxa de parcelamento</Text>
                        <Text>-</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text>Valor a transferir + taxas</Text>
                        <Text>{amountToPay}</Text>
                      </View>
                    </View>
                  ) : null}
                </>
              ) : null}
            </View>
          ))}
        </View>
      </ScrollView>
      <Footer
        valor={amountToPay}
        buttonDisabled={buttonDisabled}
        buttonText={"Pagar"}
        onPress={() => handleProcessPayment()}
      />
    </SafeAreaView>
  );
};

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
  checkContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
  },
  textParcelas: {
    color: colors.main700,
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
    lineHeight: 20,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 5,
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

export default Payment;
