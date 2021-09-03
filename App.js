import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Routes from "./src/routes/index";

function App() {
  const [logged, setLogged] = useState(null);
  async function obterPermissao() {
    //alert('Você pre dar permissão!')
    const { granted } = await MediaLibrary.requestPermissionsAsync();

    if (!granted) {
      alert("Você precisa dar permissão!");
      obterPermissao();
    }
  }

  async function handleSignIn() {
    try {
      const UserToken = await AsyncStorage.getItem("user_token");
      console.log(UserToken);
      UserToken ? setLogged(UserToken) : setLogged(false);
    } catch (error) {
      console.log(error);
      setLogged(false);
    }
  }

  useEffect(() => {
    handleSignIn();
    obterPermissao();
  }, []);

  return (
    <NavigationContainer>
      {logged !== null ? (
        logged ? (
          <Routes initial="AuthentRoutes" UserToken={logged} />
        ) : (
          <Routes initial="main" UserToken={false} />
        )
      ) : null}
    </NavigationContainer>
  );
}

export default App;
