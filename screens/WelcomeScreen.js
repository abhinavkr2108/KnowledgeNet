import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const WelcomeScreen = ({navigation}) => {
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;
  return (
    <SafeAreaView>
        <Image
            source={require('./../assets/welcome.png')}
            style={{ width: screenWidth}}
        />
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to Knowledge Net</Text>
            <Text style={styles.welcomeDesc}>Unlock your coding potential with our interactive and 
            comprehensive Coding Course App. Master in-demand programming languages and connect
            with a thriving community of learners</Text>
        
            <View style={{marginTop: 30}}>
                <TouchableOpacity 
                    style={styles.loginButton}
                    onPress={()=>{navigation.navigate('Login')}}
                >
                    <Text style={styles.buttonText}>Login Into Existing Account</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{...styles.loginButton, backgroundColor:"grey"}}
                    onPress={()=>{navigation.navigate('Signup')}}
                >
                    <Text style={styles.buttonText}>Signup for New Account</Text>
                </TouchableOpacity>
            </View>
        
        </View>
        
    </SafeAreaView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        marginTop: -15,
        backgroundColor: "#eff2ef",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    welcomeText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    welcomeDesc: {
        fontSize: 15,
        textAlign: 'center',
        color: "grey",
        fontWeight: 'bold',
        paddingTop: 15,
        marginHorizontal: 10,
    },
    loginButton:{
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 20,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: "white",
        fontWeight: 'bold',
    },
})