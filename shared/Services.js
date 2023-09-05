import AsyncStorage from "@react-native-async-storage/async-storage"

// Storing user information in async storage
const setUserAuth = async(userValue)=>{
    await AsyncStorage.setItem('userData', JSON.stringify(userValue));
}

// Accessing user information from async storage
const getUserAuth = async()=>{
    const value = await AsyncStorage.getItem('userData');
    return JSON.parse(value);
}

// Clear user information from async storage
const logout = () =>{
    AsyncStorage.clear();
}

// Exporting the above functions
export default {
    setUserAuth,
    getUserAuth,
    logout,
}