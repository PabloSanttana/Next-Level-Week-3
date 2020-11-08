import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./styles";
import word from "../../images/Ilustra01.png";
import SiderbarBottom from "../../components/SiderbarBottom";

export default function index() {
  return (
    <>
      <View style={styles.container}>
        <Image source={word} />
        <Text style={styles.title}>Leve felicidade para o mundo</Text>
        <Text style={styles.subTitle}>
          Visite orfanatos e mude o dia de muitas crianças.
        </Text>
      </View>
      <SiderbarBottom nav="Onboarding2" />
    </>
  );
}
