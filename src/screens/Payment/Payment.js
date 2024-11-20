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
import colors from "../../constants/Colors";
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
import Loading from "../../components/Loading/Loading";
import consts from "../../constants/Consts";

const Payment = ({ navigation }) => {
  const paymentInitialData = getPaymentInitialData();
  const [userAccount, setUserAccount] = useState(); //dados da conta do usuario
  const [userCards, setUserCards] = useState(); //cartoes de credito do usuario
  const [paymentInfo, setPaymentInfo] = useState(); //informacoes do pagamento do pix
  const [paymentSimulationItems, setPaymentSimulationItems] = useState(); //informacoes do simulacao do pagamento do pix

  const [paymentAmount, setPaymentAmount] = useState(paymentInitialData.amount); //valor total sem taxas
  const [receiverName, setReceiverName] = useState(paymentInitialData.name); //nome de quem esta recebendo o pix
  const [amountToPay, setAmountToPay] = useState(
    `R$ ${paymentAmount?.toFixed(2)}`
  ); //valor a pagar
  const [totalAmountToPay, setTotalAmountToPay] = useState(
    `R$ ${paymentAmount?.toFixed(2)}`
  );

  const [cardInstallments, setCardInstallments] = useState(
    consts.escolherParcelas
  ); //card exibido ao selecionar algum cartao de credito
  const [radioMenu, setRadioMenu] = useState(consts.saldoEmConta); //radio button do menu principal
  const [radioInstallments, setRadioInstallments] = useState(); //radio button das parcelas
  const [radioInstallmentsController, setRadioInstallmentsController] =
    useState(); //controaldor de radio button das parcelas

  const [buttonDisabled, setButtonDisabled] = useState(false); //habilitacao do botao de pagar/continuar
  const [modalVisible, setModalVisible] = useState(false); //modal com a lista das parcelas do pagamento
  const [showCheckCard, setShowCheckCard] = useState(false); //card com as informacoes finais do pagamento com cartao de credito
  const [processPayment, setProcessPayment] = useState(false); //chamar o loading no processo de pagamento

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
        console.error(consts.erroBuscarDados, error);
      }
    };
    fetchData();
  }, []);

  //funcao de controle do click nos botoes radio da tela de menu
  const handleMenuSelection = (value, buttonDisabled) => {
    setRadioMenu(value);
    setButtonDisabled(buttonDisabled);
    setDataToInitialValue();
  };

  //funcao de controle do click nos botoes radio das parcelas de pagamento
  const handleInstallmentsSelection = (value, buttonDisabled, item) => {
    setRadioInstallments(value);
    setButtonDisabled(buttonDisabled);
    setAmountToPay(
      `${item.installments}x de R$ ${item.installmentAmount.toFixed(2)}`
    );
  };

  //funcao de setar os controles para os valores iniciais
  const setDataToInitialValue = () => {
    setShowCheckCard(false); //
    setCardInstallments(consts.escolherParcelas);
    setAmountToPay(`R$ ${paymentAmount?.toFixed(2)}`);
    setTotalAmountToPay(`R$ ${paymentAmount?.toFixed(2)}`);
    setRadioInstallments();
    setRadioInstallmentsController();
  };

  //funcao de controle do botao de continuar dentro do modal com as listas de parcelas
  const handleContinueButton = () => {
    console.log("amountToPay: ", amountToPay);
    setShowCheckCard(true);
    setCardInstallments(amountToPay);
    setTotalAmountToPay(amountToPay);
    setRadioInstallmentsController(radioInstallments);
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

  //funcao de controle para mostrar o modal com as parcelas de pagamento
  const openPaymentModal = (modalVisible) => {
    setRadioInstallments(radioInstallmentsController);
    setModalVisible(modalVisible);
    if (!showCheckCard) {
      setButtonDisabled(true);
    }
  };

  //funcao de controle para fechar o modal com as parcelas de pagamento
  const closePaymentModal = () => {
    setModalVisible(false);
    if (!showCheckCard) {
      setAmountToPay(`R$ ${paymentAmount.toFixed(2)}`);
      setButtonDisabled(true);
      setRadioInstallments();
    }
  };

  //estado de erro pra carregar os dados da conta do usuario
  if (!userAccount) {
    return <Loading text={consts.carregandoDados} />;
  }

  //loading pra exibir durante o processo de pagamento
  if (processPayment) {
    return <Loading text={consts.processandoTransferencia} />;
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
        radioButtonInstallments={radioInstallments}
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
              title={consts.saldoEmConta}
              subtitle={`Disponível R$ ${item.balance}`}
              onSelect={(value) => handleMenuSelection(value, false)}
              option={radioMenu}
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
                option={radioMenu}
              />
              {radioMenu === item.name ? (
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
                      <View style={styles.checkRow}>
                        <Text>Valor a transferir</Text>
                        <Text>{`R$ ${paymentAmount?.toFixed(2)}`}</Text>
                      </View>
                      <View style={styles.checkRow}>
                        <Text>Taxa do cartão</Text>
                        <Text>100</Text>
                      </View>
                      <View style={styles.checkRow}>
                        <Text>Taxa de parcelamento</Text>
                        <Text>-</Text>
                      </View>
                      <View style={styles.checkRow}>
                        <Text>Valor a transferir + taxas</Text>
                        <Text>{totalAmountToPay}</Text>
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
        valor={totalAmountToPay}
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
  checkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Payment;
