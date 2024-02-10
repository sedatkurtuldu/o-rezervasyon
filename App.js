import { StyleSheet } from 'react-native';
import Router from './src/routes/Router';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/app/store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
