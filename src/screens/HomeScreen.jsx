import { StyleSheet, View, Text, Button } from 'react-native';
import React, { useRef, useEffect } from 'react';
import MapView from 'react-native-maps';
import {
  BottomSheetModalProvider,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import MyBottomSheet from '../components/MyBottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const HomeScreen = () => {
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    bottomSheetRef.current?.openBottomSheet();
  }, []);

  return (
    <BottomSheetModalProvider>
      <GestureHandlerRootView style={styles.container}>
        <MapView style={styles.map} />
        <MyBottomSheet ref={bottomSheetRef} />
      </GestureHandlerRootView>
    </BottomSheetModalProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
