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
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        })
        
        if (!result.canceled){
            console.log(result.assets[0]);
            setfile(result.assets[0]);
        }
        
        await HandleUpload();
    };
    
    const HandleUpload = async () => {
        // Backend.upload_img(_result);
        alert("uploading image");
        if (!file) {
            Alert.alert('Please select an image first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', {
            uri: file.uri,
            base64: file.base64,
            type: file.type || 'image/jpeg', // Use a fallback type
        });
        
        try {
            const response = await fetch('http://127.0.0.1:5000/KhaledDev/upload_img', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const data = await response.json();
            Alert.alert('Response', data.message);
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