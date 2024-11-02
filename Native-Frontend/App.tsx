/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import UploadImage from './src/components/UploadImage';
import NFC from './src/backend/NFC';
import QR from './src/backend/QR';

function App(): React.JSX.Element {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Business Card QR generator</Text>
      
      <SafeAreaView style={styles.safeareacontainer}>
          <Image style={styles.NFCimage} source={require('./assets/contactless.png')} />
      </SafeAreaView>
      
      <UploadImage />
      {/*<NFC />*/}
      <QR />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
    alignItems: 'center',
  },
  text : {
    fontSize: 25,
    fontWeight: 'bold',
  },
  safeareacontainer : {
    flex: 0,
    width: 100,
    height: 100,
  },
  NFCimage : {
    flex: 1,
    width: 100,
    height: 100,
    resizeMode: "contain",
    
  },
});

export default App;
