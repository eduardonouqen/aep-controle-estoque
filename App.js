import React, { useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Estoque from "./screens/Estoque.js";
import LoginScreen from "./screens/LoginScreen.js";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const getEstaLogado = async () => {
  const credenciais = await AsyncStorage.getItem('credenciais');
  return credenciais !== null;
};

function StackDoEstoque() {
  const [estaLogado, setEstaLogado] = useState(null);

  useEffect(() => {
    const verificarCredenciais = async () => {
      const logado = await getEstaLogado();
      setEstaLogado(logado);
    };

    verificarCredenciais();
  }, []);

  if (estaLogado === null) {
    return null;
  }

  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      {estaLogado ? (
        <>
          <Stack.Screen name="Estoque" component={Estoque} />
        </>
      ) : (
        <>
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{
            headerShown: false
          }} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Estoque" component={StackDoEstoque} options={{
          headerShown: false,
          tabBarIcon: () => <AntDesign name="form" size={24} color="black" />
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}