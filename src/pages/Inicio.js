import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Video } from "expo-av";

import VideoPlayer from "expo-video-player";
import Info from "../components/Info";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Inicio() {
  const navigation = useNavigation();

  async function CheckLogin() {
    let UserToken = "";

    try {
      UserToken = await AsyncStorage.getItem("user_token");

      //alert(UserToken)

      if (UserToken !== "") {
        let UserNivelDeAcesso = await AsyncStorage.getItem(
          "user_nivel_de_acesso"
        );

        if (UserNivelDeAcesso == "epsilon") {
          //navigation.push("AuthentRoutes", { token: UserToken });
          //navigation.navigate("AuthentRoutes", { token: UserToken });
          navigation.reset({
            index: 0,
            routes: [
              {
                // name: 'Epsilon',
                name: "AuthentRoutes",
                params: { token: UserToken },
              },
            ],
          });
        }
      } else {
        //alert('Não tem dados em cache')
      }
    } catch (_err) {
      //alert('Não foi possivel buscar as informacoes em cache')
    }
  }

  React.useEffect(() => {
    // navigation.addListener("beforeRemove", (e) => {
    //   e.preventDefault();
    // });
    const unsubscribe = navigation.addListener("focus", () => {
      CheckLogin();
    });

    return unsubscribe;
  }, []);

  return (
    <ScrollView
      style={styles.body}
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
    >
      <Info>PÁGINA INICIAL</Info>
      <View
        style={styles.main}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.styleText}>Olá, bem vindo!</Text>
        <Text style={styles.styleText}>
          BQM é uma plataforma gratuita que tem o objetivo de facilitar a
          elaboração de atividades avaliativas de matemática. É um banco com
          mais de XXX questões organizadas conforme eixo temático, objeto de
          conhecimento, ciclo de ensino e nível de dificuldade. Aproveite!
        </Text>
        <View>
          <Text style={{ color: "white" }}>Video</Text>
        </View>

        <VideoPlayer
          rate={1.0}
          volume={1.0}
          muted={false}
          videoProps={{
            shouldPlay: false,
            resizeMode: Video.RESIZE_MODE_CONTAIN,
            isLooping: true,
            source: {
              uri: "https://bq.mat.br/media/video.webm", //'http://10.0.2.2:8000/media/video.webm' //'https://bq.mat.br/media/video.webm',
            },
          }}
          width={300}
          height={200}
          inFullscreen={true}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    flex: 1,
  },

  main: {
    marginTop: 10,
    width: "95%",
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  styleText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0b2639",
    paddingHorizontal: "2%",
    color: "#286090",
    //marginTop: 10,
    textAlign: "justify",
  },
});

export default Inicio;
