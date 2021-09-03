import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import RoutesTab from "./tab";
import AuthentRoutes from "./authentRoutes";
import Header from "../components/Header";
import Cadastro from "../pages/Cadastro";
import ShowAvaliacao from "../pages/usuario/ShowAvaliacao";
import AddQuestoes from "../pages/usuario/AddQuestoes";
import ListarQuestoes from "../pages/usuario/ListarQuestoes";
import Avaliacao from "../pages/usuario/Avaliacao";

const RoutesStack = createStackNavigator();

const Routes = ({ initial, UserToken }) => {
  console.log(initial);
  console.log(UserToken);
  return (
    <RoutesStack.Navigator
      initialRouteName={UserToken ? initial : "main"}
      screenOptions={{ header: () => <Header /> }}
    >
      <RoutesStack.Screen name="main" component={RoutesTab} />

      <RoutesStack.Screen
        name="AuthentRoutes"
        component={AuthentRoutes}
        initialParams={{ token: UserToken }}
      />

      <RoutesStack.Screen name="Cadastro" component={Cadastro} />

      <RoutesStack.Screen name="ShowAvaliacao" component={ShowAvaliacao} />
      <RoutesStack.Screen name="AddQuestoes" component={AddQuestoes} />
      <RoutesStack.Screen name="ListarQuestoes" component={ListarQuestoes} />
      <RoutesStack.Screen name="Avaliacao" component={Avaliacao} />
    </RoutesStack.Navigator>
  );
};

export default Routes;
