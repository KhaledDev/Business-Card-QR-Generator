import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity,Image, View, SafeAreaView } from 'react-native';
import UploadImage from './components/UploadImage';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto"/>
      <Text style={styles.text}t>Scan your NFC card</Text>
      
      <SafeAreaView style={styles.safeareacontainer}>
          <Image style={styles.NFCimage} source={require('./assets/contactless.png')} />
      </SafeAreaView>
      
      <UploadImage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
    alignItems: 'center',
  },
  text:{
    fontSize: 25,
    fontWeight: 'bold',
  },
  safeareacontainer: {
    flex: 0,
    width: 100,
    height: 100,
  },
  NFCimage: {
    flex: 1,
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  
});
