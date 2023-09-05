import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const Slider = () => {
  // Get the screen width and height
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const [slider, setSlider] = useState([]);
    
    useEffect(() => {
      getSliderImages();
    },[])

    const getSliderImages = async () =>{
        try {
          const url = "http://192.168.1.7:1337/api/sliders?populate=*";
          //const headers = { Authorization: "Bearer ccfd00e2758872fca61652ef84bf1f940cba875d04449810eb2fc0b2f988b9533e16058ae4bad644bb643c17bfc2b31b0352496bd52d2abefc67fcf5d33883f01109af462a717dcfcb8cf07bfe25abea24b8c2fd9accc34464e160e77fea2d26d862deb6d31489228e4ca504e24f9d8ff65eb924bd73b7d7640602e59e77148b" }
          const sliderResponse = await fetch(url);
          const sliderData = (await sliderResponse.json()).data;
          // console.log("sliderData: ");
          // console.log(sliderData);
          setSlider(sliderData);

          const response = sliderData.map((item)=>({
            id: item.id,
            name: item.attributes.name,
            image: item.attributes.image.data.attributes.url,
          }))
          // console.log(response);
          setSlider(response);
        } catch (error) {
          console.log(error);
        } 
    }
    
  return (
    <View>
      <FlatList
        data={slider}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Image
              style={styles.sliderImage}
              source={{ uri: item.image }}
              key={item.id}
            />
          </View>
        )}
      />
    </View>
  )
}

export default Slider

const styles = StyleSheet.create({
  sliderImage:{
    width: Dimensions.get("window").width*0.9,
    marginTop: 18,
    marginEnd: 10,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius: 10,
  }
})