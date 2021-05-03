import React, {useState} from 'react';
import { 
    View,
    Text,
    StyleSheet, 
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Nav from '../components/Nav';
import Info from '../components/Info';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';


function Sobre() {
	const navigation = useNavigation();
	const [ dados, setDados ] = useState([]);
    const [loginShow, setLoginShow] =useState(true);


	async function getSobre() {
        let token = null
        let id = null
        try{
            token = await AsyncStorage.getItem('user_token');
            id = await AsyncStorage.getItem('user_id');
        }
        catch(erro){
            alert(erro+"ao recupera do storage");
        }

        try{
            const ApiGet = axios.create({
                baseURL: 'https://bq.mat.br/', //'https://bq.mat.br/api/v1',
                timeout: 100,
                //headers: {'Authorization': 'Token ' + "b6467054e25b883204ecfafbad2a37d450e1a74f"}
                headers: {'Authorization': 'Token ' + token}
            });
            
            const response = await ApiGet.get('/sobre.json');
			const { data } = response.data;
            setDados(response.data);
            setLoginShow(false);
			//alert(dados)
        }
        catch(erro){
            //alert(erro);
            //alert('O correu um erro!');
        }
    }


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
		getSobre()

	    return unsubscribe;

  	}, [navigation]);

    return (
        <View style={styles.body}>

            <Nav>SOBRE</Nav>

            <Info>SOBRE</Info>

                {
                    (loginShow)
                    ?<ActivityIndicator  size='large' color='blue'  />
                    :<View style={styles.main}>
                        <ScrollView style={styles.conteiner}>
                            {
                                dados.map(value =>(
                                    <Text key={value} style={(isNaN(value[0][0]))?styles.text:styles.title}>
                                    {value}
                                    </Text>
                                ))
                            }
                        </ScrollView>
                    </View>
                }

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
        marginTop: -5,
        backgroundColor: '#f8f8f8',
        alignItems: 'center'
    },

    conteiner: {
        flex: 1,
        //alignItems: 'center',
        backgroundColor: 'rgba(152, 148, 148, 0.1)',

        width: '95%',
        paddingVertical: 20,
        paddingHorizontal: '3%',
        marginVertical: '2%',

        borderRadius: 5,
        borderColor: '#e1e1e8',

        
    },

	title: {
		fontSize: 18,
        fontWeight: '700',
        color: '#286090',
        textAlign: 'justify',
		marginBottom: 5
	},

    text: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#286090',
        textAlign: 'justify',
		marginBottom: 17
    }
});


export default Sobre;
