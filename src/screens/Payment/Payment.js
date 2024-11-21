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
import colors from "../../style/Colors";
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
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utils/Metrics";
import InfoRow from "../../components/Text/InfoRow";
import Separator from "../../components/Separator/Separator";

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

        if (!Array.isArray(accountData) || accountData.length === 0) {
          throw new Error("Dados de conta inválidos ou inexistentes.");
        }

        if (!Array.isArray(cardsData) || cardsData.length === 0) {
          throw new Error("Nenhum cartão cadastrado.");
        }

        setUserAccount(accountData);
        setUserCards(cardsData);
        setPaymentInfo(paymentInfoData);
        setPaymentSimulationItems(simulationData);
      } catch (error) {
        console.error(consts.erroBuscarDados, error);
        setUserAccount(null);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (route.params?.resetData) {
      resetToInitialState();
      navigation.setParams({ resetData: null }); // Reseta o parametro para evitar loops
    }
  }, [route.params?.resetData]);

  //funcao de select dos botoes radio da tela de menu
  const selectPaymentOption = useCallback((value, buttonDisabled) => {
    setControllerState((prev) => ({
      ...prev,
      radioMenu: value,
      buttonDisabled,
    }));
    resetToInitialState();
  }, []);

  //funcao de select dos botoes radio das parcelas de pagamento
  const selectInstallmentsOption = useCallback(
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

  const getCurrentDate = useCallback(() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0"); // Garantir 2 dígitos
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Meses começam em 0
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
  }, []);

  //funcao para definir os valores iniciais
  const resetToInitialState = () => {
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

    disableButtonIfNecessary();
  };

  //desabilitar o botao de acao de pagar e continuar
  const disableButtonIfNecessary = () => {
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

  //mensagem de erro caso nao consiga carregar os dados do usuario
  if (!userAccount) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>
          Não foi possível carregar os dados. Tente novamente mais tarde.
        </Text>
      </View>
    );
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
        onSelect={selectInstallmentsOption}
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
      <Header titleHeader={consts.transferenciaPix} />
      <View style={styles.textContainer}>
        <Text style={styles.paymentSubtitle}>
          {consts.escolhaFormaPagamento}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
        <View style={styles.textContainer}>
          <Text style={styles.textConta}>{consts.contaMidway}</Text>
          {userAccount?.map((item) => (
            <CardMenu
              key={item.accountId}
              title={consts.saldoEmConta}
              subtitle={`${consts.disponivel}: ${formatCurrency(item.balance)}`}
              onSelect={(value) => selectPaymentOption(value, false)}
              option={controllerState.radioMenu}
            />
          ))}
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.textCartoes}>{consts.cartoesCredito}</Text>
          {userCards?.map((item) => (
            <View key={item.name}>
              <CardMenu
                title={item.name}
                subtitle={item.cardNumber}
                onSelect={(value) => selectPaymentOption(value, true)}
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
                      <InfoRow
                        title={consts.valorTransferir}
                        subtitle={`${formatCurrency(
                          paymentState.paymentAmount
                        )}`}
                      />

                      <InfoRow
                        title={consts.taxaCartao}
                        subtitle={
                          paymentState.cardFeeSelected != null
                            ? `R$ ${paymentState.cardFeeSelected.toFixed(2)}`
                            : "-"
                        }
                      />

                      <InfoRow
                        title={consts.taxaParcelamento}
                        subtitle={
                          paymentState.installmentsFeeSelected != null
                            ? `R$ ${paymentState.installmentsFeeSelected.toFixed(
                                2
                              )}`
                            : "-"
                        }
                      />

                      <Separator />

                      <InfoRow
                        title={`${consts.valorTransferir} + ${consts.taxas}`}
                        subtitle={paymentState.totalAmountToPay}
                      />
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
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(16),
    backgroundColor: colors.grey100,
  },
  paymentSubtitle: {
    color: colors.black,
    fontSize: moderateScale(16),
    fontFamily: "Montserrat-SemiBold",
    lineHeight: verticalScale(20),
    backgroundColor: colors.grey100,
  },
  textConta: {
    color: colors.lightBlack,
    fontSize: moderateScale(16),
    fontFamily: "Montserrat-SemiBold",
    lineHeight: verticalScale(20),
    backgroundColor: colors.grey100,
    paddingVertical: verticalScale(12),
  },
  textCartoes: {
    color: colors.lightBlack,
    fontSize: moderateScale(16),
    fontFamily: "Montserrat-SemiBold",
    lineHeight: verticalScale(20),
    backgroundColor: colors.grey100,
    paddingVertical: verticalScale(12),
    textAlign: "center",
  },
  parcelasContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(12),
    backgroundColor: colors.white,
    marginVertical: verticalScale(16),
    borderRadius: moderateScale(8),
  },
  checkContainer: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(12),
    backgroundColor: colors.white,
  },
  textParcelas: {
    color: colors.main700,
    fontSize: moderateScale(16),
    fontFamily: "Montserrat-SemiBold",
    lineHeight: verticalScale(20),
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: verticalScale(5),
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
  },
  errorMessage: {
    color: colors.main700,
    fontSize: moderateScale(16),
    fontFamily: "Montserrat-SemiBold",
    textAlign: "center",
  },
});

export default Payment;
