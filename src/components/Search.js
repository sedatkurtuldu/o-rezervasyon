import { StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import React from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';

const Search = () => {
  const isCardExpanded = useSharedValue(false);

  const handleCardPress = () => {
    isCardExpanded.value = !isCardExpanded.value;
  };

  const cardContainerStyle = useAnimatedStyle(() => {
    return {
      height: withSpring(isCardExpanded.value ? 120 : 50, {
        damping: 17,
        stiffness: 100,
        overshootClamping: false,
        restDisplacementThreshold: 0.1,
        restSpeedThreshold: 0.1,
      }),
    };
  });

  const cardTextContainerStyle = useAnimatedStyle(() => {
    return {
      marginTop: isCardExpanded.value ? 0 : 15
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


  return (
    <Pressable style={styles.container} onPress={handleCardPress}>
      <Animated.View style={[styles.cardContainer, cardContainerStyle]}>
        <Animated.View style={styles.iconContainer}>
          <Animated.View style={[styles.cardTextContainer, cardTextContainerStyle]}>
            {/* <View style={styles.placeContainer}>
              <Text>Yer</Text>
              <Text>Esnek Arama</Text>
            </View> */}
            <Animated.View style={textInputContainerStyle}>
              <Text style={styles.whereto}>Nereye?</Text>
              <View style={styles.inputContainer}>
                <AntDesign name="search1" size={20} color="black" style={styles.searchIcon} />
                <TextInput placeholder="Gidilecek yerleri arayın" style={styles.input} />
              </View>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white'
  },
  cardContainer: {
    width: '100%',
    borderRadius: 20,
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
    flex: 1,
    marginLeft: 10,
  },
  whereto:{
    fontWeight: 'bold'
  },
  placeContainer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 12,
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  input: {
    flex: 1,
  },
});
