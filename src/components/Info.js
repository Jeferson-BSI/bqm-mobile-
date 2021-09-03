import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Info = (props) => {
  const { children } = props;
  return (
    <View style={styles.info}>
      <Text style={styles.InfoText}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  info: {
    backgroundColor: "#f0f0f5",
    //backgroundColor: 'rgba(152, 148, 148, 0.1)',
    width: "95%",
    alignSelf: "center",

    height: 40,
    marginTop: 10,
    marginBottom: 8,
    padding: 5,
    alignItems: "stretch",
    justifyContent: "center",
    paddingLeft: "5%",

    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
  },

  InfoText: {
    fontSize: 17,
    color: "#2E6DA4",
    paddingLeft: 10,
    fontWeight: "700",
  },
});

export default Info;
