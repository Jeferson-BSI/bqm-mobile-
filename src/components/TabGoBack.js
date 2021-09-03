import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const TabGoBack = (props) => {
  const { page, token } = props;

  const navigation = useNavigation();

  async function NavFivePress_5() {
    if (page == "avalicao") {
      navigation.reset({
        routes: [
          {
            name: "AuthentRoutes",
            params: { token: token },
          },
        ],
      });
    } else {
      navigation.goBack();
    }
  }
  return (
    <TouchableOpacity style={styles.nav} onPress={NavFivePress_5}>
      <FontAwesome name="arrow-circle-left" size={40} color={"#286090"} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  nav: {
    backgroundColor: "#d9d9d9",
    height: "8%",
    minHeight: 42,
    marginTop: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 5,
  },

  NavFive_5: {
    flex: 1,
    height: 70,
    margin: "3.5%",
  },
});

export default TabGoBack;
