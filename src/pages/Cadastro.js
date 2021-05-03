import React from 'react';
import {WebView} from 'react-native-webview';
import Nav from '../components/Nav';


export default function PDFExample({route}){
    // const {token, qids, nome, id} = route.params
    // console.log(token, qids, nome, id);

    return(
        <>
            <Nav>SOBRE</Nav>
            <WebView source={{uri: `https://bq.mat.br/usuario/criar_conta/`}}/>
        </>
    );
}