import { StyleSheet, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Favorites from '../screens/Favorites';
import Profile from '../screens/Profile';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import SearchScreen from '../screens/SearchScreen';
import Header from '../components/Header';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Router = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: '#e81f89',
        tabBarLabelStyle: {
          fontSize: 12
        },
        header: () => <Header navigation={navigation} />,
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: 'Keşfedin',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" size={size} color={color} />
          ),
        }}
        name="HomeScreen"
        component={HomeScreen}
      />

      <Tab.Screen
        options={{
          tabBarLabel: 'Favoriler',
          tabBarIcon: ({ color, size, focused }) => (
            focused ? (
              <AntDesign name="heart" size={size} color={color} />
            ) : (
              <AntDesign name="hearto" size={size} color={color} />
            )
          )
        }}
        name="Favorites"
        component={Favorites}
      />

      <Tab.Screen
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size, focused }) => (
            focused ? (
              <Ionicons name="person-circle" size={size} color={color} />
            ) : (
              <Ionicons name="person-circle-outline" size={size} color={color} />
            )
          )
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  )
};

const Main = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={Router} />
      <Stack.Screen name="SearchModal" component={SearchModal} />
    </Stack.Navigator>
  );
}

const SearchModal = ({ navigation }) => {
  return (
    <Stack.Navigator
    screenOptions={{
        headerShadowVisible: false,
        headerTitle: '',
        headerBackVisible:false,
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
        <Stack.Screen name="SearchScreen" options={{ presentation: 'transparentModal', animation: 'fade'}} component={SearchScreen} />
    </Stack.Navigator>
  )
};

export default Main;
