import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

import Info from "../../components/Info";
import SelectedEtapa from "../../components/SelectedEtapa";
import SelectedAno from "../../components/SelectedAno";
import SelectUnidade from "../../components/SelectUnidade";
import SelectConhecimento from "../../components/SelectConhecimento";
import SelectNivel from "../../components/SelectNivel";
import { Formik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  nivel: yup.string().label("Nível!"),
  //.required(),

  etapa: yup.string().label("Etapa!"),
  //.required(),

  ano: yup.string().label("Ano!"),
  //.required(),

  unidade: yup.string().label("Unidade temática!"),
  //.required(),

  conhecimento: yup.string().label("Objet de Conhecimento!"),
  // .required(),
});

const GerarAvaliacao = ({ navigation }) => {
  const [dataEtapa, setDataEtapa] = useState([]);

  const valoresIniciais = {
    status: "",
    etapa: "",
    ano: "",
    unidade: "",
    conhecimento: "",
    nivel: "",
  };

  return (
    <ScrollView
      style={Styles.body}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={Styles.ScrollStyle}
    >
      <Info>GERAR AVALIAÇÃO</Info>

      <ScrollView
        style={Styles.main}
        contentContainerStyle={Styles.ScrollStyle}
        showsVerticalScrollIndicator={false}
      >
        <Formik
          initialValues={valoresIniciais}
          onSubmit={(values, { resetForm }) => {
            //alert(JSON.stringify(values)) resetForm: resetForm
            resetForm(values);
            navigation.navigate("Avaliacao", {
              values: values,
              listId: [],
              buscar: false,
            });
          }}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <>
              <View style={Styles.contenerSelects}>
                <Text style={Styles.text}>Etapa</Text>
                <SelectedEtapa
                  setData={setDataEtapa}
                  dataEtapa={dataEtapa}
                  formikKey={"etapa"}
                  formikProps={formikProps}
                  styleErro={Styles.styleErro}
                />

                <Text style={Styles.text}>Ano</Text>
                <SelectedAno
                  op={formikProps.values.etapa}
                  formikKey={"ano"}
                  formikProps={formikProps}
                  styleErro={Styles.styleErro}
                />

                <Text style={Styles.text}>Unidade temática</Text>
                <SelectUnidade
                  op={{
                    etapa: formikProps.values.etapa,
                    ano: formikProps.values.ano,
                  }}
                  formikKey={"unidade"}
                  formikProps={formikProps}
                  styleErro={Styles.styleErro}
                />

                <Text style={Styles.text}>Objeto de conhecimento</Text>
                <SelectConhecimento
                  op={{
                    etapa: formikProps.values.etapa,
                    ano: formikProps.values.ano,
                    unidade: formikProps.values.unidade,
                  }}
                  formikKey={"conhecimento"}
                  formikProps={formikProps}
                  styleErro={Styles.styleErro}
                />

                <Text style={Styles.text}>Nível de dificuldade</Text>
                <SelectNivel
                  op={formikProps.values.conhecimento}
                  formikKey={"nivel"}
                  formikProps={formikProps}
                  styleErro={Styles.styleErro}
                />
              </View>

              <View style={Styles.touchable}>
                <TouchableOpacity
                  style={Styles.bnt}
                  onPress={() => {
                    formikProps.setFieldValue("status", "3");
                    formikProps.handleSubmit();
                  }}
                >
                  <Text style={Styles.bntText}> Buscar no BQP </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[Styles.bnt, { marginBottom: 40 }]}
                  onPress={() => {
                    formikProps.setFieldValue("status", "2");
                    formikProps.handleSubmit();
                  }}
                >
                  <Text style={Styles.bntText}> Buscar no BQM </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#fff",

    //alignItems: 'center',
    //justifyContent: 'center',
  },

  main: {
    flex: 1,
    backgroundColor: "#f0f0f5",
    width: "95%",
    paddingVertical: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  ScrollStyle: {
    alignItems: "center",
    justifyContent: "center",
  },

  contenerSelects: {
    width: "100%",
    alignItems: "center",
    paddingVertical: "2%",
  },

  text: {
    alignSelf: "flex-start",
    color: "#0b2639",
    fontSize: 17,
    fontWeight: "bold",

    paddingLeft: "5%",
    marginBottom: 5,
  },

  touchable: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "#f8f8f8",
  },

  bnt: {
    alignItems: "center",
    justifyContent: "center",

    width: "90%",
    height: 50,
    marginVertical: "2%",

    // borderWidth: 1,
    // borderColor: "#002907",
    backgroundColor: "#2E6DA4", //'#ebebeb',//'#e8e8e8'//'#F4F5F6',
    elevation: 5,
    borderRadius: 8,
  },

  bntText: {
    color: "#ffff",
    fontSize: 20,
    fontWeight: "bold",
  },

  styleErro: {
    borderColor: "red",
  },
});

export default GerarAvaliacao;
