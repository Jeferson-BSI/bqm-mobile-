import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  CheckBox,
} from "react-native";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const filterText = (text) => {
  if (text.lehgth < 130) {
    return text;
  }
  return `${text.substring(0, 130)}...?`;
};

export default function Questao(props) {
  const { data, list, setList, setDataQuestao, setVisible, setUrlImg } = props;
  let lisQuetao = [...list];
  const [isSelected, setSelection] = useState(false);

  async function handleImg() {
    const token = await AsyncStorage.getItem("user_token");

    const api = axios.create({
      baseURL: "https://beta.bq.mat.br/api/v1",
      //baseURL: 'https://bq.mat.br/api/v1',
      //baseURL: 'http://10.0.2.2:8000/api/v1',
      timeout: 500,
      headers: { Authorization: "Token " + token },
    });
    try {
      const response = await api.get(`/upload/${data.imagem}`);
      console.log(response.data.upload);
      setUrlImg(response.data.upload);
    } catch (error) {
      setUrlImg("");
      console.log(data.imagem);
    }
  }

  return (
    <View>
      <TouchableOpacity
        style={styles.conteiner}
        onPress={() => {
          handleImg();
          setDataQuestao(data);
          setVisible(true);
        }}
      >
        <View style={styles.questao}>
          <View>
            <Text style={styles.textAp}>Pergunta: </Text>
            <Text style={styles.textPergunta}>
              {filterText(data.pergunta)}{" "}
            </Text>
          </View>

          {/* <View style={{ paddingLeft: 10 }}>
            <Text style={styles.textAp}>Resposta: </Text>
            <Text style={styles.textPergunta}>
              {filterText(data.resposta)}{" "}
            </Text>
          </View> */}

          <View style={styles.checkConteiner}>
            <CheckBox
              value={isSelected}
              onValueChange={() => {
                setSelection(!isSelected);
                if (!isSelected) {
                  lisQuetao.push(data);
                  setList(lisQuetao);
                } else {
                  lisQuetao.splice(lisQuetao.indexOf(data), 1);
                  setList(lisQuetao);
                }
              }}
              style={styles.checkBox}
              size={25}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    backgroundColor: "rgba(152, 148, 148, 0.1)",
    //backgroundColor: '#e6e6e6',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#0b2639",
    marginTop: "3%",
  },

  questao: {
    // alignItems: 'center',
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

  checkConteiner: {
    alignSelf: "flex-start",
  },

  checkBox: {
    color: "blue",
  },
});
