import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

import OrphanagesMap from "./screens/Orphanages";
import SelectMapPosition from "./screens/CreateOrphanages";
import FormOrphanages from "./screens/CreateOrphanages/FormOrphanages";
import OrphanageDetails from "./screens/OrphanageDetails";
import Header from "./components/Header";
import Onboarding1 from "./screens/Onboarding1";
import Onboarding2 from "./screens/Onboarding2";
import RegisterSucess from "./screens/RegisterSucess";
import RegisterUser from "./screens/RegisterUser";
import Login from "./screens/Login";

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "#f2f3f5" },
        }}
      >
        <Screen component={Onboarding1} name="Onboarding1" />
        <Screen component={Onboarding2} name="Onboarding2" />
        <Screen component={OrphanagesMap} name="OrphanagesMap" />
        <Screen component={RegisterSucess} name="RegisterSucess" />
        <Screen
          options={{
            headerShown: true,
            header: () => <Header title="Login" />,
          }}
          component={Login}
          name="Login"
        />
        <Screen
          options={{
            headerShown: true,
            header: () => <Header title="Cadastro" />,
          }}
          component={RegisterUser}
          name="RegisterUser"
        />
        <Screen
          options={{
            headerShown: true,
            header: () => <Header title="seleceione no mapa" />,
          }}
          component={SelectMapPosition}
          name="SelectMapPosition"
        />
        <Screen
          options={{
            headerShown: true,
            header: () => <Header title="Informe os dados" />,
          }}
          component={FormOrphanages}
          name="FormOrphanages"
        />
        <Screen
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title="Orfanato" />,
          }}
          component={OrphanageDetails}
          name="OrphanageDetails"
        />
      </Navigator>
    </NavigationContainer>
  );
}
