import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect, useCallback } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import YoutubePlayer from "react-native-youtube-iframe";
import Colors from '../shared/Styles/Colors';

const VideoCourseChapters = ({navigation}) => {

    const [playing, setPlaying] = useState(false);
    const [video, setVideo] = useState({});

    const params = useRoute().params;
    useEffect(()=>{
        setVideo(params.videoCourseContent);
    },[])

    const onStateChange = useCallback((state) => {
      if (state === "ended") {
        setPlaying(false);
        Alert.alert("video has finished playing!");
      }
    }, []);
  
    const togglePlaying = useCallback(() => {
      setPlaying((prev) => !prev);
    }, []);
  return (
    <SafeAreaView>

         <View style={styles.topBar}>
            <AntDesign 
                name="arrowleft" 
                size={28} 
                color="white"
                onPress={()=>navigation.goBack()}
            />
            <Text style={styles.chapterTitle}>{video.chapterTitle}</Text>
        </View>

        <View style={{margin: 15}}>
            <YoutubePlayer
                height={300}
                play={playing}
                videoId={video.videoUrl}
                onChangeState={onStateChange}
            />
            <Text style={styles.chapterDesc}>Description</Text>
            <Text>{video.chapterDesc}</Text>
        </View>
    </SafeAreaView>
  )
}

export default VideoCourseChapters

const styles = StyleSheet.create({
    topBar:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.primary,
        padding: 10,
        elevation:4,
        shadowColor:"grey",
    },
    chapterTitle:{
        paddingLeft:15,
        fontSize:16,
        fontWeight:"bold",
        color:"white"
    },
    chapterDesc:{
        fontSize: 16,
        fontWeight: "bold",
    },
})