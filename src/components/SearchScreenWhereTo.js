import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, Pressable, View, Dimensions, TouchableOpacity, BackHandler, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';

const height = Dimensions.get('window').height;

const SearchScreenWhereTo = () => {
  const isCardExpanded = useSharedValue(false);

  const [cities, setCities] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (searchText.trim() !== '') {
      fetch(`https://api.kadircolak.com/Konum/JSON/API/ShowAllCity`)
        .then(response => response.json())
        .then(data => setCities(data));
    }
  }, [searchText]);

  useEffect(() => {
    const handleBackPress = () => {
      if (isCardExpanded.value) {
        isCardExpanded.value = false;
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => backHandler.remove();
  }, [isCardExpanded]);

  const handleCardPress = () => {
    isCardExpanded.value = !isCardExpanded.value;
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const handleSelectedListItem = (item) => {
    setSearchText(item.TEXT);
  };

  const filteredCities = cities
    ? cities.filter((city) => city.TEXT.trim().toLowerCase().includes(searchText.trim().toLowerCase()))
    : [];

  const cardContainerStyle = useAnimatedStyle(() => {
    return {
      height: withSpring(isCardExpanded.value ? height : 50, {
        damping: 17,
        stiffness: 100,
        overshootClamping: false,
        restDisplacementThreshold: 0.1,
        restSpeedThreshold: 0.1,
      }),
      width: withSpring(isCardExpanded.value ? '107%' : '100%', {
        damping: 17,
        stiffness: 100,
        overshootClamping: false,
        restDisplacementThreshold: 0.1,
        restSpeedThreshold: 0.1,
      }),
      alignItems: isCardExpanded.value ? 'flex-start' : 'center',
    };
  });

  const placeContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isCardExpanded.value ? 0 : 1, {
        duration: 200,
        easing: Easing.ease,
      }),
      display: isCardExpanded.value ? 'none' : 'flex',
    };
  });

  const cardTextContainerStyle = useAnimatedStyle(() => {
    return {
      marginTop: withTiming(isCardExpanded.value ? 0 : 15, {
        duration: 200,
        easing: Easing.ease,
      }),
      opacity: withTiming(isCardExpanded.value ? 1 : 0, {
        duration: 200,
        easing: Easing.ease,
      }),
      display: isCardExpanded.value ? 'flex' : 'none',
      marginTop: isCardExpanded.value ? 16 : 0
    };
  });

  const textInputContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isCardExpanded.value ? 1 : 0, {
        duration: 200,
        easing: Easing.ease,
      }),
      pointerEvents: isCardExpanded.value ? 'auto' : 'none',
    };
  });

  const listItem = ({ item }) => {
    
    const handlePress = () => {
      handleSelectedListItem(item);
      Keyboard.dismiss();
      isCardExpanded.value = false
    };
  
    return (
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.listItemContainer}>
          <EvilIcons name="location" size={30} color="black" style={styles.locationIcon} />
          <Text style={styles.listItemText}>{item.TEXT}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  

  return (
    <Pressable style={styles.container} onPress={handleCardPress}>
      <Animated.View style={[styles.cardContainer, cardContainerStyle]}>
        <Animated.View style={styles.iconContainer}>
          <Animated.View style={[styles.placeContainer, placeContainerStyle]}>
            <Text style={styles.placeText}>Yer</Text>
            {searchText !== '' ? 
               <Text style={styles.placeText}>{searchText}</Text>
            :
            <Text style={styles.placeText}>Esnek Arama</Text>
            }
          </Animated.View>
          <Animated.View style={[styles.cardTextContainer, cardTextContainerStyle]}>
            <Animated.View style={textInputContainerStyle}>
              <Text style={styles.whereto}>Nereye?</Text>
              <View style={styles.inputContainer}>
                <AntDesign name="search1" size={20} color="black" style={styles.searchIcon} />
                <TextInput 
                  placeholder="Yerleri arayın" 
                  value={searchText}
                  onChangeText={handleSearchTextChange}
                  style={styles.input} 
                />
              </View>
              <View style={styles.flatList}>
                <FlatList
                  data={filteredCities}
                  renderItem={listItem}
                  keyExtractor={(city) => city.ID.toString()}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps='handled'
                />
              </View>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export default SearchScreenWhereTo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
  },
  cardContainer: {
    borderRadius: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
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
  },
  searchIcon: {
    marginRight: 14,
    marginLeft: 6
  },
  cardTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  whereto: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 16
  },
  placeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  placeText: {
    fontSize: 16,
    fontWeight: '500'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBEBEB',
    borderRadius: 12,
    marginTop: 8,
    padding: 10
  },
  input: {
    flex: 1,
  },
  flatList: {
    marginTop: 10,
    marginBottom: 10
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    gap: 20
  },
  locationIcon: {
    backgroundColor: '#EBEBEB',
    padding: 12,
    borderRadius: 10,
  },
  listItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
