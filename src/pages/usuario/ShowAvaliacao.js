import React from 'react';
import {  WebView } from 'react-native-webview';
import TabGoBack from '../../components/TabGoBack';




export default function ShowAvaliacao({route}){
    const {token, qids, page} = route.params
    
    return(
        <>
            <TabGoBack page={page} token={token} />
            {/* <WebView source={{uri: `https://bq.mat.br/usuario/epsilon/imprimir/avaliacao/mobile/?token=${token}&qids=${qids}`}}/> */}
            <WebView source={{uri: `https://beta.bq.mat.br/usuario/epsilon/imprimir/avaliacao/mobile/?token=${token}&qids=${qids}`}}/>

        </>
    );
}