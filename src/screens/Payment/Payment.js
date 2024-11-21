import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";

const Payment = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const paymentInitialData = getPaymentInitialData();
  const formatCurrency = (value) => `R$ ${value?.toFixed(2)}`;

  //estados usados para pagamento
  const [paymentState, setPaymentState] = useState({
    paymentAmount: paymentInitialData.amount, //valor total sem taxas
    receiverName: paymentInitialData.name, //nome de quem esta recebendo o pix
    amountToPay: formatCurrency(paymentInitialData.amount),
    totalAmountToPay: formatCurrency(paymentInitialData.amount),
    cardFee: null, //taxa do cartao de credito
    cardFeeSelected: null, //taxa do cartao de credito
    installmentsFee: null, //taxa das parcelas
    installmentsFeeSelected: null, //taxa das parcelas
    paymentDate: null, // data da tranferecia pix
  });

  //estados usados para controle de funcionalidades
  const [controllerState, setControllerState] = useState({
    radioMenu: consts.saldoEmConta, //radio button do menu principal
    radioInstallments: null, //radio button das parcelas
    cardInstallments: consts.escolherParcelas, //card com dados de pagamento
    showCheckCard: false, //exibir o card com os dados de pagamento
    buttonDisabled: false, //habilitacao do botao de pagar/continuar
    modalVisible: false, //modal com a lista das parcelas do pagamento
    radioInstallmentsController: null,
    processPayment: false, //loading no processo de pagamento
  });

  const [userAccount, setUserAccount] = useState(); //dados da conta do usuario
  const [userCards, setUserCards] = useState(); //cartoes de credito do usuario
  const [paymentInfo, setPaymentInfo] = useState(); //informacoes do pagamento do pix
  const [paymentSimulationItems, setPaymentSimulationItems] = useState(); //informacoes do simulacao do pagamento do pix

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

  useEffect(() => {
    if (route.params?.resetData) {
      setDataToInitialValue();      
      navigation.setParams({ resetData: null });// Reseta o parametro para evitar loops
    }
  }, [route.params?.resetData]);

  //funcao de select dos botoes radio da tela de menu
  const handleMenuSelection = useCallback((value, buttonDisabled) => {
    setControllerState((prev) => ({
      ...prev,
      radioMenu: value,
      buttonDisabled,
    }));
    setDataToInitialValue();
  }, []);

  //funcao de select dos botoes radio das parcelas de pagamento
  const handleInstallmentsSelection = useCallback(
    (value, buttonDisabled, item, fees) => {
      setPaymentState((prev) => ({
        ...prev,
        amountToPay: `${item.installments}x de ${formatCurrency(
          item.installmentAmount
        )}`,
        cardFee: fees.fixedAmount,
        installmentsFee: fees.installmentAmount,
      }));

      setControllerState((prev) => ({
        ...prev,
        radioInstallments: value,
        buttonDisabled,
      }));
    },
    []
  );

  //funcao de controle do botao de continuar dentro do modal com as listas de parcelas
  const handleContinueButton = () => {
    setPaymentState((prev) => ({
      ...prev,
      totalAmountToPay: paymentState.amountToPay,
      cardFeeSelected: paymentState.cardFee,
      installmentsFeeSelected: paymentState.installmentsFee,
    }));

    setControllerState((prev) => ({
      ...prev,
      showCheckCard: true,
      cardInstallments: paymentState.amountToPay,
      modalVisible: false,
      radioInstallmentsController: controllerState.radioInstallments,
    }));
  };

  //funcao de controle do pagamento
  const handlePaymentProcess = () => {
    const todayDate = getCurrentDate();
    setControllerState((prev) => ({
      ...prev,
      processPayment: true,
    }));

    //timeout adicionado apenas para fins de exibicao da tela de loading
    setTimeout(() => {
      setControllerState((prev) => ({
        ...prev,
        processPayment: false,
      }));
      navigation.navigate("PixSuccess", {
        name: paymentState.receiverName,
        transferredValue: paymentState.paymentAmount,
        payedValue: paymentState.totalAmountToPay,
        paymentDate: todayDate,
      });
    }, 1000);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0"); // Garantir 2 dígitos
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Meses começam em 0
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
  };

  //funcao para definir os valores iniciais
  const setDataToInitialValue = () => {
    setPaymentState((prev) => ({
      ...prev,
      amountToPay: formatCurrency(paymentState.paymentAmount),
      totalAmountToPay: formatCurrency(paymentState.paymentAmount),
      cardFeeSelected: null,
      installmentsFeeSelected: null,
    }));

    setControllerState((prev) => ({
      ...prev,
      cardInstallments: consts.escolherParcelas,
      showCheckCard: false,
      radioInstallments: null,
      radioInstallmentsController: null,
    }));
  };

  //funcao de controle para mostrar o modal com as parcelas de pagamento
  const openPaymentModal = (modalVisible) => {
    setPaymentState((prev) => ({
      ...prev,
      amountToPay: paymentState.totalAmountToPay,
    }));

    setControllerState((prev) => ({
      ...prev,
      radioInstallments: controllerState.radioInstallmentsController,
      modalVisible,
    }));

    if (!controllerState.showCheckCard) {
      setControllerState((prev) => ({
        ...prev,
        buttonDisabled: true,
      }));
    }
  };

  //funcao de controle para fechar o modal com as parcelas de pagamento
  const closePaymentModal = () => {
    setControllerState((prev) => ({
      ...prev,
      modalVisible: false,
    }));

    if (!controllerState.showCheckCard) {
      setPaymentState((prev) => ({
        ...prev,
        amountToPay: formatCurrency(paymentState.paymentAmount),
      }));

      setControllerState((prev) => ({
        ...prev,
        buttonDisabled: true,
        radioInstallments: null,
      }));
    }
  };

  //estado de erro pra carregar os dados da conta do usuario
  if (!userAccount) {
    return <Loading text={consts.carregandoDados} />;
  }

  //loading pra exibir durante o processo de pagamento
  if (controllerState.processPayment) {
    return <Loading text={consts.processandoTransferencia} />;
  }

  //funcao de exibir o componente modal com as parcelas
  const renderInstallmentsModal = () => {
    return (
      <PaymentModal
        visible={controllerState.modalVisible}
        onClose={closePaymentModal}
        paymentSimulationItems={paymentSimulationItems}
        onSelect={handleInstallmentsSelection}
        amountToPay={paymentState.amountToPay}
        buttonDisabled={controllerState.buttonDisabled}
        onContinue={handleContinueButton}
        radioButtonInstallments={controllerState.radioInstallments}
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
              subtitle={`Disponível: ${formatCurrency(item.balance)}`}
              onSelect={(value) => handleMenuSelection(value, false)}
              option={controllerState.radioMenu}
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
                option={controllerState.radioMenu}
                brand={item.brand}
              />
              {controllerState.radioMenu === item.name ? (
                <>
                  <TouchableOpacity
                    style={styles.parcelasContainer}
                    onPress={() => openPaymentModal(true)}
                  >
                    <Text
                      style={styles.textParcelas}
                    >{`${controllerState.cardInstallments}`}</Text>
                    <Icon
                      name="chevron-right"
                      size={18}
                      color={colors.main700}
                    />
                  </TouchableOpacity>
                  {controllerState.showCheckCard ? (
                    <View style={styles.checkContainer}>
                      <View style={styles.checkRow}>
                        <Text>Valor a transferir</Text>
                        <Text>{`${formatCurrency(
                          paymentState.paymentAmount
                        )}`}</Text>
                      </View>
                      <View style={styles.checkRow}>
                        <Text>Taxa do cartão</Text>
                        <Text>
                          {paymentState.cardFeeSelected != null
                            ? `R$ ${paymentState.cardFeeSelected.toFixed(2)}`
                            : "-"}
                        </Text>
                      </View>
                      <View style={styles.checkRow}>
                        <Text>Taxa de parcelamento</Text>
                        <Text>
                          {paymentState.installmentsFeeSelected != null
                            ? `R$ ${paymentState.installmentsFeeSelected.toFixed(
                                2
                              )}`
                            : "-"}
                        </Text>
                      </View>
                      <View style={styles.separator} />
                      <View style={styles.checkRow}>
                        <Text>Valor a transferir + taxas</Text>
                        <Text>{paymentState.totalAmountToPay}</Text>
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
        valor={paymentState.totalAmountToPay}
        buttonDisabled={controllerState.buttonDisabled}
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
  separator: {
    height: 0.5,
    borderTopWidth: 0.5,
    width: "100%",
    alignSelf: "center",
    marginTop: 6,
    marginBottom: 4,
    borderColor: colors.grey700,
  },
});

export default Payment;
