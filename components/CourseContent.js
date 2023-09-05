import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../shared/Styles/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';

const CourseContent = ({course}) => {
  const navigation = useNavigation();
  const params = useRoute().params;

  const handleChaptersClick = ()=>{
      navigation.navigate("Chapter",)
  }
  useEffect(()=>{
    console.log("Course Content Data: ");
    // console.log(course.content);
    console.log(params.item)
  },[])
  return (
    <View style={{marginTop:15}}>
      <Text style={{fontWeight:"bold", fontSize: 17}}>Course Content</Text>
      
      <FlatList
        data={course.content}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item,index}) =>(
          <TouchableOpacity 
          style={styles.renderItem}
          onPress={()=>navigation.navigate("Chapter",{courseContent:item})}>
            <Text style={styles.indexNum}>{index+1}</Text>
            <Text style={{fontWeight:"bold", fontSize: 15}}>{item.chapterTitle}</Text>
            <View style={styles.playIcon}>
              <Ionicons name="play-circle-sharp" size={24} color={Colors.primary} />
            </View>

          </TouchableOpacity>
        )}
      />

      {/* <FlatList
        data={[course]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item,index}) =>(
          <TouchableOpacity 
            onPress={()=>navigation.navigate("Chapter",{courseContent:item})}
          >
            {item.content.map((chap, chapIndex) => (
              <View style={styles.renderItem}>
                <Text style={styles.indexNum}>{chapIndex+1}</Text>
                <Text style={styles.chapterTitle}>{chap.chapterTitle}</Text>
              </View>
      ))}
          </TouchableOpacity>
        )}
      /> */}
      
    </View>
  )
}

export default CourseContent

const styles = StyleSheet.create({
  renderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:"white",
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
    position: 'relative',
  },
  indexNum: {
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.grey,
    marginRight: 20,
  },
  chapterTitle:{
    fontWeight:"bold",
  },
  playIcon:{
    position: 'absolute',
    right: 10,
  }

})