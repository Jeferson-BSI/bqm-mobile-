import React, {useEffect} from 'react';

import { useNavigation } from '@react-navigation/native';

import {StyleSheet, AsyncStorage } from 'react-native';

import Body from '../components/Body';
import Nav from '../components/Nav';
import Info from '../components/Info';
import Main from '../components/Main';


function PoliticaDePrivacidade() {

	const navigation = useNavigation();

	async function CheckLogin(){


		let UserToken = ''

	    try {
	    
	    	UserToken = await AsyncStorage.getItem('user_token')

	    	//alert(UserToken)

	    	if (UserToken !== '') {

	    		let UserNivelDeAcesso = await AsyncStorage.getItem('user_nivel_de_acesso')

		        if (UserNivelDeAcesso == 'epsilon') {

		            navigation.navigate('Epsilon', {token:UserToken})
		        }

	    	} else {
	    		//alert('Não tem dados em cache')
	    	}
	      
	    } catch (_err) {
	        //alert('Não foi possivel buscar as informacoes em cache')
	    }

	}

	React.useEffect(() => {
   		const unsubscribe = navigation.addListener('focus', () => {
   			CheckLogin()
	    });

	    return unsubscribe;

  	}, [navigation]);



    return (
 
        <Body>

            <Nav>POLITICADEPRIVACIDADE</Nav>

            <Info>POLÍTICA DE PRIVACIDADE</Info>

            <Main>

            </Main>

        </Body>
       
    )
};


const styles = StyleSheet.create({

   
});


export default PoliticaDePrivacidade;
