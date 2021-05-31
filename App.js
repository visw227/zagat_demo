/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './App/Navigation/HomeStack'
import {GlobalState} from './App/StateManagement/store'


const App = () => {


  return (

    <NavigationContainer>
      <GlobalState>
        <HomeStack></HomeStack>
      </GlobalState>
    </NavigationContainer>
  )
};

export default App;
