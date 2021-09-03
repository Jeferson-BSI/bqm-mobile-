import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Info from "../../components/Info";
import InfoModal from "../../components/InfoModal";

function Configuracao({ navigation }) {
  const [isVisible, setVisible] = useState(false);
  const [email, setEmail] = useState("email");

  async function sair() {
    //apaga o cache de login
    await AsyncStorage.setItem("user_token", "");
    await AsyncStorage.setItem("user_id", "");
    await AsyncStorage.setItem("user_nivel_de_acesso", "");
    //volta para tela inicial
    navigation.reset({
      // index: 0,
      routes: [
        {
          name: "main",
        },
      ],
    });
  }
  async function getEmail() {
    try {
      const response = await AsyncStorage.getItem("email");
      setEmail(response);
    } catch {
      setEmail("epsilon@bq.mat.br");
    }
  }

  useEffect(() => {
    getEmail();
  }, []);
  return (
    <View style={Styles.body}>
      <Info> CONFIGURAÇÃO</Info>

      <View style={Styles.main}>
        <View style={Styles.icon}>
          {/* <SvgXml xml={ Icon } /> */}
          <FontAwesome name="gears" size={80} color={"#286090"} />
          <Text style={Styles.userText}>{email}</Text>
        </View>

        <ScrollView
          style={Styles.touchable}
          contentContainerStyle={{
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {/* <TouchableOpacity style={Styles.bnt}>
                <Text style={Styles.bntText}> Manual </Text> 
            </TouchableOpacity> */}
          <TouchableOpacity
            style={Styles.bnt}
            onPress={() => setVisible(!isVisible)}
          >
            <Text style={Styles.bntText}> Modificar senha </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={Styles.bnt}
            onPress={() => {
              setVisible(!isVisible);
            }}
          >
            <Text style={Styles.bntText}> Excluir conta </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[Styles.bnt, { backgroundColor: "#c94f47" }]}
            onPress={sair}
          >
            <Text style={Styles.bntText}> Sair</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <InfoModal
        isVisible={isVisible}
        texto={"Essa opção ainda não está disponível!"}
        onPress={() => {
          setVisible(!isVisible);
        }}
        option={"OK"}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  icon: {
    marginTop: "8%",
    marginBottom: "3%",
    //backgroundColor: '#f8f8f8',
    alignItems: "center",
    fontWeight: "bold",
  },

  userText: {
    fontSize: 20,
    color: "#0b2639",
    paddingLeft: 10,
    fontWeight: "bold",
    marginTop: 40,
  },

  touchable: {
    width: "100%",
  },

  bnt: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0b2639",
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 50, //'23%',
    // borderWidth: 1,
    borderColor: "#002907",
    backgroundColor: "#2E6DA4", //'#e8e8e8'//'#F4F5F6',
    elevation: 3,
    borderRadius: 8,
  },

  bntText: {
    color: "#F4F5F6",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Configuracao;
