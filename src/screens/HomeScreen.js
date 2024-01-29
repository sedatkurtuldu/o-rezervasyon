import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const HomeScreen = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('SearchModal')}>
      <Text>Buton</Text>
    </TouchableOpacity>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
