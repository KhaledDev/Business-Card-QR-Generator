import React, { PropsWithChildren, useEffect , useState} from "react";
import { View, Button, Alert, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity} from "react-native";
import {
    QrCodeSvg,
    plainRenderer,
} from 'react-native-qr-svg';

const QRScreen = (props : any) => {
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <View style={styles.Modal_Dark}></View>
            </SafeAreaView>

            <Text style={styles.text}>Scan the QR code to send the Business Card</Text>
            <SafeAreaView style={styles.QR}>
                <QrCodeSvg value={props.link} frameSize={170}/>
            </SafeAreaView>
            { /*
            <TouchableOpacity style={styles.button} onPress={props.navigation}>
                <Text>Back</Text>
            </TouchableOpacity>
            */}
        </View>
    );
    
    
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#d4e4ff',
        alignItems: 'center',
        borderRadius: 10,
        width: 375,
        height: 300,
        position: 'absolute',
        bottom: 50,
        right: 10,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        padding: 10
    },
    QR: {
        borderColor: 'black',
    },
    button: {
        backgroundColor: '#88b4fc',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        margin: 10
    },
    Modal_Dark: {
        backgroundColor: 'black',
        flex: 1,
        opacity: 0.5,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1
    }
});

export default QRScreen;