import React, { useState } from "react";
import { Modal, View, StyleSheet, Text } from "react-native";

function MathLive() {
  const simbolo = ["(x^n)", "(sqrt[n]{x})", "(displaystyle{int_{a}^{b}})"];
  return (
    <Modal visible={true} transparent animationType="slide">
      <View style={{ flex: 1 }}></View>
      <View style={styles.container}>
        <Text>dsfd</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
export default MathLive;
