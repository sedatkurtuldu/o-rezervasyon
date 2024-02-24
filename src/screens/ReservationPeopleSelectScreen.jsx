import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchScreenPeopleInnerItem from '../components/SearchScreenPeopleInnerItem'

const ReservationPeopleSelectScreen = () => {
  return (
    <View style={styles.container}>
      <SearchScreenPeopleInnerItem
        leftUpperText={"Yetişkinler"}
        leftBottomText={"13 yaş ve üstü"}
        isBorder={true}
        isSearchScreen={false}
      />
      <SearchScreenPeopleInnerItem
        leftUpperText={"Çocuklar"}
        leftBottomText={"3-12 yaş"}
        isBorder={true}
        isSearchScreen={false}
      />
      <SearchScreenPeopleInnerItem
        leftUpperText={"Bebekler"}
        leftBottomText={"3 yaş altı"}
        isBorder={false}
        isSearchScreen={false}
      />
    </View>
  )
}

export default ReservationPeopleSelectScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
})