// MyBottomSheet.js

import React, {
  useCallback,
  useMemo,
  useRef,
  useImperativeHandle,
} from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import HomeScreenCard from './HomeScreenCard';

const MyBottomSheet = React.forwardRef((props, ref) => {
  const bottomSheetModalRef = useRef(null);

  useImperativeHandle(ref, () => ({
    openBottomSheet: () => {
      bottomSheetModalRef.current?.present();
    },
  }));

  const snapPoints = useMemo(() => ['4%', '50%', '100%'], []);

  const handleSheetChanges = useCallback((index) => {
    // console.log('handleSheetChanges', index);
  }, []);

  const data = [1, 2, 3, 4, 5];

  const renderItem = ({ item }) => <HomeScreenCard />;

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={2}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={false}
        >
          <View style={styles.contentContainer}>
            <BottomSheetFlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default MyBottomSheet;
