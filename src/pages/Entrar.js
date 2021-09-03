import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Info from "../components/Info";
import FormRow from "../components/FormRow";
import InfoModal from "../components/InfoModal";
import Api from "../components/Api";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label("Email")
    .email("E-mail inválido!")
    .required("Email é obrigatório"),

  senha: yup
    .string()
    .label("Senha")
    .required("Senha obrigatória")
    .min(8, "Senha muito curta...")
    .max(20),
});

function Entrar() {
  const navigation = useNavigation();

  const [shouldShow, setShouldShow] = useState(false);
  const [loginShow, setLoginShow] = useState(true);
  const [hidePass, setHidePass] = useState(true);
  const [isVisibleErr, setIsVisibleErr] = useState(false);
  const [isVisibleErr2, setIsVisibleErr2] = useState(false);

  async function handlesLogin(values) {
    try {
      setShouldShow(!shouldShow);
      setLoginShow(!loginShow);

      const response = await Api.post("api/v1/token/", {
        username: values.email,
        password: values.senha,
      });

      if (response.data.token) {
        const { token, id } = response.data;

        setShouldShow(shouldShow);
        setLoginShow(loginShow);

        try {
          //salva as informacoes em cache
          await AsyncStorage.setItem("user_token", token);
          await AsyncStorage.setItem("user_id", "" + id);
          await AsyncStorage.setItem("email", values.email);
          //ApiGetUsuario();
          //navigation.navigate('Epsilon', {token:UserToken})
          navigation.reset({
            routes: [
              {
                name: "AuthentRoutes",
                params: { token: token },
              },
            ],
          });
        } catch (_err) {}
      } else {
        setShouldShow(shouldShow);
        setLoginShow(loginShow);
      }
    } catch (_err) {
      _err.message == "Request failed with status code 400"
        ? setIsVisibleErr(true)
        : setIsVisibleErr2(true);

      setShouldShow(shouldShow);
      setLoginShow(loginShow);
    }
  }

  return (
    <ScrollView style={styles.body}>
      <Info>ENTRAR</Info>
      <View style={styles.main}>
        <View style={styles.login}>
          <Formik
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            initialValues={{ email: "", senha: "" }}
            onSubmit={(values) => {
              handlesLogin(values);
            }}
            validationSchema={validationSchema}
          >
            {(formikProps) => (
              <>
                <FormRow>
                  <TextInput
                    style={styles.mainTextInput}
                    placeholderTextColor={"#0b2639"}
                    placeholder="Email"
                    autoCorrect={false}
                    keyboardType={"email-address"}
                    onChangeText={formikProps.handleChange("email")}
                    value={formikProps.values.email}
                    onBlur={formikProps.handleBlur("email")}
                    autoFocus={false}
                  />
                </FormRow>
                <Text style={{ color: "red" }}>
                  {formikProps.touched.email && formikProps.errors.email}
                </Text>

                <FormRow>
                  <TextInput
                    style={styles.mainTextInput}
                    placeholderTextColor={"#0b2639"}
                    placeholder="Senha"
                    secureTextEntry={hidePass}
                    onBlur={formikProps.handleBlur("email")}
                    onChangeText={formikProps.handleChange("senha")}
                    onBlur={formikProps.handleBlur("senha")}
                    value={formikProps.values.senha}
                  />
                  <TouchableOpacity
                    style={styles.icon}
                    onPress={() => {
                      setHidePass(!hidePass);
                    }}
                  >
                    {hidePass ? (
                      <MaterialCommunityIcons
                        name={"eye-off"}
                        color="#0b2639"
                        size={26}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name={"eye"}
                        color="#0b2639"
                        size={26}
                      />
                    )}
                  </TouchableOpacity>
                </FormRow>
                <Text style={{ color: "red" }}>
                  {formikProps.touched.senha && formikProps.errors.senha}
                </Text>

                {loginShow ? (
                  <TouchableOpacity
                    style={styles.mainTouchableOpacity}
                    onPress={formikProps.handleSubmit}
                  >
                    <Text style={styles.mainTouchableOpacityText}>
                      {" "}
                      ENTRAR{" "}
                    </Text>
                  </TouchableOpacity>
                ) : null}

                {shouldShow ? (
                  <View style={styles.mainActivityIndicator}>
                    <ActivityIndicator size="large" color="#fff" />
                  </View>
                ) : null}

                <View style={styles.registra}>
                  <Text style={styles.texto}>Ainda não possui uma conta?</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Cadastro")} //Linking.openURL('https://bq.mat.br/usuario/criar_conta/')}
                  >
                    <Text style={styles.register}>Registra-se</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>

          <InfoModal
            isVisible={isVisibleErr}
            texto={"O e-mail e/ou senha estão incorrentos. Tente novamente!"}
            onPress={() => {
              setIsVisibleErr(!isVisibleErr);
            }}
            option={"OK"}
          />
          <InfoModal
            isVisible={isVisibleErr2}
            texto={"Erro ao realizar o login do usuario. Tente novamente!"}
            onPress={() => {
              setIsVisibleErr2(!isVisibleErr2);
            }}
            option={"OK"}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff", //'#fff',//'#e8f0ff',
    flex: 1,
  },

  login: {
    backgroundColor: "#f0f0f5", //"#fff",//"rgba(232,240,255,0.4)", //'rgba(152, 148, 148, 0.1)',//'#f8f8f8',//'#e8f0ff',
    justifyContent: "center",
    alignItems: "center",
    width: "95%",

    paddingVertical: "8%",
    borderRadius: 10,
  },

  main: {
    //backgroundColor: 'red',//'#f8f8f8',//'#e8f0ff',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "8%",
  },

  mainActivityIndicator: {
    backgroundColor: "#0b2639",
    width: "90%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
  },

  mainTextInput: {
    fontSize: 17,
    padding: 10,
    borderRadius: 10,
    width: "87%",
    height: 50,
  },

  mainTouchableOpacity: {
    backgroundColor: "#0b2639", //'#3397de',
    width: "90%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
    elevation: 1,
  },

  mainTouchableOpacityText: {
    color: "white",
    fontSize: 18,
  },

  registra: {
    marginVertical: "5%",
    marginHorizontal: "5%",
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  texto: {
    color: "#286090",
    marginRight: 5,
    fontSize: 14,
  },

  register: {
    color: "#286090",
    alignSelf: "center",
    fontSize: 15,
    fontWeight: "700",
    fontStyle: "italic",
    textDecorationLine: "underline",
  },

  icon: {
    width: "13%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Entrar;
