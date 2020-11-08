import React from "react";
import { View, Text } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

interface SidebarProps {
  active?: boolean;
  nav: string;
}

export default function index({ active = true, nav }: SidebarProps) {
  const navigate = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.navigateON}>
        {active ? (
          <>
            <View style={{ ...styles.nav, ...styles.active }}></View>
            <View style={styles.nav}></View>
          </>
        ) : (
          <>
            <View style={[styles.nav]}></View>
            <View style={{ ...styles.nav, ...styles.active }}></View>
          </>
        )}
      </View>
      <BorderlessButton
        style={styles.button}
        onPress={() => navigate.navigate(nav)}
      >
        <Feather name="arrow-right" size={24} color="#15b6d6" />
      </BorderlessButton>
    </View>
  );
}
