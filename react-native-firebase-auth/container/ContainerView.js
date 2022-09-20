import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const { width } = Dimensions.get("window");

const ContainerView = ({children}) => {
  return (
    <View style={styles.container}>
     {children}
    </View>
  )
}

export default ContainerView

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#E5E5E5",
        flex: 1,
        width,
        padding:5
    }
})