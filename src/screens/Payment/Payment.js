import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
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
import PaymentModal from "../../components/Modal/PaymentModal";
import Loading from "../../components/Loading/ProcessingTransferLoading";

const Payment = ({ navigation }) => {
  const paymentInitialData = getPaymentInitialData();
  const [userAccount, setUserAccount] = useState(); //dados da conta do usuario
  const [userCards, setUserCards] = useState(); //cartoes de credito do usuario
  const [paymentInfo, setPaymentInfo] = useState(); //informacoes do pagamento do pix
  const [paymentSimulationItems, setPaymentSimulationItems] = useState(); //informacoes do simulacao do pagamento do pix

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
  const [radioButtonInstallments, setRadioButtonInstallments] = useState(); //controaldor de qual radio button do modal sera marcado

  const [buttonDisabled, setButtonDisabled] = useState(false); //habilitacao do botao de pagar/continuar
  const [modalVisible, setModalVisible] = useState(false); //modal com a lista das parcelas do pagamento
  const [showCheckCard, setShowCheckCard] = useState(false); //card com as informacoes finais do pagamento com cartao de credito
  const [processPayment, setProcessPayment] = useState(false);//chamar o loading no processo de pagamento 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountData = getUserAccount();
        const cardsData = getUserCards();
        const paymentInfoData = getPaymentInfo();
        const simulationData = getPaymentSimulationItems();

        setUserAccount(accountData);
        setUserCards(cardsData);
        setPaymentInfo(paymentInfoData);
        setPaymentSimulationItems(simulationData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  //funcao de controle do click nos botoes radio da tela de menu
  const handleMenuSelection = (value, buttonDisabled) => {
    setRadioButtonMenu(value);
    setButtonDisabled(buttonDisabled);
    setShowCheckCard(false);
  };

  //funcao de controle do click nos botoes radio das parcelas de pagamento
  const handleInstallmentsSelection = (value, buttonDisabled, item) => {
    setRadioButtonInstallments(value);
    setButtonDisabled(buttonDisabled);
    updateInstallmentInfo(item.installments, item.installmentAmount, item.fees);
  };

  //funcao de atualizar os dados referente ao pagamento por parcelas
  const updateInstallmentInfo = (installments, installmentAmount, fees) => {
    setInstallmentAmount(installmentAmount);
    setAmountToPay(`${installments}x de R$ ${installmentAmount.toFixed(2)}`);
    setInstallments(installments);
    setCardFee(fees.fixedAmount);
    setInstallmentsFee(fees.installmentAmount);
  };

  //funcao de controle para mostrar o modal com as parcelas de pagamento
  const openPaymentModal = (modalVisible) => {
    setModalVisible(modalVisible);
    setButtonDisabled(true);
  };

  //funcao de controle para fechar o modal com as parcelas de pagamento
  const closePaymentModal = () => {
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
  const handlePaymentProcess = () => {
    setProcessPayment(true);
    setTimeout(() => {
      //timeout adicionado apenas para fins de exibicao da tela de loaging
      setProcessPayment(false);
      navigation.navigate("PixSuccess");
    }, 1000);
  };

  //estado de erro pra carregar os dados da conta do usuario 
  if (!userAccount) {
    return <Loading text={"Carregando dados da conta..."} />;
  }

  //loading pra exibir durante o processo de pagamento
  if (processPayment) {
    return <Loading text={"Processando sua transferência"} />;
  }

  //funcao de exibir o componente modal com as parcelas
  const renderInstallmentsModal = () => {
    return (
      <PaymentModal
        visible={modalVisible}
        onClose={closePaymentModal}
        paymentSimulationItems={paymentSimulationItems}
        onSelect={handleInstallmentsSelection}
        amountToPay={amountToPay}
        buttonDisabled={buttonDisabled}
        onContinue={handleContinueButton}
        radioButtonInstallments={radioButtonInstallments}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderInstallmentsModal()}
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
              onSelect={(value) => handleMenuSelection(value, false)}
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
                onSelect={(value) => handleMenuSelection(value, true)}
                option={radioButtonMenu}
              />
              {radioButtonMenu === item.name ? (
                <>
                  <TouchableOpacity
                    style={styles.parcelasContainer}
                    onPress={() => openPaymentModal(true)}
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
        onPress={() => handlePaymentProcess()}
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
});

export default Payment;
