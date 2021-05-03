import React from 'react';
import {WebView} from 'react-native-webview';
import Nav from '../../components/Nav';



export default function ShowAvaliacao({route}){
    const {token, qids} = route.params

    return(
        <>
            <Nav>EPSILON</Nav>
            <WebView source={{uri: `https://bq.mat.br/usuario/epsilon/imprimir/avaliacao/mobile/?token=${token}&qids=${qids}`}}/>
        </>
    );
}