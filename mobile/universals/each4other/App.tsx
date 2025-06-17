import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, useThemeContext } from './context/ThemeContext';

import MainMenu from './screens/MainMenu';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';
import Profile from './screens/Profile';
import UserDetail from './screens/UserDetail';
import AllNotifications from './screens/AllNotifications';
import ContentPage from './screens/ContentPage';

import Auctions from './screens/Auctions';
import About from './screens/About';
import Contact from './screens/Contact';
import Support from './screens/Support';

export type RootStackParamList = {
  MainMenu: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  Profile: undefined;
  UserDetail: { fieldName: string };
  AllNotifications: undefined;
  ContentPage: { section: 'gallery' | 'about' | 'contact' | 'help' };
  Auctions: undefined;
  About: undefined;
  Contact: undefined;
  Support: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigation() {
  const { theme } = useThemeContext();

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
  <Stack.Screen name="MainMenu" component={MainMenu} />
  <Stack.Screen name="Login" component={Login} />
  <Stack.Screen name="SignUp" component={SignUp} />
  <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  <Stack.Screen name="ResetPassword" component={ResetPassword} />
  <Stack.Screen name="Profile" component={Profile} />
  <Stack.Screen name="UserDetail" component={UserDetail} />
  <Stack.Screen name="AllNotifications" component={AllNotifications} />
  <Stack.Screen name="ContentPage" component={ContentPage} />
  <Stack.Screen name="Auctions" component={Auctions} />
  <Stack.Screen name="About" component={About} />
  <Stack.Screen name="Contact" component={Contact} />
  <Stack.Screen name="Support" component={Support} />
</Stack.Navigator>

    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
}
