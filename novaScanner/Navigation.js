// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import HomeScreen from "./screens/HomeScreen";
import UserListScreen from "./screens/UserListScreen";
import PhoneScreen from "./screens/PhoneScreen";
import UserViewScreen from "./screens/ViewUserScreen";

// Icons
import { UserRoundPlus, BookUser } from "lucide-react-native";

// Stack Telefono
const Stack = createStackNavigator();

function StackTelefono() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Carga de Cliente"
        component={HomeScreen}
        options={{
          tabBarIcon: (opts) => (
            <UserRoundPlus color={opts.color} size={opts.size} />
          ),
          headerShown: false,
        }}
        initialParams={{ client: {} }}
      />
      <Stack.Screen name="Telefono" component={PhoneScreen} />
    </Stack.Navigator>
  );
}

// Stack lista clientes

function StackUserList() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Lista de Clientes" component={UserListScreen} />
      <Stack.Screen name="Detalle Cliente" component={UserViewScreen} />
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
        tabBarActiveTintColor: "#3f74ff",
        headerShown: true,
      })}
    >
      <Tab.Screen
        name="Clientes"
        component={StackUserList}
        options={{
          tabBarIcon: (opts) => (
            <BookUser color={opts.color} size={opts.size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Añadir Cliente"
        component={StackTelefono}
        options={{
          tabBarIcon: (opts) => (
            <UserRoundPlus color={opts.color} size={opts.size} />
          ),
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
