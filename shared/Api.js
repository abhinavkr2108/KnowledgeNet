

// start making calls
const getSliderImages = async () => {
    await api.get('/sliders?populate=*');
}

const getVideoCourses = async () => {
  const url = "http://192.168.1.6:1337/api/videos?populate=*"
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export default {
    getSliderImages,
    getVideoCourses
} 