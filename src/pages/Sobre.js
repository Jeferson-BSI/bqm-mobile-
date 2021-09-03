import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import Info from "../components/Info";
import Api from "../components/Api";

function Sobre() {
  const navigation = useNavigation();
  const [dados, setDados] = useState([]);
  const [loginShow, setLoginShow] = useState(true);

  async function getSobre() {
    try {
      const response = await Api.get("/sobre.json");
      setDados(response.data);
      setLoginShow(false);
    } catch (erro) {
      //alert(erro);
    }
  }

  React.useEffect(() => {
    getSobre();
  }, [navigation]);

  return (
    <ScrollView style={styles.body}>
      <Info>SOBRE</Info>

      {loginShow ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <View style={styles.main}>
          <View style={styles.conteiner} showsVerticalScrollIndicator={false}>
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
    alignItems: "center",
  },

  conteiner: {
    flex: 1,
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

export default Sobre;
