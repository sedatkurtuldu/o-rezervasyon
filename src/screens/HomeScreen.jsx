import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import {
  BottomSheetModalProvider,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import MyBottomSheet from '../components/MyBottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const HomeScreen = () => {
  const mapRef = useRef(null);
  const bottomSheetRef = useRef(null);
  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = location.coords;
          setInitialRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestLocationPermission();
  }, []);

  const handleMapReady = () => {
    if (mapRef.current && initialRegion) {
      mapRef.current.animateToRegion(initialRegion, 1000);
    }
  };

  useEffect(() => {
    bottomSheetRef.current?.openBottomSheet();
  }, []);

  return (
    <BottomSheetModalProvider>
      <GestureHandlerRootView style={styles.container}>
        {initialRegion && (
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={initialRegion}
            onMapReady={handleMapReady}>
            <Marker coordinate={initialRegion} />
          </MapView>
        )}
        <MyBottomSheet ref={bottomSheetRef} />
      </GestureHandlerRootView>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default HomeScreen;
