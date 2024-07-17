import {AsyncStorage} from 'async-storage'

const storeUserEmail = async email => {
    try{
        await AsyncStorage.setItem('email', JSON.stringify(email))
        console.log("email stored for remember me")
    } catch(error) {
        console.error("Error when storing email in remember me", error)
    }
}

const getUserEmail = async () => {
    try{
        const emailValue = JSON.parse(await AsyncStorage.getItem('email'));
        console.log('getting email for the remember me', emailValue);
        return emailValue !== null ? {emailValue} : {emailValue: ''};
    }catch(error){
        console.error('Error getting stored email fo rmemerme:', error);
        return null;
    }
}