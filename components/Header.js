import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../shared/Styles/Colors';
import Searchbar from './Searchbar';

const Header = () => {
    const {userData, setUserData} = useContext(AuthContext);
  return (
    <View style={styles.header}>
        <View>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.headerText}>{userData?.displayName}</Text>
        </View>
        <MaterialIcons name="account-box" size={30} color={Colors.primary} />        
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        margin: 18,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },
    welcomeText:{
        fontSize: 15,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})