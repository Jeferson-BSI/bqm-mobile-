async function CheckLogin() {
  let UserToken = "";

  try {
    UserToken = await AsyncStorage.getItem("user_token");

    if (UserToken !== "") {
      let UserNivelDeAcesso = await AsyncStorage.getItem(
        "user_nivel_de_acesso"
      );

      if (UserNivelDeAcesso == "epsilon") {
        navigation.reset({
          // index: 0,
          routes: [
            {
              name: "AuthentRoutes",
              params: { token: UserToken },
            },
          ],
        });
        //navigation.navigate('Epsilon', {token:UserToken})
      }
    } else {
      //alert('Não tem dados em cache')
    }
  } catch (_err) {
    //alert('Não foi possivel buscar as informacoes em cache')
  }
}

React.useEffect(() => {
  const unsubscribe = navigation.addListener("focus", () => {
    // CheckLogin();
  });

  return unsubscribe;
}, [navigation]);

async function ApiGetUsuario() {
  const ApiGet = axios.create({
    baseURL: "https://beta.bq.mat.br/api/v1",
    //baseURL: 'https://bq.mat.br/api/v1',
    //baseURL: 'http://10.0.2.2:8000/api/v1',//'https://beta.bq.mat.br/api/v1',
    timeout: 100,
    headers: { Authorization: "Token " + UserToken },
  });

  try {
    const response = await ApiGet.get("/usuario/" + UserId + "/");

    const { nivel_de_acesso } = response.data;

    await AsyncStorage.setItem("user_nivel_de_acesso", nivel_de_acesso);

    setShouldShow(shouldShow);
    setLoginShow(loginShow);

    //vefifica o nivel de acesso para carregar a pagina correta
    //isso serve para ter suporte a usuarios de diferentes niveis

    if (nivel_de_acesso == "epsilon") {
      // navigation.navigate('Epsilon', {token:UserToken})
      navigation.reset({
        routes: [
          {
            name: "AuthentRoutes",
            params: { token: UserToken },
          },
        ],
      });
    } else {
      alert("Este aplicativo não possui acesso a este nivel de usuario");
    }
  } catch (_err) {
    setShouldShow(shouldShow);
    setLoginShow(loginShow);
    //alert('Não foi possivel completar o login')
  }
}
