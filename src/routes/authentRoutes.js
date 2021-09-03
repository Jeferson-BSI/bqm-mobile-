import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FontAwesome, Entypo, FontAwesome5 } from "@expo/vector-icons";

import Epsilon from "../pages/usuario/Epsilon";
import GerarAvaliacao from "../pages/usuario/GerarAvaliacao";
import Bdquestoes from "../pages/usuario/Bdquestoes";
import Manual from "../pages/usuario/Manual";
import Configuracao from "../pages/usuario/Configuracao";
import Header from "../components/Header";

const Tab = createMaterialTopTabNavigator();

function AuthentRoutes({ route }) {
  const { token } = route.params;

  return (
    <Tab.Navigator
      initialRouteName="Epsilon"
      screenOptions={{ header: () => <Header /> }}
      tabBarOptions={{
        showIcon: true,
        iconStyle: {
          width: "100%",
        },
        tabStyle: { alignItems: "center" },
        style: {
          borderBottomColor: "transparent",
        },
        activeTintColor: "#286090",
        inactiveTintColor: "#286090",
        labelStyle: {
          fontSize: 8,
          paddingTop: 3,
        },
        tabStyle: {
          padding: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Epsilon}
        initialParams={{ token: token }}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="home" size={33} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Questões"
        component={Bdquestoes}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="database" size={33} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Avaliacão"
        component={GerarAvaliacao}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="pencil-ruler" size={33} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Manual"
        component={Manual}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="book" size={33} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="setting"
        component={Configuracao}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="gears" size={33} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AuthentRoutes;
