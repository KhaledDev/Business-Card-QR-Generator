import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity,Image, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}t>Scan your NFC card</Text>
      <StatusBar style="auto"/>
      
      <Image styles={styles.image} source={require('./assets/contactless.png')} />
      
      <TouchableOpacity style={styles.import_btn}>
        <Text>Import card</Text>
      </TouchableOpacity>
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
  image: {
    width: 25,
    height: 25,
    resizeMode: "stretch",
  },
  import_btn: {
    backgroundColor: '#bde0fe',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 50,
  }
});
