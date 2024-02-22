import React, { useEffect, useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  Dimensions,
  BackHandler,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import moment from 'moment';
import CALENDAR_TR_LOCALE from '../locales/CALENDAR_TR_LOCALE';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setCalendarDateRange } from '../slices/calendarDateRangeSlice';

const height = Dimensions.get('window').height;

LocaleConfig.locales['tr'] = CALENDAR_TR_LOCALE;

LocaleConfig.defaultLocale = 'tr';

const SearchScreenWhen = () => {
  const isCardExpanded = useSharedValue(false);

  //TO-DO : RE-RENDER PROBLEMİ VAR 4 KERE GETİRİYOR STATE'İ ONUN ÇÖZÜLMESİ GEREK!!!
  const calendarDateRange = useSelector((state) => state.calendarDateRange);
  const dispatch = useDispatch();

  useEffect(() => {
    if (calendarDateRange.startDate && calendarDateRange.endDate) {
      const timeout = setTimeout(() => {
        isCardExpanded.value = false;
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [calendarDateRange, isCardExpanded]);

  useEffect(() => {
    const handleBackPress = () => {
      if (isCardExpanded.value) {
        isCardExpanded.value = false;
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    return () => backHandler.remove();
  }, [isCardExpanded]);

  const handleCardPress = () => {
    isCardExpanded.value = !isCardExpanded.value;
  };

  const handleDayPress = (day) => {
    if (!calendarDateRange.startDate || calendarDateRange.endDate) {
      dispatch(
        setCalendarDateRange({ startDate: day.dateString, endDate: '' })
      );
    } else {
      if (moment(day.dateString).isBefore(calendarDateRange.startDate)) {
        dispatch(
          setCalendarDateRange({ startDate: day.dateString, endDate: '' })
        );
      } else {
        dispatch(
          setCalendarDateRange({
            ...calendarDateRange,
            endDate: day.dateString,
          })
        );
      }
    }
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
      width: withSpring(isCardExpanded.value ? '108%' : '100%', {
        damping: 17,
        stiffness: 100,
        overshootClamping: false,
        restDisplacementThreshold: 0.1,
        restSpeedThreshold: 0.1,
      }),
      alignItems: isCardExpanded.value ? 'flex-start' : 'center',
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
      marginTop: isCardExpanded.value ? 16 : 0,
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

  const memoizedCalendar = useMemo(() => {
    const markedDates = {};

    if (calendarDateRange.startDate && calendarDateRange.endDate) {
      let currentDate = moment(calendarDateRange.startDate);
      while (currentDate.isSameOrBefore(calendarDateRange.endDate)) {
        const formattedDate = currentDate.format('YYYY-MM-DD');
        markedDates[formattedDate] = { textColor: 'white', color: '#f871b8' };
        currentDate.add(1, 'days');
      }
    }

    if (calendarDateRange.startDate) {
      markedDates[moment(calendarDateRange.startDate).format('YYYY-MM-DD')] = {
        startingDay: true,
        textColor: 'white',
        color: '#e81f89',
      };
    }
    if (calendarDateRange.endDate) {
      markedDates[moment(calendarDateRange.endDate).format('YYYY-MM-DD')] = {
        endingDay: true,
        textColor: 'white',
        color: '#e81f89',
      };
    }

    return (
      <Calendar
        markingType={'period'}
        minDate={moment().format('YYYY-MM-DD')}
        current={moment().format('YYYY-MM-DD')}
        enableSwipeMonths
        firstDay={1}
        markedDates={markedDates}
        onDayPress={handleDayPress}
        locale={CALENDAR_TR_LOCALE}
        renderArrow={(direction) => (
          <MaterialIcons
            name={
              direction === 'left'
                ? 'keyboard-arrow-left'
                : 'keyboard-arrow-right'
            }
            size={36}
            color="#be1870"
          />
        )}
      />
    );
  }, [calendarDateRange]);

  return (
    <Pressable style={styles.container} onPress={handleCardPress}>
      <Animated.View style={[styles.cardContainer, cardContainerStyle]}>
        <Animated.View style={styles.iconContainer}>
          <Animated.View style={[styles.placeContainer, placeContainerStyle]}>
            <Text style={styles.placeText}>Tarih</Text>
            {calendarDateRange.startDate && calendarDateRange.endDate ? (
              <Text style={styles.placeText}>
                {moment(calendarDateRange.startDate).format('DD/MM/YYYY')} -{' '}
                {moment(calendarDateRange.endDate).format('DD/MM/YYYY')}
              </Text>
            ) : (
              <Text style={[styles.placeText, { color: 'gray', fontSize: 14 }]}>
                Tarih Seçin
              </Text>
            )}
          </Animated.View>
          <Animated.View
            style={[styles.cardTextContainer, cardTextContainerStyle]}
          >
            <Animated.View>
              <Text style={styles.whenText}>Ne zaman ?</Text>
              {memoizedCalendar}
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
  cardTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  placeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  placeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  calendarContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  whenText: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 16,
  },
});
