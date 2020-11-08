import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./styles";
import ilustra from "../../images/Ilustra02.png";
import SiderbarBottom from "../../components/SiderbarBottom";

export default function index() {
  return (
    <>
      <View style={styles.container}>
        <Image source={ilustra} />
        <Text style={styles.title}>
          Escolha um orfanato no mapa e faça uma visita
        </Text>
      </View>
      <SiderbarBottom nav="OrphanagesMap" active={false} />
    </>
  );
}
