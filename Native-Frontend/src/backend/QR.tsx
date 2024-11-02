import React, { useEffect , useState} from "react";
import { View, Button, Alert, Platform, TouchableOpacity,Text, StyleSheet, Modal} from "react-native";
import * as FileSystem from '@dr.pogodin/react-native-fs';
import QRScreen from "../components/QRScreen";


const QR = () => {
    const [showQR, setShowQR] = useState(false);
    const [qrcodeLink, setqrcodeLink] = useState('');
    
    const createQR = async () => {
        console.log("started");
        const fileUri = FileSystem.DocumentDirectoryPath + '/' + "user.json";
        console.log("found file: " + fileUri);
        const jsonContent = await FileSystem.readFile(fileUri);
        console.log("read file: " + jsonContent);
        
        const json = JSON.parse(jsonContent);
        console.log(json.file.image_link);
        setqrcodeLink(json.file.image_link);
        displayQR();
        console.log("finsihed")
    }
    
    const displayQR = () => {
        setShowQR(!showQR);
        console.log(showQR);
    }
    
    return(
        <View>
            
            <TouchableOpacity onPress={() => createQR()} style={styles.showQR_btn} >
                <Text>Show QR Code</Text>
            </TouchableOpacity>
            
            <Modal 
                visible={showQR}
                animationType= "fade"
                transparent={true}
                presentationStyle="pageSheet"
            >
                <View style={
                        {
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0,0,0,0.5)'
                        }
                    }
                />
                <QRScreen link={qrcodeLink} />
                <TouchableOpacity style={styles.button} onPress={() => displayQR()}>
                    <Text>Back</Text>
                </TouchableOpacity>
            </Modal>
            
        </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    component: {
      marginTop: 20,
      padding: 20,
      backgroundColor: '#ddd',
      borderRadius: 8,
    },
    button: {
        backgroundColor: '#88b4fc',
        padding: 5,
        borderRadius: 10,
        alignItems: 'center',
        margin: 5,
        width: 100,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 70
    },
    showQR_btn: {
        backgroundColor: '#bde0fe',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
  });
  

export default QR;