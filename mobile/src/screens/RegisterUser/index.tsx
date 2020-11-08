import React, { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";

import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import api from "../../services/api";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { authLOGIN } from "../../store/actions";

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  async function handleCreateOrphanage() {
    if (!validadeForm("Nome", name)) return;
    if (!validadeForm("Email", email)) return;
    if (!validadeForm("senha", password)) return;
    if (!(password === passwordConfirm)) {
      return alert("Senhas diferentes");
    }
    if (!validateEmail(email)) {
      return alert("E-mail invalido");
    }

    const data = {
      email,
      password,
      name,
    };

    api
      .post("/users", data)
      .then((response) => {
        api.defaults.headers.authorization = `Bearer ${response.data.token}`;
        dispatch(authLOGIN(response.data));
        navigation.navigate("SelectMapPosition");
      })
      .catch((error) => {
        alert("Error tente novamente");
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}
    >
      <Text style={styles.title}>Cadastro</Text>

      <Text style={styles.label}>name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Text style={styles.label}>Confirme Senha</Text>
      <TextInput
        style={styles.input}
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        secureTextEntry={true}
      />

      <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
        <Text style={styles.nextButtonText}>Login</Text>
      </RectButton>
    </ScrollView>
  );
}
