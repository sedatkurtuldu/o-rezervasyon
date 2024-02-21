import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Line = () => {
  return (
    <View style={styles.line}></View>
  )
}

export default Line

const styles = StyleSheet.create({
    line: {
        height: 8,
        backgroundColor: '#EBEBEB',
        marginVertical: 18
    }
})