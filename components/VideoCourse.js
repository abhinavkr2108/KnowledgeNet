import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const VideoCourse = () => {
    // State variable for storing the videos
    const [videos, setVideos] = useState([]);

    const navigation = useNavigation();

    // UseEffect Block to call getVideos function
    React.useEffect(() => {
        getVideos();
    }, []);

    // Function to get the videos
    const getVideos = async () => {
        try {
            // Code to fetch videos from the videos API
            const url = "http://192.168.1.7:1337/api/videocourses?populate=*"
            //const headers = { Authorization: "Bearer ccfd00e2758872fca61652ef84bf1f940cba875d04449810eb2fc0b2f988b9533e16058ae4bad644bb643c17bfc2b31b0352496bd52d2abefc67fcf5d33883f01109af462a717dcfcb8cf07bfe25abea24b8c2fd9accc34464e160e77fea2d26d862deb6d31489228e4ca504e24f9d8ff65eb924bd73b7d7640602e59e77148b" }
            const response = await fetch(url);
            const videoData = await response.json();
            // console.log("Video Courses:")
            // console.log(videoData.data);
            
            // Mapping data from video json response
            const videoResponse = videoData.data.map((video)=>({
                id: video.id,
                title: video.attributes.title,
                description: video.attributes.description,
                image: video.attributes.courseImage.data[0].attributes.url,
                courseContent: video.attributes.courseContent.map((content)=>({
                    videoUrl: content.videoUrl.toString(),
                    chapterTitle: content.title,
                    chapterDesc: content.description,
                }))
                    
              
            }))

            // Setting the videoResponse to videos state variable
            setVideos(videoResponse);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <View style={{marginTop: 18,}}>
      <Text style={styles.heading}>Video Courses</Text>
      <FlatList
        data={videos}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
            <TouchableOpacity
                style={styles.container}
                onPress={()=>navigation.navigate("VideoDetails",{videoItem: item})}
            >
                <Image
                    style={styles.videoImage}
                    source={{uri: item.image}}
                />
            </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default VideoCourse

const styles = StyleSheet.create({
    heading:{
        fontSize: 18,
        fontWeight: 'bold',
    },
    videoImage:{
        width: Dimensions.get("window").width*0.7,
        marginTop: 18,
        marginEnd: 10,
        height: 150,
        resizeMode: 'contain',
        alignSelf: 'center',
        borderRadius: 10,
    }
})