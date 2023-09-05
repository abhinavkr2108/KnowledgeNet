import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const Courses = ({level}) => {

    // Navigation Variable to navigate to course details screen
    const navigation = useNavigation();
    
    // State variable for storing the courses
    const [courses, setCourses] = useState([]);
    const [content, setContent] = useState([]);
    const [combine, setCombine] = useState([]);

    // UseEffect block to call getCourses function
    useEffect(()=>{
        // getCourses();
        getCoursesFunction();
    },[])

    // Function to get the videos
    const getCourses = async () => {
        const response = await fetch("http://192.168.1.2:1337/api/courses?filters[level][$eq]="+level+"&populate=image,content.courseContent");
        const data = await response.json();
          
        // Mapping data from video json response
        const coursesContentResponse = data.data.flatMap((course) => {
           return course.attributes.content.flatMap((contentItem) => {
              return contentItem.courseContent.map((courseContentItem) => {
                console.log("UNIT TITLE AND EXPLAINATION")
                console.log(courseContentItem.title);
                console.log(courseContentItem.explaination);
                console.log("OLDER ABOVE DATA")
                console.log(course.attributes.title)
                return {
                    unitTitle: courseContentItem.title,
                    explaination: courseContentItem.explaination,
                    id: course.id,
                    title: course.attributes.title,
                    image: course.attributes.image.data[0].attributes.url,
                    description:course.attributes.description,
                    content: course.attributes.content,
                };
              });
            });
          });
     
        setCourses(coursesContentResponse);
        console.log("TEST RESPONSE:")
        console.log(coursesContentResponse.unitTitle)
    }

    const getCoursesFunction = async() => {
        const response = await fetch("http://192.168.1.7:1337/api/courses?filters[level][$eq]="+level+"&populate=image,content.courseContent");
        const data = await response.json();
        // Mapping data from video json response
        const coursesContentResponse = data.data.map((course) => {
            return {
                id: course.id,
                title: course.attributes.title,
                image: course.attributes.image.data[0].attributes.url,
                description:course.attributes.description,
                content: course.attributes.content.map((contentItem) => {
                    console.log("DEBUGGING CHAPTER ID: ");
                    console.log(contentItem.id);
                    return {
                    chapterTitle: contentItem.chapterTitle,
                    chapterId: contentItem.id,
                    units: contentItem.courseContent.map((chapterUnits)=>{
                        // console.log("DEBUG CHAPTER UNITS");
                        // console.log(chapterUnits.title);
                        // console.log(chapterUnits.explaination)
                        return{
                            unitTitle: chapterUnits.title,
                            unitExplaination: chapterUnits.explaination,
                        }
                        
                    })
                    };
                }),
                
            };
        });
        setCourses(coursesContentResponse)
    }

  
      

    
  return (
    <View style={{marginVertical: 18}}>
      <Text style={styles.courseHeading}>{level} Courses</Text>
      <FlatList
        data={courses}
        keyExtractor={(item) => (item ? item.id.toString() : Math.random().toString())}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
            <TouchableOpacity 
                style={styles.courseItem}
                onPress={() => navigation.navigate("Details", {item: item})}
            >
                <Image source={{uri: item.image}} style={styles.courseImage} />
                <Text style={styles.courseTitle}>{item.title}</Text>
                <Text style={styles.courseLessons}>{item.content?.length} Lessons</Text>
            </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default Courses

const styles = StyleSheet.create({
    courseHeading: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    courseItem: {
        marginRight: 10,
        marginVertical: 10,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 2.5,
        shadowColor: "black",
    },
    courseImage: {
        width: Dimensions.get("window").width*0.57,
        height: Dimensions.get("window").width*0.4,
        resizeMode: 'stretch',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    courseTitle: {
        fontWeight: 'bold',
        margin: 8,
    },
    courseLessons: {
        marginLeft: 8,
        marginBottom: 8,
        color: "grey",
        fontWeight: 'bold',
    },
})