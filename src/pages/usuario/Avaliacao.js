import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import MathJax from "react-native-mathjax";

import TabGoBack from "../../components/TabGoBack";
import Info from "../../components/Info";
import CadastrarAvaliacao from "../../funções/CadastrarAvaliacao";
import OptionModal from "../../components/OptionModal";
import QuestaoAvaliacao from "../../components/QuestaoAvaliacao";
import FabButtonAvaliacao from "../../components/FabButtonAvaliacao";
import FabButtonPlus from "../../components/FabButtonPlus";
import PlusQuestion from "../usuario/PlusQuestion";
import FabButtonQuestions from "../../components/FabButtonQuestions";

function ListarQuestoes({ route, navigation: { goBack } }) {
  const { values, listId } = route.params;
  const mmlOptions = {
    jax: ["input/MathML"],
  };

  const navigation = useNavigation();
  const [avaliacao, setAvaliacao] = useState(null);
  const [stateToken, setToken] = useState(null);

  const [data, setData] = useState([]);
  const [listaQuestoes, setQuestoes] = useState([]);
  const [listaId, setId] = useState([...listId]);

  const [isVisible, setVisible] = useState(false);
  const [isVisible2, setVisible2] = useState(false);
  const [isVisible3, setVisible3] = useState(false);
  const [isVisible4, setVisible4] = useState(true);
  const [showQuestion, setShowQuestion] = useState(true);

  const [isVisible5, setVisible5] = useState(false);
  const [isSelected, setselected] = useState(false);
  const [isPlus, setPlus] = useState(false);

  const [visibleQuestao, setVisibleQuestao] = useState(false);
  const [dataQuestao, setDataQuestao] = useState(false);
  const [info, setInfo] = useState(false);

  const [urlImg, setUrlImg] = useState("");

  async function getQuestoes(values) {
    const token = await AsyncStorage.getItem("user_token");
    setToken(token);

    const parametros =
      `?status=${values.status}` +
      `&etapa=${values.etapa}` +
      `&ano=${values.ano}` +
      `&unidade_tematica=${values.unidade}` +
      `&objeto_de_conhecimento=${values.conhecimento}` +
      `&nivel=${values.nivel}`;

    const ApiGet = axios.create({
      baseURL: "https://beta.bq.mat.br/api/v1",
      //baseURL: 'https://bq.mat.br/api/v1',
      //baseURL: 'http://10.0.2.2:8000/api/v1',
      timeout: 500,
      headers: { Authorization: "Token " + token },
    });

    try {
      let page = 1;
      let dados = [];
      while (true) {
        const response = await ApiGet.get(
          `/questao/${parametros}&page=${page}`
        );
        const { results, next } = response.data;
        dados = dados.concat(results);
        //console.log(dados);

        setData(dados);
        if (next !== null) {
          page++;
        } else {
          break;
        }
      }
    } catch (erro) {
      //alert(erro)
    }
  }

  const cadastrarAvaliacao = () => {
    CadastrarAvaliacao(listaId, setAvaliacao);
  };

  const ShowAvaliacao = () => {
    let qids = "";
    for (let i in listaId) {
      qids += listaId[i];
      if (listaId.length - 1 == i) break;
      else qids += ",";
    }

    if (avaliacao !== null) {
      navigation.navigate("ShowAvaliacao", {
        token: stateToken,
        qids: avaliacao.qids,
        page: "avalicao",
      });
      setAvaliacao(null);
      return;
    }
    navigation.navigate("ShowAvaliacao", {
      token: stateToken,
      qids: qids,
      page: "avalicao",
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getQuestoes(values);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.body}>
      <TabGoBack />
      <Info>
        BQP {">"} {info ? "QUESTÕES SELECIONADAS" : "SELECIONAR QUESTÕES"}{" "}
      </Info>

      <View style={styles.main}>
        <View style={styles.conteinerQuestoes}>
          {showQuestion ? null : isPlus ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              keyExtractor={(questao) => questao.id.toString()}
              renderItem={({ item: questao }) => (
                <QuestaoAvaliacao
                  data={questao}
                  list={listaQuestoes}
                  setList={setQuestoes}
                  id={listaId}
                  setDataQuestao={setDataQuestao}
                  setVisibleQuestao={setVisibleQuestao}
                  selected={listaId.includes(questao.id) ? true : false}
                  setId={setId}
                  setUrlImg={setUrlImg}
                />
              )}
            />
          ) : isSelected ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={listaQuestoes}
              keyExtractor={(questao) => questao.id.toString()}
              renderItem={({ item: questao }) => (
                <QuestaoAvaliacao
                  data={questao}
                  list={listaQuestoes}
                  setList={setQuestoes}
                  id={listaId}
                  setDataQuestao={setDataQuestao}
                  setVisibleQuestao={setVisibleQuestao}
                  selected={isSelected}
                  setId={setId}
                  setUrlImg={setUrlImg}
                />
              )}
            />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              keyExtractor={(questao) => questao.id.toString()}
              renderItem={({ item: questao }) => (
                <QuestaoAvaliacao
                  data={questao}
                  list={listaQuestoes}
                  setList={setQuestoes}
                  id={listaId}
                  setDataQuestao={setDataQuestao}
                  setVisibleQuestao={setVisibleQuestao}
                  selected={isSelected}
                  setId={setId}
                  setUrlImg={setUrlImg}
                />
              )}
            />
          )}
        </View>
      </View>

      <PlusQuestion
        isVisible={isVisible5}
        setVisible={setVisible5}
        getQuestoes={getQuestoes}
      />

      <OptionModal
        texto="Deseja criar uma avaliação com as questões selecionadas?"
        setVisible={setVisible2}
        isVisible={isVisible2}
        onPress={() => {
          setVisible2(false);
          setVisible3(true);
          setselected(!isSelected);
        }}
        onPress2={() => {
          setVisible2(false);
        }}
      />

      <OptionModal
        texto="Deseja salvar a avaliação a ser gerada, para acessá-la futuramente através do seu painel inicial?"
        setVisible={setVisible3}
        isVisible={isVisible3}
        onPress={() => {
          setVisible3(false);
          cadastrarAvaliacao();
          setselected(!isSelected);
          ShowAvaliacao();
        }}
        onPress2={() => {
          setselected(!isSelected);
          setVisible3(false);
        }}
      />

      <OptionModal
        texto={`Encontramos ${data.length} resultados correspondentes para o filtro que você aplicou. Deseja ver as questões encontradas?`}
        setVisible={setVisible4}
        isVisible={isVisible4}
        onPress={() => {
          setVisible4(false);
          setShowQuestion(false);
        }}
        onPress2={() => {
          goBack();
        }}
      />

      <Modal
        visible={visibleQuestao}
        animationType="slide"
        transparent
        onRequestClose={() => {
          setVisibleQuestao(!visibleQuestao);
        }}
      >
        <View style={styles.centeredView}>
          <TouchableOpacity
            style={styles.header}
            onPress={() => setVisibleQuestao(false)}
          >
            <Feather name="x" color="#212743" size={30} />
          </TouchableOpacity>
          <ScrollView
            style={styles.modalView}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={[
                {
                  flex: 1,
                  padding: 5,
                  minHeight: 100,
                  textAlign: "justify",
                },
              ]}
            >
              <Text style={styles.textAp}>Pergunta: </Text>
              {dataQuestao && (
                <MathJax html={dataQuestao.pergunta.replace(/\n/g, "<br>")} />
              )}
              {/* {console.log(dataQuestao.pergunta)} */}
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

      <FabButtonAvaliacao
        setVisible={setVisible}
        isVisible={isVisible}
        setVisible2={setVisible2}
        style={{ bottom: 80, right: 35 }}
        list={listaId}
      />

      <FabButtonPlus
        setPlus={setPlus}
        style={{ bottom: 160, right: 34 }}
        setVisible5={setVisible5}
        setData={setData}
        setselected={setselected}
      />

      <FabButtonQuestions
        setPlus={setPlus}
        values={values}
        isSelected={isSelected}
        setselected={setselected}
        cont={listaQuestoes.length}
        setInfo={setInfo}
        info={info}
        style={{ bottom: 240, right: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#fff",
    fontSize: 14,
    alignItems: "center",
  },

  main: {
    flex: 1,
    backgroundColor: "#f0f0f5",
    width: "98%",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  conteinerQuestoes: {
    flex: 1,
    width: "90%",
    marginBottom: 5,
  },

  questao: {
    paddingHorizontal: "2%",
    paddingVertical: "1%",
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginVertical: "3%",
    alignSelf: "center",
  },

  num: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 3,
  },

  texte: {
    fontSize: 15,
    fontWeight: "normal",
  },

  title: {
    fontSize: 20,
    color: "#0b2639",
  },

  textAp: {
    fontSize: 16,
    fontWeight: "700",
    // marginRight: "2%",
  },

  textPergunta: {
    fontSize: 14,
    textAlign: "justify",
    lineHeight: 20,
    // marginLeft: "2%",
    fontFamily: "sans-serif",
    marginBottom: 15,
  },

  centeredView: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    marginTop: "26%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },

  header: {
    margin: 10,
    alignSelf: "flex-start",
  },
  modalView: {
    padding: 20,
  },

  img: {
    width: "100%",
    height: 110,
    padding: 20,
    marginBottom: 20,
    resizeMode: "stretch",
  },
});

export default ListarQuestoes;
