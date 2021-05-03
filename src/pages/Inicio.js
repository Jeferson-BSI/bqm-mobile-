import React from 'react';

import { Text, View, StyleSheet, AsyncStorage } from 'react-native';
import { Video } from 'expo-av';

import VideoPlayer from 'expo-video-player'

import Body from '../components/Body';
import Nav from '../components/Nav';
import Info from '../components/Info';
import Main from '../components/Main';

import { useNavigation } from '@react-navigation/native';

function Inicio() {

	
	const navigation = useNavigation();

	async function CheckLogin(){


		let UserToken = ''

	    try {
	    
	    	UserToken = await AsyncStorage.getItem('user_token')

	    	//alert(UserToken)

	    	if (UserToken !== '') {

	    		let UserNivelDeAcesso = await AsyncStorage.getItem('user_nivel_de_acesso')

		        if (UserNivelDeAcesso == 'epsilon') {

		            //navigation.navigate('Epsilon', {token:UserToken})
                    navigation.reset({
                        routes: [
                          {
                            name: 'Epsilon',
                            params: {token:UserToken},
                          },
                        ],
                    })
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

            <Nav>INICIO</Nav>

            <Info>PÁGINA INICIAL</Info>

            <Main>
                <View style={styles.styleView }>
                    <Text style={styles.styleText}>Olá, bem vindo!</Text>
                    <Text style={styles.styleText}>
                        BQM é uma plataforma gratuita que tem o objetivo de facilitar a elaboração de atividades avaliativas de matemática. É um banco com mais de XXX questões organizadas conforme eixo temático, objeto de conhecimento, ciclo de ensino e nível de dificuldade. Aproveite!
                    </Text>
                <View>
                    <Text style={{color: 'white'}}>Video</Text>
                </View>

                {/* <Video
                    source={{ uri: 'https://bq.mat.br/media/video.webm' }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay={false}
                    isLooping
                    style={{ width: 300, height: 300 }}
                    /> */}

               < VideoPlayer
                    videoProps={{
                        shouldPlay: false,
                        resizeMode: Video.RESIZE_MODE_CONTAIN,
                        isLooping: true,
                        source: {
                        uri: 'https://bq.mat.br/media/video.webm' //'http://10.0.2.2:8000/media/video.webm' //'https://bq.mat.br/media/video.webm',
                        },
                    }}
                    width={300}
                    height={300}
                    inFullscreen={true}
                />
                </View>

            </Main>

        </Body>
       
    )};


const styles = StyleSheet.create({

    styleView:{
        backgroundColor: '#fff',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    styleText: {
        fontSize: 18,
        fontWeight: '700',
        color:'#0b2639',
        paddingHorizontal: '2%',
        color: '#286090',
       marginTop: 10,
        textAlign : 'justify',
    },

    conteiner: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(152, 148, 148, 0.1)',

        width: '95%',
        paddingVertical: 15,
        paddingHorizontal: '3%',
        marginVertical: '4%',

        borderRadius: 5,
        borderColor: '#e1e1e8',
        
        
    },
    
});


export default Inicio;
