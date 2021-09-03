import React from "react";
import { View, Text, Modal, ScrollView, TouchableOpacity } from "react-native";

const ModalQuestions = () => {
  return (
    <Modal
      isVisible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        setVisible(!visible);
      }}
    >
      <View style={styles.centeredView}>
        <ScrollView style={styles.modalView}>
          <View>
            <Text style={styles.textAp}>Pergunta: </Text>
            <Text style={styles.textPergunta}>
              {dataQuestao
                ? dataQuestao.pergunta
                    .replace(/['</]ul[>]/g, "")
                    .replace(/[\\<]/g, "")
                    .replace(/[br>div]/, "")
                : dataQuestao.pergunta}{" "}
            </Text>
          </View>

          <View style={{ marginBottom: 50 }}>
            <Text style={styles.textAp}>Resposta: </Text>
            <Text style={styles.textPergunta}>
              {" "}
              {dataQuestao
                ? dataQuestao.resposta
                    .replace(/['</]ul[>]/g, "")
                    .replace(/[\\<]/g, "")
                    .replace(/[br>div]/, "")
                : dataQuestao.resposta}{" "}
            </Text>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            setVisible(false);
          }}
        >
          <Button
            color="#0b2639"
            title="Fechar"
            onPress={() => {
              setVisible(false);
            }}
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalQuestions;
