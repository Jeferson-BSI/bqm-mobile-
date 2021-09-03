import React from 'react';
import {WebView} from 'react-native-webview';
import TabGoBack from '../components/TabGoBack'


export default function PDFExample({route}){
    // const {token, qids, nome, id} = route.params
    // console.log(token, qids, nome, id);
    
    return(
        <>
            <TabGoBack page={{page: ''}} token={{token: ''}}/>
            {/* <WebView source={{uri: `https://bq.mat.br/usuario/criar_conta/`}}/> */}
            <WebView source={{uri: `https://beta.bq.mat.br/usuario/criar_conta/mobile/ `}}/>

        </>
    );
}