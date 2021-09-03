import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import MathJax from "react-native-mathjax";

import TabGoBack from "../../components/TabGoBack";
import Info from "../../components/Info";
import Questao from "../../components/Questao";
import FabButton from "../../components/FabButton";

function ListarQuestoes({ navigation }) {
  const [data, setData] = useState([]);
  const [listaQuestoes, setQuestoes] = useState([]);
  const [loginShow, setLoginShow] = useState(true);
  const [visible, setVisible] = useState("");
  const [dataQuestao, setDataQuestao] = useState(false);
  const [veri, setVeri] = useState(false);
  const [urlImg, setUrlImg] = useState("");

  async function getQuestoes() {
    const token = await AsyncStorage.getItem("user_token");

    const ApiGet = axios.create({
      baseURL: "https://beta.bq.mat.br/api/v1",
      //baseURL: 'https://bq.mat.br/api/v1',
      //baseURL: 'http://10.0.2.2:8000/api/v1',
      timeout: 500,
      headers: { Authorization: "Token " + token },
    });

    try {
      const response = await ApiGet.get(`/questao/?status=3`);
      const { results } = response.data;
      //   console.log(results);
      setVeri(true);
      setData(results);
      setLoginShow(false);
    } catch (erro) {
      setVeri(false);
      return;
    }
    setVeri(false);
  }

  const getRequest = () => {
    try {
      getQuestoes();
    } catch {
      getQuestoes();
    } finally {
      if (!veri) {
        getQuestoes();
      }
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getRequest();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.body}>
      <TabGoBack page={{ page: "" }} token={{ token: "" }} />
      <Info>BQP {">"} QUESTÕES </Info>

      <View style={styles.main}>
        {loginShow ? (
          <ActivityIndicator size="large" color="blue" />
        ) : data.length > 0 ? (
          <View style={styles.conteinerQuestoes}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              keyExtractor={(questao) => questao.id.toString()}
              renderItem={({ item: questao }) => (
                <Questao
                  data={questao}
                  list={listaQuestoes}
                  setList={setQuestoes}
                  setDataQuestao={setDataQuestao}
                  setVisible={setVisible}
                  setUrlImg={setUrlImg}
                />
              )}
            />
          </View>
        ) : (
          <Text style={styles.styleText}>Nenhuma Questão criada!</Text>
        )}
      </View>

      <FabButton
        style={{ bottom: 80, right: 60 }}
        list={listaQuestoes}
        setList={setQuestoes}
        data={data}
        setData={setData}
      />

      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={() => {
          setVisible(!visible);
        }}
      >
        <View style={styles.centeredView}>
          <TouchableOpacity
            style={styles.header}
            onPress={() => setVisible(false)}
          >
            <Feather name="x" color="#212743" size={30} />
          </TouchableOpacity>
          <ScrollView style={styles.modalView}>
            <View
              style={{
                flex: 1,
                marginBottom: 50,
                padding: 5,
                minHeight: 100,
                textAlign: "justify",
              }}
            >
              <Text style={styles.textAp}>Pergunta: </Text>
              {dataQuestao && (
                <MathJax html={dataQuestao.pergunta.replace(/\n/g, "<br>")} />
              )}
              {/* <Text style={styles.textPergunta}>
                {dataQuestao
                  ? dataQuestao.pergunta
                      .replace(/['</]ul[>]/g, "")
                      .replace(/[\\<]/g, "")
                      .replace(/[br>div]/, "")
                  : dataQuestao.pergunta}{" "}
              </Text> */}
            </View>

            <View
              style={{
                flex: 1,
                marginBottom: 50,
                padding: 5,
                minHeight: 100,
                textAlign: "justify",
              }}
            >
              <Text style={styles.textAp}>Resposta: </Text>
              {dataQuestao && (
                <MathJax
                  html={dataQuestao.resposta
                    .replace(/\n/g, "<br>")
                    .replace(/Resposta:/g, "")
                    .replace(/<br \/>/g, "<br>")}
                />
              )}
              {/* <Text style={styles.textPergunta}>
                {" "}
                {dataQuestao
                  ? dataQuestao.resposta
                      .replace(/['</]ul[>]/g, "")
                      .replace(/[\\<]/g, "")
                      .replace(/[br>div]/, "")
                  : dataQuestao.resposta}{" "}
              </Text> */}
            </View>
            {urlImg ? (
              <Image
                style={styles.img}
                source={{
                  uri: urlImg,
                }}
              />
            ) : null}
          </ScrollView>
        </View>
      </Modal>
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
    width: "95%",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  conteinerQuestoes: {
    flex: 1,
    width: "90%",
  },

  questao: {
    alignItems: "center",
    paddingHorizontal: "2%",
    paddingVertical: "1%",
  },

  title: {
    fontSize: 16,
    color: "#0b2639",
  },

  textAp: {
    fontSize: 16,
    fontWeight: "700",
    marginRight: "2%",
  },

  textPergunta: {
    fontSize: 14,
    textAlign: "justify",
    lineHeight: 20,
    marginLeft: "2%",
    fontFamily: "sans-serif",
  },

  centeredView: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    // alignItems: "center",

    marginTop: "26%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },

  modalView: {
    flex: 1,
    borderRadius: 15,
    padding: 20,
  },

  header: {
    margin: 10,
    alignSelf: "flex-start",
  },

  styleText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0b2639",
    paddingHorizontal: "2%",
    marginTop: "50%",
    textAlign: "justify",
  },

  img: {
    width: "100%",
    height: 110,
    resizeMode: "stretch",
  },
});

export default ListarQuestoes;
