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
        })
        
        if (!result.canceled){
            console.log(result.assets[0]);
            setfile(result.assets[0]);
        }
        
        await HandleUpload(result.assets[0]);
    };
    
    const HandleUpload = async (_result) => {
        Backend.upload_img(_result);
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