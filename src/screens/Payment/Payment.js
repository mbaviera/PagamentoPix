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
} from "../../service/UserApi";
import Footer from "../../components/Footer/Footer";
import Icon from "react-native-vector-icons/FontAwesome";
import CardParcelas from "../../components/Cards/CardParcelas";
import RoundedButton from "../../components/Button/RoundedButton";

export default function Payment({ navigation }) {
  const [userAccount, setUserAccount] = useState(getUserAccount());
  const [userCards, setUserCards] = useState(getUserCards());
  const [paymentSimulationItems, setPaymentSimulationItems] = useState(
    getPaymentSimulationItems()
  );

  const [radioButtonOptionCardMenu, setRadioButtonOptionCardMenu] =
    useState("Saldo em conta");
  const [radioButtonOptionCardParcelas, setRadioButtonOptionCardParcelas] =
    useState(1);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  function handleCardMenuRadioButtonClick(value, buttonDisabled) {
    setRadioButtonOptionCardMenu(value);
    setButtonDisabled(buttonDisabled);
  }

  function handleCardPaymentRadioButtonClick(value, buttonDisabled) {
    setRadioButtonOptionCardParcelas(value);
    setButtonDisabled(buttonDisabled);
  }

  function handleShowModal(modalVisible) {
    setModalVisible(modalVisible);
    setRadioButtonOptionCardParcelas(1);
  }

  const renderModalParcelas = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => handleShowModal(false)}
      >
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: colors.white,
            marginTop: 80,
            elevation: 5,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 16,
              justifyContent: "space-between",
              paddingTop: 8,
              paddingBottom: 16,
              marginTop: 25,
            }}
          >
            <Text style={{ fontSize: 24 }}>Parcelas do pagamento</Text>
            <RoundedButton
              iconName={"close"}
              iconSize={24}
              iconColor={colors.main800}
              onPress={() => handleShowModal(false)}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 16,
              justifyContent: "space-between",
              paddingBottom: 16,
            }}
          >
            <Text>
              O destinatário receberá a vista e você pagara parcelado.
            </Text>
          </View>
          <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
            {paymentSimulationItems.map((item) => (
              <CardParcelas
                installments={item.installments}
                installmentAmount={item.installmentAmount}
                onSelect={(value) =>
                  handleCardPaymentRadioButtonClick(value, true)
                }
                option={radioButtonOptionCardParcelas}
              />
            ))}
          </ScrollView>
          <Footer
            valor={100.0}
            buttonText={"Continuar"}
          />
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.grey100 }}>
      <Header />
      <View style={styles.textContainer}>
        <Text style={styles.paymentSubtitle}>
          Escolha uma forma de pagamento
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
        <View style={styles.textContainer}>
          <Text style={styles.textConta}>Conta Midway</Text>
          {userAccount.map((item) => (
            <CardMenu
              key={item.accountId}
              title={"Saldo em conta"}
              subtitle={`Disponível R$ ${item.balance}`}
              onSelect={(value) => handleCardMenuRadioButtonClick(value, false)}
              option={radioButtonOptionCardMenu}
            />
          ))}
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.textCartoes}>Cartões de Crédito</Text>
          {userCards.map((item) => (
            <View key={item.name}>
              <CardMenu
                title={item.name}
                subtitle={item.cardNumber}
                onSelect={(value) =>
                  handleCardMenuRadioButtonClick(value, true)
                }
                option={radioButtonOptionCardMenu}
              />
              {radioButtonOptionCardMenu === item.name ? (
                <TouchableOpacity
                  style={styles.parcelasContainer}
                  onPress={() => handleShowModal(true)}
                >
                  <Text style={styles.textParcelas}>Escolher Parcelas</Text>
                  <Icon name="chevron-right" size={18} color={colors.main700} />
                </TouchableOpacity>
              ) : null}
            </View>
          ))}
        </View>
      </ScrollView>
      {renderModalParcelas()}
      <Footer
        valor={100.0}
        buttonDisabled={buttonDisabled}
        buttonText={"Pagar"}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: colors.grey100,
  },
  paymentSubtitle: {
    color: colors.black,
    fontSize: 16,
    fontFamily: "Montserrat-Semibold",
    lineHeight: 20,
    backgroundColor: colors.grey100,
  },
  textConta: {
    color: colors.lightBlack,
    fontSize: 16,
    fontFamily: "Montserrat-Semibold",
    lineHeight: 20,
    backgroundColor: colors.grey100,
    paddingVertical: 12,
  },
  textCartoes: {
    color: colors.lightBlack,
    fontSize: 16,
    fontFamily: "Montserrat-Semibold",
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
    fontFamily: "Montserrat-Semibold",
    lineHeight: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 80,
    backgroundColor: colors.white,
  },
  modalView: {
    borderRadius: 20,
    paddingBottom: 100,
    elevation: 5,
    width: "100%",
    backgroundColor: colors.white,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalScrollView: {
    flexGrow: 1,
    borderColor: "red",
    borderWidth: 2,
  },
  scrollView: {
    flexGrow: 1,
  },
  paragraph: {
    padding: 1,
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
