import React from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput, Text, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';

const Header = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => navigation.navigate('SearchModal')}
      >
        <View style={styles.iconContainer}>
          <View style={styles.searchIcon}>
            <AntDesign name="search1" size={24} color="black" />
          </View>
          
          <View style={styles.cardTextContainer}>
            <Text style={styles.whereto}>Nereye?</Text>
            <Text style={styles.definition}>O'Rezervasyonunuzu arayın</Text>
          </View>
          
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Platform.OS === "ios" ? 5 : 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity:Platform.OS === "ios" ? 0.22 : 1.22,
    shadowRadius: 3.22,
    elevation: 3,
    backgroundColor: 'white',
  },
  cardContainer: {
    width: '87%',
    height: 50,
    borderRadius: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 6,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 14,
    marginLeft: 6
  },
  cardTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
  },
  whereto: {
    fontWeight: 'bold'
  },
  definition: {
    fontSize: 14,
  },
  searchContainer: {
    flex: 1,
  },
});

export default Header;
