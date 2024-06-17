import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import Estoque from "./screens/Estoque.js";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function StackDoEstoque() {
  return (
    <Stack.Navigator initialRouteName="Estoque">
      <Stack.Screen name="Estoque" component={Estoque} />
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