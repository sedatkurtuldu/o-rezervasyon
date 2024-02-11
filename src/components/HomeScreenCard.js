import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { Ionicons } from '@expo/vector-icons';

const width = Dimensions.get('window').width;
const HomeScreenCard = () => {
  const data = [
    {
      imgUrl: 'https://picsum.photos/id/11/200/300',
    },
    {
      imgUrl: 'https://picsum.photos/id/10/200/300',
    },
    {
      imgUrl: 'https://picsum.photos/id/12/200/300',
    },
  ];
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavIconPress = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <Pressable style={styles.card}>
      <TouchableOpacity style={styles.favIcon} onPress={handleFavIconPress}>
        {isFavorite ? (
          <View>
            <Ionicons name={'heart'} size={30} color={'#e81f89'} />
          </View>
        ) : (
          <View>
            <View>
              <Ionicons name={'heart'} size={30} color={'gray'} />
            </View>
            <View style={{ position: 'absolute' }}>
              <Ionicons name={'heart-outline'} size={30} color={'white'} />
            </View>
          </View>
        )}
      </TouchableOpacity>
      <Carousel
        loop
        width={width * 0.9}
        height={width / 1.5}
        autoPlay={true}
        data={data}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <Image source={{ uri: item.imgUrl }} style={styles.image} />
        )}
      />
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>İlçe, İl</Text>
          <Text>Konyaaltı plajı</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            3000 ₺
          </Text>
          <Text style={{ color: '#666', fontWeight: 'normal', marginLeft: 12}}>Gece</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default HomeScreenCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: width,
    height: width / 1.5,
  },
  contentContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  priceContainer: {
    justifyContent: 'flex-end',
    marginRight: 18
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  favIcon: {
    padding: 5,
    borderRadius: 50,
    position: 'absolute',
    top: 1,
    right: 4,
    zIndex: 999,
  },
});
