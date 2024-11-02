import React, { useEffect } from "react";
import { View, Button, Alert, Platform } from "react-native";
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';
import * as FileSystem from '@dr.pogodin/react-native-fs';

const NFC = () => {
    useEffect(() => {
        NfcManager.start();
        return () => {
            NfcManager.close();
        };
    }, []);

    const writeToNFC = async () => {
        console.log("started");

        // Check if NFC is supported and enabled
        const isSupported = await NfcManager.isSupported();
        const isEnabled = await NfcManager.isEnabled();

        if (!isSupported) {
            Alert.alert("NFC Not Supported", "This device does not support NFC.");
            return;
        }

        if (!isEnabled) {
            Alert.alert("NFC Not Enabled", "Please enable NFC in settings.");
            return;
        }

        try {
            console.log("requesting technology");
            await NfcManager.requestTechnology(NfcTech.Ndef,{
                alertMessage: "Ready to write some NDEF",
            });
            console.log("technology requested");

            const fileUri = `${FileSystem.DocumentDirectoryPath}/user.json`;
            const fileExists = await FileSystem.exists(fileUri);

            if (!fileExists) {
                console.log("File does not exist:", fileUri);
                return;
            }

            const jsonContent = await FileSystem.readFile(fileUri);
            if (!jsonContent) {
                console.log("File is empty or could not be read.");
                return;
            }

            console.log("File content:", jsonContent);
            const data = JSON.parse(jsonContent);
            console.log("Parsed JSON data:", data);

            const bytes = Ndef.encodeMessage([
                Ndef.textRecord('Check out my business card!'),
                Ndef.textRecord(JSON.stringify(data))
            ]);

            if (bytes) {
                await NfcManager.ndefHandler.writeNdefMessage(bytes);
                console.log('Wrote to NFC tag!');
            }
        } catch (ex) {
            console.log("Error:", ex);
        } finally {
            NfcManager.cancelTechnologyRequest();
            console.log("finished");
        }
    };

    return (
        <View>
            <Button title="Send Business Card" onPress={writeToNFC} />
        </View>
    );
};

export default NFC;
