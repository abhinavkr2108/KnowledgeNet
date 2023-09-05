import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Services from '../shared/Services';
import { firebaseAuth } from '../FirebaseConfig';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import Searchbar from '../components/Searchbar';
import Slider from '../components/Slider';
import VideoCourse from '../components/VideoCourse';
import Courses from '../components/Courses';



const HomeScreen = () => {
  const {userData, setUserData} = useContext(AuthContext);

  const logout = () =>{
    firebaseAuth.signOut();
    Services.logout();
    setUserData(null);
  }

  return (
    <SafeAreaView style={{margin: 20}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Header/>
        <Searchbar/>
        <Slider/>
        <VideoCourse/>
        <Courses level={'Basic'}/>
        <Courses level={'Intermediate'}/>
        <Courses level={'Advanced'}/>
      </ScrollView>
      {/* <Button title='Logout' onPress={()=>logout()}></Button> */}
      
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})