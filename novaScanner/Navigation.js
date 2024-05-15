// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import HomeScreen from "./screens/HomeScreen";
import UserListScreen from "./screens/UserListScreen";
import PhoneScreen from "./screens/PhoneScreen";

// Icons
import { Home, List } from "lucide-react-native";

// Stack Telefono
const Stack = createStackNavigator();

function StackTelefono() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Carga de Cliente"
        component={HomeScreen}
        options={{
          tabBarIcon: (opts) => <Home color={opts.color} size={opts.size} />,
          headerShown: false,
        }}
      />
      <Stack.Screen name="Telefono" component={PhoneScreen} />
    </Stack.Navigator>
  );
}

// Tab
const Tab = createBottomTabNavigator();

function TabGroup() {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarShowLabel: true,
        tabBarActiveTintColor: "red",
        headerShown: true,
      })}
    >
      <Tab.Screen
        name="Listado de Clientes"
        component={UserListScreen}
        options={{
          tabBarIcon: (opts) => <List color={opts.color} size={opts.size} />,
        }}
      />
      <Tab.Screen
        name="Home"
        component={StackTelefono}
        options={{
          tabBarIcon: (opts) => <Home color={opts.color} size={opts.size} />,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <TabGroup />
    </NavigationContainer>
  );
}
