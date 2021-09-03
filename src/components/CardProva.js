import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function CardProva(props) {
  const { setVisible, setVisibleTwo, setObj, value, token } = props;
  const navigation = useNavigation();

  const { nome, id, qids } = value;

  const deletar = () => {
    //setId(id)
    setObj(value);
    setVisible(true);
  };

  const atualizar = () => {
    //setId(id)
    setObj(value);
    setVisibleTwo(true);
  };

  return (
    <TouchableOpacity
      style={styles.conteinerCard}
      onPress={() =>
        navigation.navigate("ShowAvaliacao", {
          token: token,
          qids: qids,
          nome: nome,
          id: id,
          page: "avalicao",
        })
      }
    >
      <View style={{ alignSelf: "center" }}>
        <Text style={styles.title}>{nome}</Text>
      </View>

      <View style={styles.iconConteiner}>
        <TouchableOpacity onPress={deletar}>
          <AntDesign name="delete" color="#286090" size={30} />
        </TouchableOpacity>

        <TouchableOpacity onPress={atualizar}>
          <FontAwesome name="edit" color="#286090" size={30} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  conteinerCard: {
    backgroundColor: "#f0f0f5", //"#f7f7f9", //'rgba(152, 148, 148, 0.1)',
    marginVertical: "3%",

    //alignItems: 'center',
    justifyContent: "space-between",

    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "45%",
    minWidth: "40%",
    height: 100,

    borderBottomWidth: 2,
    borderRadius: 8,
    //borderColor: '#f5f5f5',//'#e6e6e6',
    borderBottomColor: "black",
    elevation: 1,
  },

  title: {
    color: "#286090", //"#48484c", //'#286090',
    fontFamily: "serif",
    fontSize: 15,
    fontWeight: "700",
  },

  iconConteiner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    // marginVertical: 20,
  },
});

export default CardProva;
