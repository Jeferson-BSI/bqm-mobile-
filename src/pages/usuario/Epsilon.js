import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Info from "../../components/Info";
import CardProva from "../../components/CardProva";
import InputModal from "../../components/InputModal";
import OptionModal from "../../components/OptionModal";
import deletarAvaliacao from "../../funções/deletarAvaliacao";
import atualizarAvaliacao from "../../funções/atualizarAvaliacao";

function Epsilon({ route, navigation }) {
  const { token } = route.params;

  const [provas, setProvas] = useState(null);
  const [isVisible, setVisible] = useState(false);
  const [isVisibleTwo, setVisibleTwo] = useState(false);
  const [obj, setObj] = useState(null);
  const [nome, setNome] = useState(null);
  const [veri, setVeri] = useState(false);
  const [loginShow, setLoginShow] = useState(true);
  // const [loginTime, setLoginTime] = useState(true);
  // const [cont, setCont] = useState(1);

  const deletar = () => {
    deletarAvaliacao(obj.id);
    provas.splice(provas.indexOf(obj), 1);
    setVisible(false);
  };

  const atualizar = () => {
    provas.splice(provas.indexOf(obj), 1);
    obj.nome = nome;
    const list = [...provas, obj];
    atualizarAvaliacao(obj.id, nome);
    setProvas(list);
    setVisibleTwo(false);
    setNome("");
  };

  const ApiGet = axios.create({
    baseURL: "https://beta.bq.mat.br/api/v1",
    //baseURL: 'https://bq.mat.br/api/v1',
    //baseURL: 'http://10.0.2.2:8000/api/v1', //'https://bq.mat.br/api/v1',
    timeout: 500,
    headers: { Authorization: "Token " + token },
  });

  const setCards = () => {
    if (provas !== null)
      provas.sort((a, b) => {
        return a.nome > b.nome ? 1 : b.nome > a.nome ? -1 : 0;
      });

    return provas !== null
      ? provas.map((value) => (
          <CardProva
            key={value.id}
            value={value}
            token={token}
            //setId={setId}
            setObj={setObj}
            setVisible={setVisible}
            setVisibleTwo={setVisibleTwo}
          />
        ))
      : null;
  };

  async function getProva() {
    const id = await AsyncStorage.getItem("user_id");

    try {
      let page = 1;
      let dados = [];

      while (true) {
        const response = await ApiGet.get(
          `/imprimir/?cadastro_pelo_usuario=${id}&page=${page}`
        );
        const { results, next } = response.data;
        dados = dados.concat(results);
        setVeri(true);

        if (next !== null) {
          page++;
        } else {
          break;
        }
      }
      setProvas(dados);
      setLoginShow(false);
    } catch (erro) {
      //alert(erro)
    }
  }

  const monitorTime = () => {
    let cont1 = 0;
    //setCont(1)
    const interval = setInterval(() => {
      cont1 += 1;
      console.log(cont1);
    }, 5000);
    clearInterval(interval);
  };

  const getRequest = () => {
    try {
      getProva();
    } catch {
      getProva();
    } finally {
      if (!veri) {
        getProva();
      }
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getRequest();
    });

    return unsubscribe;
  }, [navigation]);
  monitorTime();

  return (
    <View style={styles.body}>
      <Info>AVALIAÇÕES</Info>

      <View style={styles.main}>
        {/* <View style={styles.title}>
                    <Text style={styles.titleText}>
                        AVALIAÇÕES
                    </Text>
                </View> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.conteiner}
        >
          {loginShow ? (
            <ActivityIndicator size="large" color="blue" />
          ) : provas.length > 0 ? (
            setCards()
          ) : (
            <Text style={styles.styleText}>Nenhuma avaliação criada!</Text>
          )}
        </ScrollView>

        <OptionModal
          texto={"Deseja excluir esta avaliação?"}
          isVisible={isVisible}
          setVisible={setVisible}
          onPress={deletar}
          onPress2={() => setVisible(!isVisible)}
        />

        <InputModal
          texto={"Nome:"}
          isVisible={isVisibleTwo}
          onChangeTex={setNome}
          value={nome}
          onPress={atualizar}
          onPress2={() => setVisibleTwo(!isVisibleTwo)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#fff",
    // backgroundColor: "#e8f0ff",
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  main: {
    flex: 1,
    //backgroundColor: "#f0f0f5", //"rgba(152, 148, 148, 0.19)", //'#f8f8f8',
    //alignItems: 'center',
    width: "95%",
    //justifyContent: 'center',
    //minHeight: 500
    //borderRadius: 15,
    //marginBottom: 15,
    paddingTop: 4,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },

  conteiner: {
    // flex:1,
    //padding: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    //width: '95%',
    //backgroundColor: 'rgba(152, 148, 148, 0.1)',//'#f7f7f9',
    borderRadius: 5,
    borderColor: "#e1e1e8",
    minHeight: 150,
    // marginBottom: 10
  },

  title: {
    backgroundColor: "#f7f7f9", //'rgba(152, 148, 148, 0.1)',
    alignItems: "center",
    justifyContent: "center",

    width: "95%",
    paddingVertical: 10,
    marginTop: "3%",
    marginBottom: 10,

    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
    borderColor: "#f7f7f9",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },

  titleText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#48484c", // '#286090',
  },
  styleText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0b2639",
    paddingHorizontal: "2%",
    //color: '#286090',
    marginTop: "50%",
    textAlign: "justify",
  },
});

export default Epsilon;
