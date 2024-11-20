import React from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const PixSuccess = ({ navigation }) => {
  const handleClose = () => {
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.closeButton} onPress={handleClose}>
        <Icon name="close" size={24} color="black" />
      </Pressable>

      <Text style={styles.title}>Pix realizado com sucesso!</Text>

      <View style={styles.iconContainer}>
        <Icon name="check-circle" size={80} color="#00695c" />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Para</Text>
        <Text style={styles.receiver}>
          Maria da Silva Maria da Silva Maria da Silva Maria da Silva
        </Text>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Valor Transferido</Text>
            <Text style={styles.value}>R$ 100,00</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>Data</Text>
            <Text style={styles.value}>06/12/2024</Text>
          </View>
        </View>

        {/* <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Valor a pagar</Text>
            <Text style={styles.value}>R$ 100,00</Text>
          </View>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingTop: 20,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginTop: 40,
    marginBottom: 20,
    textAlign: "center",
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e0f2f1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  infoContainer: {
    width: "100%",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    elevation: 2,
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#757575",
    marginBottom: 4,
    textAlign: "center",
  },
  receiver: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 16,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  column: {
    alignItems: "center",
    flex: 1,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginTop: 4,
  },
});

export default PixSuccess;