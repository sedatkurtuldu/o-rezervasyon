import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { EvilIcons } from '@expo/vector-icons';
import CounterActions from '../enums/CounterEnum';
import { useDispatch, useSelector } from 'react-redux';

const SearchScreenPeopleInnerItem = ({ leftUpperText, leftBottomText, isBorder }) => {
  const count = useSelector((state) => state.peopleCounter || initialState);
  const dispatch = useDispatch();

  const handleCounter = (action, category) => {
    switch (category) {
      case 'Yetişkinler':
        dispatch({
          type: 'peopleCounter/setCount',
          payload: {
            adultCount:
              count.adultCount + (action === CounterActions.PLUS ? 1 : -1),
            childCount: count.childCount,
            babyCount: count.babyCount,
          },
        });
        break;
      case 'Çocuklar':
        dispatch({
          type: 'peopleCounter/setCount',
          payload: {
            adultCount: count.adultCount,
            childCount:
              count.childCount + (action === CounterActions.PLUS ? 1 : -1),
            babyCount: count.babyCount,
          },
        });
        break;
      case 'Bebekler':
        dispatch({
          type: 'peopleCounter/setCount',
          payload: {
            adultCount: count.adultCount,
            childCount: count.childCount,
            babyCount:
              count.babyCount + (action === CounterActions.PLUS ? 1 : -1),
          },
        });
        break;
      default:
        return;
    }
  };

  const getCountByCategory = (category) => {
    switch (category) {
      case 'Yetişkinler':
        return count.adultCount;
      case 'Çocuklar':
        return count.childCount;
      case 'Bebekler':
        return count.babyCount;
      default:
        return 0;
    }
  };

  return (
    <View
      style={[styles.peopleContainer, { borderBottomWidth: isBorder ? 1 : 0 }]}
    >
      <View style={styles.peopleLeftTextContainer}>
        <Text style={{ fontSize: 18, fontWeight: '500' }}>{leftUpperText}</Text>
        <Text style={{ fontSize: 12, color: 'gray' }}>{leftBottomText}</Text>
      </View>
      <View style={styles.peopleRightContainer}>
        <TouchableOpacity
          onPress={() => handleCounter(CounterActions.MINUS, leftUpperText)}
        >
          <EvilIcons name="minus" size={36} color="black" />
        </TouchableOpacity>

        <Text style={{ fontSize: 20, fontWeight: '600' }}>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#EBEBEB',
    padding: 20,
  },
  peopleLeftTextContainer: {
    gap: 5,
  },
  peopleRightContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
