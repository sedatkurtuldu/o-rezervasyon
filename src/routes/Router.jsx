import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Favorites from "../screens/Favorites";
import Profile from "../screens/Profile";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import SearchScreen from "../screens/SearchScreen";
import Header from "../components/Header";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "../screens/RegisterScreen";
import RegisterPasswordScreen from "../screens/RegisterPasswordScreen";
import LoginScreen from "../screens/LoginScreen";
import { auth } from "../service/firebase";
import EditProfileScreen from "../screens/EditProfileScreen";
import EditEmailScreen from "../screens/EditEmailScreen";
import HotelDetailPage from "../screens/HotelDetailPage";
import Booking from "../screens/Booking";
import ReservationDateSelectScreen from "../screens/ReservationDateSelectScreen";
import ReservationRoomSelectScreen from "../screens/ReservationRoomSelectScreen";
import ReservationPeopleSelectScreen from "../screens/ReservationPeopleSelectScreen";
import MyReservations from "../screens/MyReservations";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTab = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: "#cb1d53",
        tabBarLabelStyle: {
          fontSize: 12,
        },
        header: () => <Header navigation={navigation} />,
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "Keşfedin",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" size={size} color={color} />
          ),
        }}
        name="HomeScreen"
        component={HomeScreen}
      />

      <Tab.Screen
        options={{
          tabBarLabel: "Favoriler",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <AntDesign name="heart" size={size} color={color} />
            ) : (
              <AntDesign name="hearto" size={size} color={color} />
            ),
        }}
        name="Favorites"
        component={Favorites}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: user !== null ? "Profil" : "Oturum açın",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <Ionicons name="person-circle" size={size} color={color} />
            ) : (
              <Ionicons
                name="person-circle-outline"
                size={size}
                color={color}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="SearchModal" component={SearchModal} />
      <Stack.Screen
        name="RegisterScreen"
        options={({ navigation }) => ({
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: "O-Rezervasyon'a Kaydolun",
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerLeft: () => (
            <View style={{ marginLeft: 12 }}>
              <AntDesign
                name="close"
                size={24}
                color="black"
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        })}
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Şifre Belirle",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
        name="RegisterPasswordScreen"
        component={RegisterPasswordScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Giriş Yap",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
        name="LoginScreen"
        component={LoginScreen}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Kişisel Bilgileri Düzenle",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
        name="EditProfileScreen"
        component={EditProfileScreen}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Rezervasyonlarım",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
        name="MyReservations"
        component={MyReservations}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Email Düzenle",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          presentation: "modal",
        }}
        name="EditEmailScreen"
        component={EditEmailScreen}
      />

      <Stack.Screen
        options={{
          headerShadowVisible: false,
        }}
        name="HotelDetailPage"
        component={HotelDetailPage}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Rezervasyon Yap",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
        name="Booking"
        component={Booking}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Tarih Seçin",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
        name="ReservationDateSelectScreen"
        component={ReservationDateSelectScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Oda Seçin",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
        name="ReservationRoomSelectScreen"
        component={ReservationRoomSelectScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Kişi Seçin",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
        name="ReservationPeopleSelectScreen"
        component={ReservationPeopleSelectScreen}
      />
    </Stack.Navigator>
  );
};

const SearchModal = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitle: "",
        headerBackVisible: false,
        headerLeft: () => (
          <View style={{ marginLeft: 12 }}>
            <AntDesign
              name="close"
              size={24}
              color="black"
              onPress={() => navigation.goBack()}
            />
          </View>
        ),
      }}
    >
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default Router;
