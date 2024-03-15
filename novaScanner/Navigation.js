// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import HomeScreen from "./screens/HomeScreen";
import USerListScreen from "./screens/UserListScreen";

// Icons
import { Home, List } from "lucide-react-native";

// Tab
const Tab = createBottomTabNavigator();

function TabGroup() {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#005ce7",
        headerShown: true,
      })}
    >
      <Tab.Screen
        name="Carga"
        component={HomeScreen}
        options={{
          tabBarIcon: (opts) => <Home color={opts.color} size={opts.size} />,
        }}
      />
      <Tab.Screen
        name="UserList"
        component={USerListScreen}
        options={{
          tabBarIcon: (opts) => <List color={opts.color} size={opts.size} />,
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
