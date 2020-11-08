import React from "react";
import { View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BorderlessButton } from "react-native-gesture-handler";

import styles from "./styles";
import ilustra from "../../images/Vector.png";

export default function index() {
  const navigate = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <Image source={ilustra} />
        <Text style={styles.title}>Ebaaa!</Text>
        <Text style={styles.Subtitle}>
          O cadastro deu certo e foi enviado ao administrador para ser aprovado.
        </Text>
        <BorderlessButton
          style={styles.button}
          onPress={() => navigate.navigate("OrphanagesMap")}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>OK</Text>
        </BorderlessButton>
      </View>
    </>
  );
}
