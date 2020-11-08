import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import api from "../../services/api";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { authLOGIN } from "../../store/actions";

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleCreateOrphanage() {
    if (!validadeForm("Email", email)) return;
    if (!validateEmail(email)) {
      return alert("E-mail invalido");
    }

    const data = {
      email,
      password,
    };

    api
      .post("/login", data)
      .then((response) => {
        api.defaults.headers.authorization = `Bearer ${response.data.token}`;
        dispatch(authLOGIN(response.data));
        navigation.navigate("SelectMapPosition");
      })
      .catch((error) => {
        alert("Email ou senha invalidos");
      });
  }

  function validadeForm(name: string, value: string) {
    if (value === "" || value === undefined) {
      alert(`O campo ${name} é obrigatório`);
      return false;
    }
    return true;
  }
  function validateEmail(email: string) {
    var reg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (reg.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
        <Text style={styles.nextButtonText}>Login</Text>
      </RectButton>
      <RectButton onPress={() => navigation.navigate("RegisterUser")}>
        <Text style={styles.cadastrar}>Cadastre-se</Text>
      </RectButton>
    </View>
  );
}
