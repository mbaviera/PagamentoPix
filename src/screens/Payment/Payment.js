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
import CardMenu from "../../components/Cards/CardMenu/CardMenu";
import { getUserAccount, getUserCards } from "../../service/UserApi";
import Footer from "../../components/Footer/Footer";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Payment({ navigation }) {
  const [userAccount, setUserAccount] = useState(getUserAccount());
  const [userCards, setUserCards] = useState(getUserCards());
  const [option, setOption] = useState("Saldo em conta");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  function handleRadioButtonClick(value, buttonDisabled) {
    console.log("value: ", value);
    setOption(value);
    setButtonDisabled(buttonDisabled);
  }  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.grey100 }}>
      <View style={{ backgroundColor: colors.grey100 }}>
        <Header />
        <View style={styles.textContainer}>
          <Text style={styles.paymentSubtitle}>
            Escolha uma forma de pagamento
          </Text>
        </View>

        <ScrollView>
          <View style={styles.textContainer}>
            <Text style={styles.textConta}>Conta Midway</Text>
            {userAccount.map((item) => (
              <CardMenu
                key={item.accountId}
                title={"Saldo em conta"}
                subtitle={`Disponível R$ ${item.balance}`}
                onSelect={(value) => handleRadioButtonClick(value, false)}
                option={option}
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
                  onSelect={(value) => handleRadioButtonClick(value, true)}
                  option={option}
                />
                {option === item.name ? (
                  <TouchableOpacity
                    style={styles.parcelasContainer}
                    onPress={() => setModalParcelasPagamentoVisible(true)}
                  >
                    <Text style={styles.textParcelas}>Escolher Parcelas</Text>
                    <Icon
                      name="chevron-right"
                      size={18}
                      color={colors.main700}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <Footer valor={100.0} buttonDisabled={buttonDisabled} />
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
    maxHeight: '90%',
    position: "absolute",
    marginBottom: 0,
  },
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "95%",
  },
});
