import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";

function OptionModal(props) {
  const { texto, isVisible, setVisible } = props;
  const { onPress, onPress2 } = props;

  return (
    <Modal
      visible={isVisible}
      animationType={"fade"}
      transparent={true}
      onRequestClose={() => {
        setVisible(!isVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.conteinerText}>
            <Text style={styles.modalText}>{texto}</Text>
          </View>
          <View style={styles.conteinerOpcao}>
            <TouchableOpacity
              onPress={onPress2}
              style={[styles.opcao, { borderBottomStartRadius: 12 }]}
            >
              <Text style={{ fontSize: 18, color: "#48484c" }}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onPress}
              style={[
                styles.opcao,
                { borderBottomEndRadius: 12, borderLeftWidth: 1 },
              ]}
            >
              <Text style={{ fontSize: 18, color: "#48484c" }}>SIM</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width: "100%",
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    color: "#48484c",
    fontSize: 18,
    marginBottom: 15,
    textAlign: "justify",
  },

  conteinerOpcao: {
    flexDirection: "row",
    marginTop: 35,
    margin: -35,
    alignSelf: "flex-end",
    //alignItems: 'flex-end',
  },

  conteinerText: {
    flexDirection: "row",
    marginHorizontal: -10,
  },

  opcao: {
    color: "#48484c",
    flex: 1,
    height: 50,
    borderTopWidth: 1,
    borderColor: "#48484c",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OptionModal;
