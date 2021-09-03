import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import axios from "axios";
import * as yup from "yup";
import InfoModal from "../../components/InfoModal";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import TabGoBack from "../../components/TabGoBack";
import Info from "../../components/Info";
import SelectedEtapa from "../../components/SelectedEtapa";
import SelectedAno from "../../components/SelectedAno";
import SelectUnidade from "../../components/SelectUnidade";
import SelectConhecimento from "../../components/SelectConhecimento";
import SelectNivel from "../../components/SelectNivel";
import Mathlive from "../Mathlive";

const validationSchema = yup.object().shape({
  pergunta: yup
    .string()
    .required("*obrigatorio")
    .label("Pergunta")
    .min(8, "Minimo de 8 caracteres!")
    .max(1000, "Maximo 500 caracteres!"),

  resposta: yup
    .string()
    .required("*obrigatorio")
    .label("Resposta")
    .min(8, "Minimo de 8 caracteres!")
    .max(1000, "Maximo 500 caracteres!"),

  nivel: yup.string().required("*obrigatorio").label("Nível!"),

  etapa: yup.string().required("*obrigatorio").label("Etapa!"),

  ano: yup.string().required("*obrigatorio").label("Ano!"),

  unidade: yup.string().required("*obrigatorio").label("Unidade temática!"),

  conhecimento: yup
    .string()
    .required("*obrigatorio")
    .label("Objet de Conhecimento!"),
});

const valoresIniciais = {
  pergunta: "",
  resposta: "",
  nivel: "",
  imagem: null,
  etapa: "",
  ano: "",
  unidade: "",
  conhecimento: "",
};

