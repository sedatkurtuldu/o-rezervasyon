import React, {
  useCallback,
  useMemo,
  useRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import HomeScreenCard from "./HomeScreenCard";
import { getHotels } from "../service/api";

const MyBottomSheet = React.forwardRef((props, ref) => {
  const bottomSheetModalRef = useRef(null);

  const { navigation } = props;
  const { filteredHotels } = props;
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hotelsData = await getHotels();
        setHotels(hotelsData);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchData();
  }, []);

  useImperativeHandle(ref, () => ({
    openBottomSheet: () => {
      bottomSheetModalRef.current?.present();
    },
  }));

  const snapPoints = useMemo(() => ["4%", "50%", "100%"], []);

  const handleSheetChanges = useCallback((index) => {
    // console.log('handleSheetChanges', index);
  }, []);

  const renderItem = ({ item }) => <HomeScreenCard data={item} navigation={navigation}/>;

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
              data={filteredHotels && filteredHotels.length > 0 ? filteredHotels : hotels}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
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
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default MyBottomSheet;
