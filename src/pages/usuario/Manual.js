import React, {useState, useEffect} from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ActivityIndicator,
    ScrollView,
    AsyncStorage
} from 'react-native';
import Nav from '../../components/Nav';
import Info from '../../components/Info';
import axios from 'axios';



function Configuracao({ navigation }) {
    const [ dados, setDados ] = useState([])
    const [loginShow, setLoginShow] = useState(true);

    async function getManual() {
        let token = null
        let id = null
        try{
            token = await AsyncStorage.getItem('user_token')
            id = await AsyncStorage.getItem('user_id');
        }
        catch(erro){
            alert(erro+"ao recupera do storage")
        }

        try{
            const ApiGet = axios.create({
                baseURL: 'https://bq.mat.br/', //'https://bq.mat.br/api/v1',
                timeout: 100,
                //headers: {'Authorization': 'Token ' + "b6467054e25b883204ecfafbad2a37d450e1a74f"}
                headers: {'Authorization': 'Token ' + token}
            });
            
            const response = await ApiGet.get('/usuario/epsilon/manual.json');
            setDados(response.data),
            setLoginShow(false);
			//alert(dados)

        }
        catch(erro){
            alert(erro)
            alert('O correu um erro!')
        }
    }
    useEffect(() =>{getManual()}, [])

    return (
        <View style={styles.body}>

            <Nav>EPSILON</Nav>

            <Info>DASHBOARD {'>'} MANUAL</Info>

            {
                (loginShow)
                ?<ActivityIndicator  size='large' color='blue'  />
                :<View style={styles.main}>
                    <ScrollView style={styles.conteiner}>
                        {
                            dados.map(value =>(
                                <Text key={value+Math.floor(Math.random() * 100)} style={(isNaN(value[0][0]))?styles.text:styles.title}>
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
        //marginTop: 3,
        backgroundColor: '#f8f8f8',
        alignItems: 'center'
    },

    conteiner: {
        flex: 1,
        //alignItems: 'center',
        backgroundColor: 'rgba(152, 148, 148, 0.1)',

        width: '95%',
        paddingVertical: 25,
        paddingHorizontal: '3%',
        marginVertical: '4%',

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
		marginBottom: 10
    }
});

// const styles = StyleSheet.create({

//     body: {
//         flex: 1,
//         backgroundColor: '#f8f8f8',
//         fontSize: 14,
//         alignItems: 'center'
//     },

//     main: {
//         flex: 1,
//         //marginTop: 30,
//         backgroundColor: '#f8f8f8',
//         alignItems: 'center'
//     },

//     conteiner: {
//         flex: 1,
//         alignItems: 'center',
//         backgroundColor: 'rgba(152, 148, 148, 0.1)',

//         width: '95%',
//         paddingVertical: 15,
//         paddingHorizontal: '3%',
//         marginVertical: '4%',

//         borderRadius: 5,
//         borderColor: '#e1e1e8',

        
//     },

//     text: {
//         fontSize: 18,
//         fontWeight: '700',
//         color: '#286090',
//         textAlign: 'justify'

//     }
// });


export default Configuracao;