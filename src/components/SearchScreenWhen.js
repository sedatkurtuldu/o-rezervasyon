import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  Dimensions,
  BackHandler,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Calendar from "react-native-calendar-range-picker";
import moment from "moment";
import CALENDAR_TR_LOCALE from "../locales/CALENDAR_TR_LOCALE";

const height = Dimensions.get("window").height;

const SearchScreenWhen = () => {
  const isCardExpanded = useSharedValue(false);

  const [range, setRange] = useState({});

  useEffect(() => {
    const handleBackPress = () => {
      if (isCardExpanded.value) {
        isCardExpanded.value = false;
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => backHandler.remove();
  }, [isCardExpanded]);

  const handleCardPress = () => {
    isCardExpanded.value = !isCardExpanded.value;
  };

  const cardContainerStyle = useAnimatedStyle(() => {
    return {
      height: withSpring(isCardExpanded.value ? height - 155 : 50, {
        damping: 17,
        stiffness: 100,
        overshootClamping: false,
        restDisplacementThreshold: 0.1,
        restSpeedThreshold: 0.1,
      }),
      width: withSpring(isCardExpanded.value ? "108%" : "100%", {
        damping: 17,
        stiffness: 100,
        overshootClamping: false,
        restDisplacementThreshold: 0.1,
        restSpeedThreshold: 0.1,
      }),
      alignItems: isCardExpanded.value ? "flex-start" : "center",
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
      display: isCardExpanded.value ? "flex" : "none",
      marginTop: isCardExpanded.value ? 16 : 0,
    };
  });

  const placeContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isCardExpanded.value ? 0 : 1, {
        duration: 200,
        easing: Easing.ease,
      }),
      display: isCardExpanded.value ? "none" : "flex",
    };
  });

  return (
    <Pressable style={styles.container} onPress={handleCardPress}>
      <Animated.View style={[styles.cardContainer, cardContainerStyle]}>
        <Animated.View style={styles.iconContainer}>
          <Animated.View style={[styles.placeContainer, placeContainerStyle]}>
            <Text style={styles.placeText}>Tarih</Text>
            {range.startDate && range.endDate ? (
              <Text style={styles.placeText}>
                {range.startDate} - {range.endDate}
              </Text>
            ) : (
              <Text style={styles.placeText}>Tarih Seçin</Text>
            )}
          </Animated.View>
          <Animated.View
            style={[styles.cardTextContainer, cardTextContainerStyle]}
          >
            <Animated.View>
              <Calendar
                locale={CALENDAR_TR_LOCALE}
                disabledBeforeToday
                pastYearRange={0}
                initialNumToRender={0}
                onChange={({ startDate, endDate }) => {
                  setRange({
                    startDate: moment(startDate).format("DD/MM/YYYY"),
                    endDate: moment(endDate).format("DD/MM/YYYY"),
                  });
                  if (startDate && endDate) {
                    setTimeout(() => {
                      isCardExpanded.value = false;
                    }, 300);
                  }
                }}
              />
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export default SearchScreenWhen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
  },
  cardContainer: {
    borderRadius: 20,
    backgroundColor: "white",
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 6,
  },
  iconContainer: {
    flexDirection: "row",
  },
  cardTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  placeContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  placeText: {
    fontSize: 16,
    fontWeight: "500",
  },
  calendarContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
});
