import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Info from "../../components/Info";
import axios from "axios";

function Configuracao({ navigation }) {
  const [dados, setDados] = useState([]);
  const [loginShow, setLoginShow] = useState(true);

  async function getManual() {
    let token = null;
    let id = null;
    try {
      token = await AsyncStorage.getItem("user_token");
      id = await AsyncStorage.getItem("user_id");
    } catch (erro) {
      alert(erro + "ao recupera do storage");
    }

    try {
      const ApiGet = axios.create({
        baseURL: "https://bq.mat.br/", //'https://bq.mat.br/api/v1',
        timeout: 100,
        headers: { Authorization: "Token " + token },
      });

      const response = await ApiGet.get("/usuario/epsilon/manual.json");
      setDados(response.data), setLoginShow(false);
      //alert(dados)
    } catch (erro) {
      // alert(erro)
    }
  }
  useEffect(() => {
    getManual();
  }, []);

  return (
    <View style={styles.body}>
      <Info> MANUAL</Info>

      {loginShow ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <View style={styles.main}>
          <ScrollView style={styles.conteiner}>
            {dados.map((value, index) => (
              <Text
                key={value + index}
                style={isNaN(value[0][0]) ? styles.text : styles.title}
              >
                {value}
              </Text>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  main: {
    flex: 1,
    backgroundColor: "#f0f0f5",
    alignItems: "center",
    width: "95%",
    borderRadius: 10,
  },

  conteiner: {
    flex: 1,

    paddingVertical: 25,
    paddingHorizontal: "3%",
    marginVertical: "4%",

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
    marginBottom: 10,
  },
});

// const styles = StyleSheet.create({

//     body: {
//         flex: 1,
//         backgroundColor: '#f8f8f8',
//         fontSize: 14,
//         alignItems: 'center'
//     },

//     main: {
//         flex: 1,
//         //marginTop: 30,
//         backgroundColor: '#f8f8f8',
//         alignItems: 'center'
//     },

//     conteiner: {
//         flex: 1,
//         alignItems: 'center',
//         backgroundColor: 'rgba(152, 148, 148, 0.1)',

//         width: '95%',
//         paddingVertical: 15,
//         paddingHorizontal: '3%',
//         marginVertical: '4%',

//         borderRadius: 5,
//         borderColor: '#e1e1e8',

//     },

//     text: {
//         fontSize: 18,
//         fontWeight: '700',
//         color: '#286090',
//         textAlign: 'justify'

//     }
// });

export default Configuracao;
