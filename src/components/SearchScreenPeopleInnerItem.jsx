import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { EvilIcons } from "@expo/vector-icons";
import CounterActions from "../enums/CounterEnum";
import { useDispatch, useSelector } from "react-redux";
import { setReservationRoom } from "../slices/reservationRoomSlice";

const SearchScreenPeopleInnerItem = ({
  leftUpperText,
  leftBottomText,
  isBorder,
  isSearchScreen,
}) => {
  const count = useSelector((state) => state.peopleCounter || initialState);
  const reservationPeopleCount = useSelector((state) => state.reservationPeople || initialState);
  const reservationRoom = useSelector((state) => state.reservationRoom);
  const dispatch = useDispatch();

  useEffect(() => {
    if(Object.keys(reservationRoom).length === 0){
      dispatch(setReservationRoom({ [leftUpperText]: 0 }));
    }
    else {
      dispatch(setReservationRoom({ ...reservationRoom }));
    }
   
  }, [leftUpperText]); 

  const handleCounter = (action, category) => {

    const currentCount = reservationRoom[leftUpperText] || 0;
    const newCount = Math.max(currentCount + (action === CounterActions.PLUS ? 1 : -1), 0);

    dispatch(setReservationRoom({ ...reservationRoom, [leftUpperText]: newCount }));

    switch (category) {
      case "Yetişkinler":
        if (isSearchScreen) {
          dispatch({
            type: "peopleCounter/setCount",
            payload: {
              adultCount: Math.max(
                count.adultCount + (action === CounterActions.PLUS ? 1 : -1),
                0
              ),
              childCount: count.childCount,
              babyCount: count.babyCount,
            },
          });
        } else {
          dispatch({
            type: "reservationPeople/setReservationPeopleCount",
            payload: {
              reservationAdultCount: Math.max(
                reservationPeopleCount.reservationAdultCount +
                  (action === CounterActions.PLUS ? 1 : -1),
                0
              ),
              reservationChildCount:
                reservationPeopleCount.reservationChildCount,
              reservationBabyCount: reservationPeopleCount.reservationBabyCount,
            },
          });
        }

        break;
      case "Çocuklar":
        if (isSearchScreen) {
          dispatch({
            type: "peopleCounter/setCount",
            payload: {
              adultCount: count.adultCount,
              childCount: Math.max(
                count.childCount + (action === CounterActions.PLUS ? 1 : -1),
                0
              ),
              babyCount: count.babyCount,
            },
          });
        } else {
          dispatch({
            type: "reservationPeople/setReservationPeopleCount",
            payload: {
              reservationAdultCount:
                reservationPeopleCount.reservationAdultCount,
              reservationChildCount: Math.max(
                reservationPeopleCount.reservationChildCount +
                  (action === CounterActions.PLUS ? 1 : -1),
                0
              ),
              reservationBabyCount: reservationPeopleCount.reservationBabyCount,
            },
          });
        }
        break;
      case "Bebekler":
        if (isSearchScreen) {
          dispatch({
            type: "peopleCounter/setCount",
            payload: {
              adultCount: count.adultCount,
              childCount: count.childCount,
              babyCount: Math.max(
                count.babyCount + (action === CounterActions.PLUS ? 1 : -1),
                0
              ),
            },
          });
        } else {
          dispatch({
            type: "reservationPeople/setReservationPeopleCount",
            payload: {
              reservationAdultCount:
                reservationPeopleCount.reservationAdultCount,
              reservationChildCount:
                reservationPeopleCount.reservationChildCount,
              reservationBabyCount: Math.max(
                reservationPeopleCount.reservationBabyCount +
                  (action === CounterActions.PLUS ? 1 : -1),
                0
              ),
            },
          });
        }
        break;
      default:
        return;
    }
  };

  const getCountByCategory = (category) => {
    switch (category) {
      case "Yetişkinler":
        if (isSearchScreen) {
          return count.adultCount;
        } else {
          return reservationPeopleCount.reservationAdultCount;
        }
      case "Çocuklar":
        if (isSearchScreen) {
          return count.childCount;
        } else {
          return reservationPeopleCount.reservationChildCount;
        }
      case "Bebekler":
        if (isSearchScreen) {
          return count.babyCount;
        } else {
          return reservationPeopleCount.reservationBabyCount;
        }
      case category:
        return reservationRoom[category];
        
        default:
        return 0;
    }
  };

  return (
    <View
      style={[styles.peopleContainer, { borderBottomWidth: isBorder ? 1 : 0 }]}
    >
      <View style={styles.peopleLeftTextContainer}>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>{leftUpperText}</Text>
        <Text style={{ fontSize: 12, color: "gray" }}>{leftBottomText}</Text>
      </View>
      <View style={styles.peopleRightContainer}>
        <TouchableOpacity
          onPress={() => handleCounter(CounterActions.MINUS, leftUpperText)}
        >
          <EvilIcons name="minus" size={36} color="black" />
        </TouchableOpacity>

        <Text style={{ fontSize: 20, fontWeight: "600" }}>
          {getCountByCategory(leftUpperText)}
        </Text>

        <TouchableOpacity
          onPress={() => handleCounter(CounterActions.PLUS, leftUpperText)}
        >
          <EvilIcons name="plus" size={36} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchScreenPeopleInnerItem;

const styles = StyleSheet.create({
  peopleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#EBEBEB",
    padding: 20,
  },
  peopleLeftTextContainer: {
    gap: 5,
  },
  peopleRightContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
