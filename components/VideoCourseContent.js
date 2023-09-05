import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../shared/Styles/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';

const VideoCourseContent = ({params}) => {
    const navigation = useNavigation();

    useEffect(()=>{
        console.log("VIDEO COURSE CONTENT");
        console.log(params);
    },[])
  return (
    <View style={{marginTop:15}}>
      <Text style={{fontWeight:"bold", fontSize: 17}}>Course Content</Text>
      
      <FlatList
        data={params.courseContent}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item,index}) =>(
          <TouchableOpacity 
            style={styles.renderItem}
            onPress={()=>navigation.navigate("VideoChapter",{videoCourseContent:item})}
          >
            <Text style={styles.indexNum}>{index+1}</Text>
            <Text style={{fontWeight:"bold", fontSize: 15}}>{item.chapterTitle}</Text>
            <View style={styles.playIcon}>
              <Ionicons name="play-circle-sharp" size={24} color={Colors.primary} />
            </View>

          </TouchableOpacity>
        )}
      />
      </View>
  )
}

export default VideoCourseContent

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