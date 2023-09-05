import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import Colors from '../shared/Styles/Colors';
import CourseContent from '../components/CourseContent';

const CourseDetailScreen = ({route}) => {
  const {item} = route.params;
  const param = useRoute().params;
  const navigation = useNavigation();

  // State variable to store couurses state obtained as parameter
  const [course, setCourse] = useState({});

  useEffect(()=>{
    console.log("DETAILS:")
    console.log(param.item);
    setCourse(param.item);
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
        <Text style={styles.appBarTitle}>{course.title}</Text>
        <Entypo 
          name="dots-three-vertical" 
          size={24} 
          color="black" 
        />
      </View>
      <View style={{margin: 15}}>
      <Image
          style={styles.courseImage}
          source={{uri: course.image}}
      /> 
       <Text style={styles.aboutCourse}>About Course</Text>
      <Text numberOfLines={5}>{course.description}</Text>

      <CourseContent course={course}/>
      
      </View>
    </SafeAreaView>
  )
}

export default CourseDetailScreen

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