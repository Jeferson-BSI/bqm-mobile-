import React, {useEffect, useState} from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import {WebView} from 'react-native-webview';


export default function PDFExample({route}){
    const {token, qids, nome} = route.params
    console.log(token, qids, nome);

    return(
        <WebView source={{uri: `https://jeferson-bsi.github.io/create_PDF.oi/?qids=${qids}&token=${token}&nome=${nome}`}}/>
    );
}