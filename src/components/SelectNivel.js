import React, { useState, useEffect } from "react";
import { View, Picker, StyleSheet, AsyncStorage } from "react-native";
import axios from "axios";

import QuestionStorage from "../funções/QuestionStorage";

const selectNivel = (props) => {
  const { op, formikProps, formikKey, styleErro } = props;

  const [dataNivel, setData] = useState(null);

  async function getData() {
    try {
      let dados = await AsyncStorage.getItem("niveldedificuldade");
      if (dados === null) {
        QuestionStorage("niveldedificuldade");
      }

      dados = await AsyncStorage.getItem("niveldedificuldade");
      setData(JSON.parse(dados));
    } catch (erro) {
      alert(erro);
    }
  }

  //useEffect(() =>{getData()}, [])
  const list = [
    { nivel_de_dificuldade: 1, nivel_de_dificuldade_nome: "facil" },
    { nivel_de_dificuldade: 2, nivel_de_dificuldade_nome: "médio" },
    { nivel_de_dificuldade: 3, nivel_de_dificuldade_nome: "dificil" },
  ];
  useEffect(() => {
    setData(list);
  }, []);

  //alert(list)
  return (
    <View
      style={[
        Styles.select,
        formikProps.touched[formikKey] && formikProps.errors[formikKey]
          ? styleErro
          : null,
      ]}
    >
      <Picker
        style={{ width: "100%", height: "100%" }}
        //selectedValue={props.selectedValue}
        //onValueChange={(itemValue) => {
        //props.onValueChange(itemValue)}}
        selectedValue={formikProps.values[formikKey]}
        onValueChange={(value) => {
          formikProps.setFieldValue(formikKey, value);
        }}
      >
        <Picker.Item key={0} label="Nível de dificuldade" value="" />

        {dataNivel !== null
          ? op.selectedConhecimento !== ""
            ? dataNivel.map((nivel) => (
                <Picker.Item
                  key={nivel.nivel_de_dificuldade}
                  label={nivel.nivel_de_dificuldade_nome}
                  value={nivel.nivel_de_dificuldade}
                />
              ))
            : null
          : null}
      </Picker>
    </View>
  );
};

const Styles = StyleSheet.create({
  select: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",

    width: "90%",
    maxHeight: 40,
    // marginBottom: 0,
    marginLeft: "2%",

    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#2E6DA4",
  },
});

export default selectNivel;
