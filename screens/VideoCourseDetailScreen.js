import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import Colors from '../shared/Styles/Colors';
import VideoCourseContent from '../components/VideoCourseContent';

const VideoCourseDetailScreen = ({navigation}) => {

    const params = useRoute().params.videoItem
    useEffect(()=>{
        console.log('VIDEO COURSES CONTENT')
        console.log(params)
    },[])
  return (
    <SafeAreaView>
      <View style={styles.appBar}>
        <AntDesign 
          name="arrowleft" 
          size={30} 
          color="black"
          onPress={()=>navigation.goBack()}
        />
        <Text style={styles.appBarTitle}>{params.title}</Text>
        <Entypo 
          name="dots-three-vertical" 
          size={24} 
          color="black" 
        />
      </View>
      <View style={{margin:15}}>
        <Image
          style={styles.courseImage}
          source={{uri: params.image}}
        /> 
        <Text style={styles.aboutCourse}>About Course</Text>
        <Text numberOfLines={5}>{params.description}</Text>
        
        <VideoCourseContent params={params}/>
      </View>

    </SafeAreaView>
    
  )
}

export default VideoCourseDetailScreen

const styles = StyleSheet.create({
  appBar: {
    margin: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
  },
  appBarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  courseImage: {
    width: Dimensions.get("window").width*0.93,
    height: Dimensions.get("window").height*0.25,
    resizeMode:'stretch',
    borderRadius: 10,
  },
  aboutCourse: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
  },
})