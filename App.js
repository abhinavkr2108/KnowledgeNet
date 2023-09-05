import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import { AuthContext } from './context/AuthContext';
import HomeScreen from './screens/HomeScreen';
import React,{ useEffect, useState } from 'react';
import Services from './shared/Services';
import { onAuthStateChanged } from 'firebase/auth';
import CourseDetailScreen from './screens/CourseDetailScreen';
import CourseChapter from './screens/CourseChapter';
import VideoCourseDetailScreen from './screens/VideoCourseDetailScreen';
import VideoCourseChapters from './screens/VideoCourseChapters';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userData, setUserData] = useState();
  console.log(userData);
  useEffect(() => {
    Services.getUserAuth().then((user) => {
      // console.log("user information:");
      // console.log(user);
      if (user) {
        setUserData(user);
      }
      else {
        setUserData(null);
      }
    })

  }, []);

  // console.log("User information from userData state:");
  // console.log(userData);

  return (
    <AuthContext.Provider value={{userData,setUserData}}>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{headerShown: false}}
          >
          {
            userData === null ?
            <>
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
            </>
            :<>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="VideoDetails" component={VideoCourseDetailScreen} />
              <Stack.Screen name="VideoChapter" component={VideoCourseChapters} />
              <Stack.Screen name="Details" component={CourseDetailScreen} />
              <Stack.Screen name="Chapter" component={CourseChapter}/>
            </>
          }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
