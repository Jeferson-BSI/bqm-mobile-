import React, {useEffect} from 'react';

import { useNavigation } from '@react-navigation/native';

import {StyleSheet, AsyncStorage } from 'react-native';


import Body from '../components/Body';
import Nav from '../components/Nav';
import Info from '../components/Info';
import Main from '../components/Main';

function Sobre() {


	const navigation = useNavigation();

	async function CheckLogin(){

		///let Access =''

		let Refresh = ''

	    try {
	    
	    	//Access = await AsyncStorage.getItem('access')

	    	Refresh = await AsyncStorage.getItem('refresh')

	    	//alert(Refresh)

	    	if (Refresh !== '') {

			    try {

			      const response = await Api.post('/token/bearer/refresh/', {
			        "refresh": Refresh,
			      });

			      const { access } = response.data;

			      //alert(access)

			      if (access) {
				    try {
				    
				    	await AsyncStorage.setItem('access', access)
				    	//await AsyncStorage.setItem('refresh', refresh)

				    	navigation.navigate('Epsilon', {token:access})
				     
				    } catch (_err) {
				         //alert('Não foi possivel atualizar as informacoes em cache')
				    }
			      }

			    } catch (_err) {

			        //alert('Não foi possivel conectar ao servidor')
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

            <Nav>SOBRE</Nav>

            <Info>SOBRE</Info>

            <Main>

            </Main>

        </Body>
       
    )

};


const styles = StyleSheet.create({
 
    
});


export default Sobre;
