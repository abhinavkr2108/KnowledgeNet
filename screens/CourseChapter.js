import { Button, Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import Colors from '../shared/Styles/Colors';
import ProgressBar from '../components/ProgressBar';

const CourseChapter = () => {
  const navigation = useNavigation();
  const params = useRoute().params;

  const [chapter, setChapter] = useState([]);
  const [progress, setProgress] = useState(0);
  let chapterRef;

  useEffect(()=>{
    setProgress(0);
    setChapter(params.courseContent);
    console.log("DEBUGGING CONTENT: --->");
    console.log(params);
  },[])

  // useEffect(()=>{
  //   console.log('CHAPTERS LENGTH');
  //   console.log(chapter.length);
  // },[chapter])

  const onClickNext = (index) =>{

    try {
      setProgress((index+1)/((chapter.units.length)-1))
      chapterRef.scrollToIndex({animated: true, index:index+1})
    } catch (error) {
      console.log(error)
      navigation.goBack();
    }

  }
  return (
  <SafeAreaView>
    <ScrollView>
    <View style={styles.appBar}>
      <AntDesign 
          name="arrowleft" 
          size={30} 
          color="black"
          onPress={()=>navigation.goBack()}
      />
        <Text style={styles.appBarTitle}>{chapter.chapterTitle}</Text>
        <Entypo 
          name="dots-three-vertical" 
          size={24} 
          color="black" 
        />
    </View>
    <View style={{padding: 15}}>
      <ProgressBar progress={progress}/>

      <Text>{chapter.chapterId}</Text>

      
      <FlatList
        data={chapter.units}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        ref={(ref)=>{
            chapterRef = ref
        }}
        renderItem={({item,index})=>(
          <View>
            <View style={styles.chapterContent}>
              <Text style={styles.unitTitle}>{item.unitTitle}</Text>
              <Text>{item.unitExplaination}</Text>
            </View>
            <TouchableOpacity 
              style={styles.btnNext}
              onPress={()=>onClickNext(index)}
            >
              <Text style={styles.btnText}>Next</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>    
    </ScrollView>
  </SafeAreaView>
  )
}

export default CourseChapter

const styles = StyleSheet.create({
  appBar: {
    margin: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
  },
  appBarTitle:{
    fontSize: 18,
    fontWeight:"bold",
  },
  unitTitle:{
    fontSize: 16,
    fontWeight:"bold",
  },
  chapterContent:{
    width: Dimensions.get('screen').width*0.9,
    marginRight: 15,

  },
  btnNext:{
    backgroundColor: Colors.primary,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
  },
  btnText:{
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color:"white",
  },

})