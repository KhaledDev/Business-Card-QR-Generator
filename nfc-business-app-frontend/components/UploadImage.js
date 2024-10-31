import React, {useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as Backend from './Backend';



const UploadImage = () => {
    
    const [file,setfile] = useState();
    
    const handleImagePick = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access camera roll is required!');
            return;
        }
        
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        })
        
        if (!result.canceled){
            //console.log(result.assets[0]);
            setfile(result.assets[0]);
            await HandleUpload();
        }
    };
    
    const HandleUpload = async () => {
        // Backend.upload_img(_result);
        if (!file) {
            Alert.alert('Please select an image first!');
            return;
        }
        const base64Image = file.base64;
        try {
            const response = await fetch('https://b4ca-83-110-122-120.ngrok-free.app/KhaledDev/upload_img', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: base64Image
                }),
            })
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData);
                alert(responseData);
            })
        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Upload failed');
        }
    }
    
    return(
        <View>
            <TouchableOpacity style={styles.import_btn} onPress={handleImagePick}>
                <Text>Import card</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    import_btn: {
        backgroundColor: '#bde0fe',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 0,
    }

})

export default UploadImage