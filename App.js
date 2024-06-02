import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import OcenyScreen from './screens/OcenyScreen';
import RejestracjaScreen from './screens/RejestracjaScreen';
import RejestracjaDetailsScreen from './screens/RejestracjaDetailsScreen';
import AktualnosciScreen from './screens/AktualnosciScreen';
import PlanScreen from './screens/PlanScreen';
import ZajeciaScreen from './screens/ZajeciaScreen';
import Toast from 'react-native-toast-message';
import './firebase'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Oceny" component={OcenyScreen} options={{ animationEnabled: false }} />
          <Stack.Screen name="Rejestracja" component={RejestracjaScreen} options={{ animationEnabled: false }} />
          <Stack.Screen name="RejestracjaDetails" component={RejestracjaDetailsScreen} options={{ animationEnabled: false }} />
          <Stack.Screen name="Aktualnosci" component={AktualnosciScreen} options={{ animationEnabled: false }} />
          <Stack.Screen name="Plan" component={PlanScreen} options={{ animationEnabled: false }} />
          <Stack.Screen name="Zajecia" component={ZajeciaScreen} options={{ animationEnabled: false }} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}
