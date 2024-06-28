import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Inicio from "./screens/tabScreens/Inicio";
import Notificaciones from "./screens/NotificacionesStack/Notificaciones";
import Mas from "./screens/tabScreens/Mas";
import Detail from "./screens/homeStack/Detail";
import Cajas from "./screens/tabScreens/Cajas";
import Ventas from "./screens/tabScreens/Ventas";
import CajasList from "./screens/cajasStack/CajasList";
import CajaDetail from "./screens/cajasStack/CajaDetail";
import NotificacionDetail from "./screens/NotificacionesStack/NotificacionDetail";
import Comparativa from "./screens/ventasTopTab/Comparativa";
import { Home, Banknote, LineChart, Menu } from "lucide-react-native";
import { useAuth } from "./context/AuthContext";
import Login from "./screens/Login";
import Navbar from "./components/Navbar";
import SplashScreen from "./screens/SplashScreen";

// TopTab
const TopTab = createMaterialTopTabNavigator();

function TopTabGroup() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: "capitalize",
          fontFamily: "MontserratMedium",
          color: "#fff",
        },
        tabBarStyle: { backgroundColor: "#2b2b2e" },
        tabBarIndicatorStyle: { backgroundColor: "#005ce7" },
      }}
    >
      <TopTab.Screen
        name="VentasMain"
        component={Ventas}
        options={{ tabBarLabel: "Ventas" }}
      />
      <TopTab.Screen name="Comparativo" component={Comparativa} />
    </TopTab.Navigator>
  );
}

//Stack
const Stack = createNativeStackNavigator();

function StackGroup() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Inicio}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function StackCajas() {
  return (
    <Stack.Navigator initialRouteName="CajasMain">
      <Stack.Screen
        name="CajasMain"
        component={Cajas}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CajasList"
        component={CajasList}
        options={{
          title: "Cajas",
          headerBackTitle: true,
          headerShadowVisible: false,
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#2b2b2e" },
        }}
      />

      <Stack.Screen
        name="CajaDetail"
        component={CajaDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function MainStack() {
  const authContext = useAuth();

  return (
    <Stack.Navigator>
      {authContext.authState.token === null ? (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen
          name="HomeMain"
          component={TabGroup}
          options={{
            headerShown: true,
            header: () => <Navbar />,
          }}
        />
      )}
    </Stack.Navigator>
  );
}

// function StackApp() {
//   const { authState, onLogout } = useAuth();
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="HomeMain"
//         component={TabGroup}
//         options={{
//           headerRight: () => (
//             <Button onPress={onLogout} title="Cerrar Sesion" />
//           ),
//           headerShown: true,
//           header: () => <Navbar />,
//         }}
//       />

//       <Stack.Screen
//         name="Login"
//         component={Login}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// }

//Tabs

const Tab = createBottomTabNavigator();

function TabGroup() {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#4260ee",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={StackGroup}
        options={{
          tabBarIcon: (opts) => <Home color={opts.color} size={opts.size} />,
        }}
      />
      <Tab.Screen
        name="Cajas"
        component={StackCajas}
        options={{
          tabBarIcon: (opts) => (
            <Banknote color={opts.color} size={opts.size} />
          ),
        }}
      />
      <Tab.Screen
        name="Ventas"
        component={TopTabGroup}
        options={{
          tabBarIcon: (opts) => (
            <LineChart color={opts.color} size={opts.size} />
          ),
        }}
      />
      <Tab.Screen
        name="Mas"
        component={Mas}
        options={{
          tabBarIcon: (opts) => <Menu color={opts.color} size={opts.size} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