const AddQuestoes = () => {
  const [isVisible, setVisible] = useState(false);
  const [isVisibleErr, setVisibleErr] = useState(false);
  const [imgData, setImgData] = useState(null);
  const [shouldShow, setShouldShow] = useState(true);

  async function imagePickerCall() {
    const data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (data.cancelled) {
      return;
    }

    if (!data.uri) {
      return;
    }
    setImgData(data);
  }

  async function uploadImage(values, resetForm) {
    setShouldShow(false);
    if (imgData === null) {
      cadastrarQuestao(values, resetForm, 0);
      return;
    }

    let token = null;
    try {
      token = await AsyncStorage.getItem("user_token");
    } catch {
      token = await AsyncStorage.getItem("user_token");
    }

    const data = new FormData();

    const uri = imgData.uri;
    const name = uri.split("/").slice(-1)[0];
    const type = "image/" + name.split(".").slice(-1)[0];

    data.append("upload", {
      uri: uri,
      name: name,
      type: type,
    });

    const Apipost = axios.create({
      baseURL: "https://beta.bq.mat.br/api/v1",
      //  baseURL: 'https://bq.mat.br/api/v1',
      timeout: 500,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: "Token " + token,
      },
    });
    try {
      const response = await Apipost.post("/upload/", data);
      setImgData(null);
      cadastrarQuestao(values, resetForm, response.data.id);
    } catch (err_) {
      setVisibleErr(!isVisibleErr);
    }
  }

  async function cadastrarQuestao(values, resetForm, idImg) {
    let token = null;
    let id = null;

    try {
      token = await AsyncStorage.getItem("user_token");
      id = await AsyncStorage.getItem("user_id");
    } catch (erro) {
      setVisibleErr(!isVisibleErr);
      return;
    }

    try {
      const ApiGet = axios.create({
        baseURL: "https://beta.bq.mat.br/api/v1",
        //baseURL: 'http://10.0.2.2:8000/api/v1', //'https://bq.mat.br/api/v1',
        //baseURL: 'https://bq.mat.br/api/v1',
        timeout: 500,
        headers: { Authorization: "Token " + token },
      });

      const questao = {
        status: "3",
        etapa: values.etapa,
        ano: values.ano,
        unidade_tematica: values.unidade,
        objeto_de_conhecimento: values.conhecimento,
        nivel_de_dificuldade: values.nivel,
        imagem: idImg,
        pergunta: values.pergunta,
        resposta: values.resposta,
        cadastro_pelo_usuario: id,
      };

      const response = await ApiGet.post("/questao/", questao);
      if (response !== null) {
        setVisible(true);
        setShouldShow(true);
      }
      resetForm(valoresIniciais);
    } catch (erro) {
      setVisibleErr(!isVisibleErr);
      throw 42;
    }
  }

  return (
    <View style={Styles.body}>
      <TabGoBack page={{ page: "" }} token={{ token: "" }} />
      <ScrollView style={Styles.main2} showsVerticalScrollIndicator={false}>
        <Info>
          BQP {">"} CADASTRAR {">"} QUESTÃO
        </Info>

        <ScrollView
          style={Styles.main}
          contentContainerStyle={Styles.ScrollStyle}
          showsVerticalScrollIndicator={false}
        >
          <Formik
            initialValues={valoresIniciais}
            onSubmit={(values, { resetForm }) => {
              try {
                uploadImage(values, resetForm);
              } catch {
                console.log("entro erro");
                uploadImage(values, resetForm);
              }
            }}
            validationSchema={validationSchema}
          >
            {(formikProps) => (
              <>
                <View style={Styles.conteinerSelects}>
                  <Text style={Styles.text}>Etapa</Text>
                  <SelectedEtapa
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
                  <Text style={{ color: "red" }}>
                    {formikProps.touched.nivel && formikProps.errors.nivel}
                  </Text>
                </View>

                <View style={Styles.imgConteiner}>
                  <TouchableOpacity
                    style={Styles.imgConteinerStyles}
                    onPress={imagePickerCall}
                  >
                    {imgData ? (
                      <Image
                        source={{ uri: imgData.uri }}
                        style={Styles.imgStyle}
                      />
                    ) : (
                      <>
                        <MaterialCommunityIcons
                          name="image-plus"
                          color="#286090"
                          size={40}
                        />
                        <Text
                          style={[
                            Styles.text,
                            { paddingLeft: 0, fontSize: 15 },
                          ]}
                        >
                          Adicionar imagem
                        </Text>
                      </>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={Styles.iconClear}
                    onPress={() => setImgData(null)}
                  >
                    <MaterialIcons name="clear" color="#f79c9c" size={30} />
                    <Text
                      style={[
                        Styles.text,
                        { paddingLeft: 0, fontSize: 10, color: "#f79c9c" },
                      ]}
                    >
                      Limpar
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={Styles.text}>Pergunta</Text>
                <TextInput
                  style={[
                    Styles.textInput,
                    Styles.textInputPR,
                    formikProps.touched.pergunta && formikProps.errors.pergunta
                      ? Styles.styleErro
                      : null,
                  ]}
                  placeholderTextColor={"#0b2639"}
                  placeholder="Digite a pergunta aqui!"
                  textAlignVertical="top"
                  multiline={true}
                  onChangeText={formikProps.handleChange("pergunta")}
                  value={formikProps.values.pergunta}
                  onBlur={formikProps.handleBlur("pergunta")}
                />
                <Text style={{ color: "red" }}>
                  {formikProps.touched.pergunta && formikProps.errors.pergunta}
                </Text>

                <Text style={Styles.text}>Resposta</Text>
                <TextInput
                  style={[
                    Styles.textInput,
                    Styles.textInputPR,
                    formikProps.touched.resposta && formikProps.errors.resposta
                      ? Styles.styleErro
                      : null,
                  ]}
                  placeholderTextColor={"#0b2639"}
                  placeholder="Digite a respota aqui!"
                  textAlignVertical="top"
                  multiline={true}
                  value={formikProps.values.resposta}
                  onBlur={formikProps.handleBlur("resposta")}
                  onChangeText={formikProps.handleChange("resposta")}
                />

                <Text style={{ color: "red" }}>
                  {formikProps.touched.resposta && formikProps.errors.resposta}
                </Text>

                {shouldShow ? (
                  <TouchableOpacity
                    style={Styles.bnt}
                    onPress={formikProps.handleSubmit}
                  >
                    <Text style={{ color: "white", fontSize: 18 }}>
                      {" "}
                      Cadastrar questão{" "}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View style={Styles.mainActivityIndicator}>
                    <ActivityIndicator size="large" color="#fff" />
                  </View>
                )}
              </>
            )}
          </Formik>
        </ScrollView>
      </ScrollView>
      {/* <Mathlive /> */}
      <InfoModal
        isVisible={isVisible}
        texto={"Maravilha! Questão registrada com sucesso!"}
        onPress={() => setVisible(!isVisible)}
        option={"OK"}
      />
      <InfoModal
        isVisible={isVisibleErr}
        texto={"Erro ao cadastra a questão. Tente novamente!"}
        onPress={() => {
          setVisibleErr(!isVisibleErr);
          setShouldShow(true);
        }}
        option={"OK"}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#fff",
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  main: {
    flex: 1,
    backgroundColor: "#f0f0f5",
    width: "100%",
    marginBottom: 5,
    padding: 10,
    borderRadius: 10,
  },

  main2: {
    flex: 1,
    width: "95%",
  },

  ScrollStyle: {
    alignItems: "center",
    justifyContent: "center",
  },

  conteinerSelects: {
    width: "100%",
    alignItems: "center",
    paddingVertical: "2%",
    marginVertical: 15,
  },

  text: {
    alignSelf: "flex-start",
    color: "#0b2639",
    fontSize: 17,
    fontWeight: "bold",

    paddingLeft: "5%",
    marginBottom: 5,
  },

  textInput: {
    fontSize: 17,
    padding: 10,
    borderRadius: 10,
    width: "90%",
    height: 50,
    borderWidth: 2,
    borderColor: "#0b2639",
  },

  textInputPR: {
    height: 150,
    marginBottom: 10,
    backgroundColor: "#fff",
  },

  bnt: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0b2639",
    marginTop: 10,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 45,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#002907",
    backgroundColor: "#0b2639",
    elevation: 3,
  },

  styleErro: {
    borderColor: "red",
  },
  imgConteiner: {
    width: "90%",
    height: "9%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  imgConteinerStyles: {
    height: "100%",
    alignItems: "center",
    borderColor: "#e8f0ff",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#e8f0ff",

    marginRight: 18,
    elevation: 5,
    justifyContent: "center",
  },
  imgStyle: {
    minWidth: 200,
    height: "100%",
  },
  iconClear: {
    borderWidth: 2,
    borderColor: "#e8f0ff",
    borderRadius: 10,
    padding: 5,
  },

  mainActivityIndicator: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0b2639",
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 45,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#002907",
    backgroundColor: "#0b2639",
    elevation: 3,
  },
});

export default AddQuestoes;
