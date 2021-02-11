import React, {useEffect} from 'react';

import { useNavigation } from '@react-navigation/native';

import {StyleSheet, AsyncStorage, View, Text } from 'react-native';

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
 
        <View style={styles.body}>

            <Nav>POLITICADEPRIVACIDADE</Nav>

            <Info>POLÍTICA DE PRIVACIDADE</Info>

            <View style={styles.main}>
				<View style={styles.conteiner}>
					<Text style={styles.text}>
						1. Informações gerais
					</Text>
					
					<Text style={styles.text}>
						2. Direitos do usuário
					</Text>

					<Text style={styles.text}>
						3. Dever de não fornecer dados de terceiros
					</Text>

					<Text style={styles.text}>
						4. Da coleta e tratamento dos dados
					</Text>

					<Text style={styles.text}>
						5. Do tratamento dos dados pessoais
					</Text>

					<Text style={styles.text}>
						6. Segurança no tratamento dos dados pessoais do usuário
					</Text>

					<Text style={styles.text}>
						7. Dados de navegação (cookies)
					</Text>

					<Text style={styles.text}>
						8. Das alterações
					</Text>

					<Text style={styles.text}>
						9. Do Direito aplicável e do foro
					</Text>
				</View>
            </View>
        </View>
       
    )
};


const styles = StyleSheet.create({

    body: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        fontSize: 14,
        alignItems: 'center'
    },

    main: {
        flex: 1,
        //marginTop: 30,
        backgroundColor: '#f8f8f8',
        alignItems: 'center'
    },

    conteiner: {
        flex: 1,
        //alignItems: 'center',
        backgroundColor: 'rgba(152, 148, 148, 0.1)',

        width: '95%',
        paddingVertical: 15,
        paddingHorizontal: '3%',
        marginVertical: '4%',

        borderRadius: 5,
        borderColor: '#e1e1e8',

        
    },

    text: {
        fontSize: 17,
        fontWeight: '700',
        color: '#286090',
        textAlign: 'justify'

    }
});


export default PoliticaDePrivacidade;
