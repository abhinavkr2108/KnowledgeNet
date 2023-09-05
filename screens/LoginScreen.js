import { ActivityIndicator, Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebaseAuth } from '../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';
import Services from '../shared/Services';


const LoginScreen = ({navigation}) => {
    // Get the screen width and height
    const screenWidth = Dimensions.get("window").width;

    // State variables
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // User Data from AuthContext
    const {userData, setUserData} = useContext(AuthContext);


    // Import firebaseAuth from FirebaseConfig
    const auth = firebaseAuth;

    // Function to perform login authentication
    const handleLogin = async () => {
        setLoading(true);
        if(email===null || password===null){
            setError("Please fill all the fields");
            setLoading(false);
            return;
        }

        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            // alert('Login Success');
            
            const user = response.user;
            // console.log("Login Details in JSON: ");
            // console.log(user);
            setUserData(user);
            await Services.setUserAuth(user);
        }
        catch(err){
            console.log(err);
            setError(err.message);
            setLoading(false);
        }
        finally{
            setLoading(false);
            navigation.navigate('Home');
        }
    }

    // Show Alert dialog in case of error
    const showAlert = ({error}) => {
        Alert.alert(
          'Error',
          error,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
        );
      }

  return (
    
    <SafeAreaView>
        <ScrollView>
            {
                error? showAlert({error}) : null
            }
            <Image
                source={require('./../assets/login.jpg')}
                style={{ width: screenWidth, height: 250}}
            />
            <View style={styles.container}>
                <Text style={styles.welcomeText}>Login</Text>
                <Text style={styles.welcomeDesc}>Login into your Account to Start using our App</Text>

                <View style={{marginTop: 30}}>
                    <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onPressIn={()=>setError(null)}
                    />
                    <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onPressIn={()=>setError(null)}
                    />
                </View>
                {
                    loading? <ActivityIndicator size="large" color="#0000ff" /> : null
                }

                <View style={{marginTop: 30}}>
                    <TouchableOpacity 
                        style={styles.loginButton}
                        onPress={() => handleLogin()}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </ScrollView>
        
    </SafeAreaView>
  )
}

export default LoginScreen

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
    textInput:{
        marginHorizontal: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 12,
        shadowColor: "black",
        marginVertical: 10,
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