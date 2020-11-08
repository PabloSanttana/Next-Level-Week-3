import React, { useEffect, useState } from "react";
import { View, Text, Image, Alert } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

import mapMarker from "../../images/map-marker.png";
import styles from "./styles";
import { RectButton } from "react-native-gesture-handler";
import api from "../../services/api";
import loading from "../../images/loading.gif";

interface Orphanage {
  latitude: number;
  longitude: number;
  id: number;
  name: string;
}

export default function index() {
  const navigation = useNavigation();
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  function handleNavigateToDeatail(id: number) {
    navigation.navigate("OrphanageDetails", { id });
  }

  // chamado quando a tela e aberta
  useFocusEffect(() => {
    api.get("orphanages").then((response) => {
      setOrphanages(response.data);
    });
  });
  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const location = await getCurrentPositionAsync();
        const { latitude, longitude } = location.coords;

        setPosition({
          latitude,
          longitude,
        });
      } else {
        Alert.alert("Não foi possivel pegar usa posição");
      }
    }
    loadInitialPosition();
  }, []);

  if (position.longitude === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image source={loading} resizeMode="center" />
        <Text style={{ fontFamily: "Nunito_800ExtraBold", color: "#15c3d6" }}>
          Carregando sua posição atual, aguarde...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: position.latitude,
          longitude: position.longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {orphanages.map((orphanage, index) => {
          return (
            <Marker
              key={orphanage.id}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
              icon={mapMarker}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            >
              <Callout
                tooltip={true}
                onPress={() => handleNavigateToDeatail(orphanage.id)}
              >
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {orphanages.length} orfanatos encontrados
        </Text>
        <RectButton
          style={styles.createOrphanagesButton}
          onPress={() => navigation.navigate("SelectMapPosition")}
        >
          <Feather name="plus" size={20} color="#ffff" />
        </RectButton>
      </View>
    </View>
  );
}
