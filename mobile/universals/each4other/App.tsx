import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, useThemeContext } from './context/ThemeContext';

// Screens
import MainMenu from './screens/MainMenu';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';
import Profile from './screens/Profile';
import UserDetail from './screens/UserDetail';
import AllNotifications from './screens/AllNotifications';
import ContentPage from './screens/ContentPage';

// Navigation param list type
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
