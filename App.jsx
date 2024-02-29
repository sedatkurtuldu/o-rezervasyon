import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/app/store';
import Router from './src/routes/Router';
import { useFonts } from 'expo-font';

export default function App() {

  const [fontsLoaded] = useFonts({
    'Inter-Black': require('./assets/fonts/Inter-Black.ttf'),
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
