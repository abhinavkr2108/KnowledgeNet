import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import Colors from '../shared/Styles/Colors';

const Searchbar = () => {
  return (
    <View style={styles.container}>
      <Feather 
        name="search" 
        size={24} 
        color={Colors.grey}
        style={{marginRight: 8}}
      />
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor={Colors.grey}

      />
    </View>
  )
}

export default Searchbar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-start',
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: 12,
        padding: 10,
        elevation: 2,
    },
})