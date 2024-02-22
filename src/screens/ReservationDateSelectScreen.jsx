import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CALENDAR_TR_LOCALE from "../locales/CALENDAR_TR_LOCALE";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { setReservationDateSelect } from "../slices/reservationDateSelectSlice";
import { MaterialIcons } from "@expo/vector-icons";
LocaleConfig.locales["tr"] = CALENDAR_TR_LOCALE;

LocaleConfig.defaultLocale = "tr";

const ReservationDateSelectScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const reservationDateSelect = useSelector(
    (state) => state.reservationDateSelect
  );

  const handleDayPress = (day) => {
    if (!reservationDateSelect.startDate || reservationDateSelect.endDate) {
      dispatch(
        setReservationDateSelect({
          startDate: day.dateString,
          endDate: "",
        })
      );
    } else {
      if (moment(day.dateString).isBefore(reservationDateSelect.startDate)) {
        dispatch(
          setReservationDateSelect({
            startDate: day.dateString,
            endDate: "",
          })
        );
      } else {
        dispatch(
          setReservationDateSelect({
            ...reservationDateSelect,
            endDate: day.dateString
          })
        );
        navigation.goBack();
      }
    }
  };
  const markedDates = {};

  if (reservationDateSelect.startDate && reservationDateSelect.endDate) {
    let currentDate = moment(reservationDateSelect.startDate);
    while (currentDate.isSameOrBefore(reservationDateSelect.endDate)) {
      const formattedDate = currentDate.format("YYYY-MM-DD");
      markedDates[formattedDate] = { textColor: "white", color: "#f871b8" };
      currentDate.add(1, "days");
    }
  }

  if (reservationDateSelect.startDate) {
    markedDates[moment(reservationDateSelect.startDate).format("YYYY-MM-DD")] =
      {
        startingDay: true,
        textColor: "white",
        color: "#e81f89",
      };
  }
  if (reservationDateSelect.endDate) {
    markedDates[moment(reservationDateSelect.endDate).format("YYYY-MM-DD")] = {
      endingDay: true,
      textColor: "white",
      color: "#e81f89",
    };
  }

  return (
    <View style={styles.container}>
      <Calendar
        markingType={"period"}
        minDate={moment().format("YYYY-MM-DD")}
        current={moment().format("YYYY-MM-DD")}
        enableSwipeMonths
        firstDay={1}
        markedDates={markedDates}
        onDayPress={handleDayPress}
        locale={CALENDAR_TR_LOCALE}
        renderArrow={(direction) => (
          <MaterialIcons
            name={
              direction === "left"
                ? "keyboard-arrow-left"
                : "keyboard-arrow-right"
            }
            size={36}
            color="#be1870"
          />
        )}
      />
    </View>
  );
};

export default ReservationDateSelectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
