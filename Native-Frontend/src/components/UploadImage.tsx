import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from "react-native";
import { Asset, launchImageLibrary, ImagePickerResponse } from "react-native-image-picker";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import * as FileSystem from '@dr.pogodin/react-native-fs';
import NFC from "../backend/NFC";
// import * as FileSystem from 'expo-file-system';
// import * as Backend from './Backend';

const UploadImage = () => {
    const [file, setFile] = useState<Asset | null>(null);
    
    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            const result = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
            if (result !== RESULTS.GRANTED) {
                Alert.alert("Permission required", "Please enable storage permissions in settings.");
                return false;
            }
        }
        return true;
    };
    
    // Image picker function
    const handleImagePick = async () => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) return
        
        const result: ImagePickerResponse = await launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true,
            maxHeight: 1050,
            maxWidth: 600,
        });

        // Check if the user canceled the picker or an error occurred
        if (result.didCancel) {
            Alert.alert('Image selection was canceled.');
        } else if (result.errorCode) {
            Alert.alert('An error occurred:', result.errorMessage || 'Unknown error');
        } else if (result.assets && result.assets.length > 0) {
            const selectedAsset = result.assets[0];
            setFile(selectedAsset);
            await handleUpload(selectedAsset);
        }
    };

    // Handle file upload function
    const handleUpload = async (imageAsset: Asset) => {
        if (!imageAsset.base64) {
            Alert.alert('Selected image does not contain base64 data.');
            return;
        }

        try {
            const response = await fetch('https://8be1-83-110-122-120.ngrok-free.app/KhaledDev/upload_img', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: imageAsset.base64,
                }),
            });

            const responseData = await response.json();
            console.log(responseData);

            // After successful upload, save the response data to a JSON file
            await saveFile(responseData);
        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Upload failed');
        }
    };

    // Save the uploaded image data to a file
    const saveFile = async (responseData: any) => {
        const filename = responseData['file']['Name'].replace('.png', '.json');
        const fileUri = FileSystem.DocumentDirectoryPath + '/' + "user.json";
        
        FileSystem.writeFile(fileUri, JSON.stringify(responseData),'utf8')
        .then((success) => {
            console.log('File Written' + "at " + fileUri);
        })
        .catch((err) =>{
            console.log(err.message);
        });
        
        /*
        try {
            await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(responseData));
            console.log('File saved successfully at:', fileUri);
            // Optionally, trigger the NFC write operation here
            // const nfcManager = WriteToNFC();
            // nfcManager.writeToNFC();
        } catch (error) {
            console.error('Error saving file:', error);
            Alert.alert('Error saving file');
        }
        */
    };

    return (
        <View>
            <TouchableOpacity style={styles.import_btn} onPress={handleImagePick}>
                <Text>Import Card</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    import_btn: {
        backgroundColor: '#bde0fe',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 0,
    },
});

export default UploadImage;
