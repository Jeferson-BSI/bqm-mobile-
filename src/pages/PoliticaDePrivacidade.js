import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

import Info from "../components/Info";
import Api from "../components/Api";

function PoliticaDePrivacidade() {
  const navigation = useNavigation();

  const [dados, setDados] = useState([]);
  const [loginShow, setLoginShow] = useState(true);

  async function getPrivacidade() {
    try {
      const ApiGet = axios.create({
        baseURL: "https://bq.mat.br/",
        timeout: 100,
      });

      const response = await Api.get("/politica_de_privacidade.json");
      setDados(response.data);
      setLoginShow(false);
    } catch (erro) {
      //alert(erro)
    }
  }

  React.useEffect(() => {
    getPrivacidade();
  }, [navigation]);

  return (
    <ScrollView style={styles.body}>
      <Info>POLÍTICA DE PRIVACIDADE</Info>

      {loginShow ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <View style={styles.main}>
          <View style={styles.conteiner}>
            {dados.map((value, index) => (
              <Text
                key={value + index}
                style={isNaN(value[0][0]) ? styles.text : styles.title}
              >
                {value}
              </Text>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#fff", //'#e8f0ff',
  },

  main: {
    flex: 1,
    marginTop: -5,
    //backgroundColor: '#f8f8f8',
    alignItems: "center",
  },

  conteiner: {
    flex: 1,
    //alignItems: 'center',
    backgroundColor: "rgba(152, 148, 148, 0.1)",

    width: "95%",
    paddingVertical: 20,
    paddingHorizontal: "3%",
    marginVertical: "2%",

    borderRadius: 5,
    borderColor: "#e1e1e8",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#286090",
    textAlign: "justify",
    marginBottom: 5,
  },

  text: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#286090",
    textAlign: "justify",
    marginBottom: 17,
  },
});

export default PoliticaDePrivacidade;
