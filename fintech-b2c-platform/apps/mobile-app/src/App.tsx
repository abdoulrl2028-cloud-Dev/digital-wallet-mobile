import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import TransferScreen from './screens/TransferScreen';
import PaymentScreen from './screens/PaymentScreen';
import ProfileScreen from './screens/ProfileScreen';

// Store
import { useAuthStore } from './store/authStore';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * Navegador autenticado - abas principais
 */
function AuthenticatedNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#6366F1',
        tabBarInactiveTintColor: '#9CA3AF',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Início',
          tabBarLabel: 'Início',
        }}
      />
      <Tab.Screen
        name="Transfer"
        component={TransferScreen}
        options={{
          title: 'Transferir',
          tabBarLabel: 'Transferir',
        }}
      />
      <Tab.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          title: 'Pagamentos',
          tabBarLabel: 'Pagamentos',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
          tabBarLabel: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
}

/**
 * Navegador não autenticado
 */
function UnauthenticatedNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

/**
 * Componente principal da aplicação
 */
export default function App() {
  const { isAuthenticated, checkToken } = useAuthStore();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        if (token) {
          checkToken(token);
        }
      } catch (error) {
        console.error('Erro ao inicializar app:', error);
      }
    };

    initializeApp();
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthenticatedNavigator /> : <UnauthenticatedNavigator />}
    </NavigationContainer>
  );
}
