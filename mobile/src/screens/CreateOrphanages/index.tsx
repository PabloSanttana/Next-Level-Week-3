import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import MapView, { MapEvent, Marker } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { AppLoading } from "expo";
import { useSelector, useDispatch } from "react-redux";

import mapMarkerImg from "../../images/map-marker.png";
import loading from "../../images/loading.gif";

import styles from "./styles";
import api from "../../services/api";
import { authLOGOUT } from "../../store/actions";

export default function SelectMapPosition() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate);
  }
  useFocusEffect(() => {
    api
      .get("authenticate/token")
      .then((response) => {})
      .catch((error) => {
        dispatch(authLOGOUT());
        navigation.navigate("Login");
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
      }
    }
    loadInitialPosition();
  }, []);

  function handleNextStep() {
    navigation.navigate("FormOrphanages", { position });
  }
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
        initialRegion={{
          latitude: position.latitude,
          longitude: position.longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        onPress={handleSelectMapPosition}
        style={styles.mapStyle}
      >
        {!!position.latitude && (
          <Marker icon={mapMarkerImg} coordinate={position} />
        )}
      </MapView>

      <RectButton
        style={styles.nextButtonUser}
        onPress={() => navigation.navigate("Login")}
      >
        <FontAwesome name="user-circle-o" color="#15c3d6" size={50} />
      </RectButton>

      {!!position.latitude && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  );
}
