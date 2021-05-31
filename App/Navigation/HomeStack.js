// In App.js in a new project

import * as React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/Home/HomeScreenIndex'
import FavoritesScreen from '../Screens/Favorites/FavoritesScreenIndex'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../utils/constant';
Ionicons.loadFont()

const Tab = createBottomTabNavigator();

function HomeTab() {
  return (

    <Tab.Navigator
  
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'Favorites') {
            iconName = 'star';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={21} color={color} />;
        },
      })}

      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Search" component={HomeStack} />
      <Tab.Screen name="Favorites" component={FavoritesStack} />
    </Tab.Navigator>

  );
}

const Stack = createStackNavigator();

function HomeStack() {
  return (

    <Stack.Navigator 
    screenOptions={{
      headerStyle: { elevation: 0 },
      cardStyle: { backgroundColor: style.stackStyles.backgroundColor}
    }}>
      <Stack.Screen name="Search Github" component={HomeScreen} />

    </Stack.Navigator>


  );
}
function FavoritesStack() {
  return (

    <Stack.Navigator   
     screenOptions={{
      headerStyle: { elevation: 0 },
      cardStyle: { backgroundColor: style.stackStyles.backgroundColor}
    }}
    >
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>


  );
}


export default HomeTab;

const style = StyleSheet.create({

  stackStyles : {
    backgroundColor : colors.blue
  },



})
