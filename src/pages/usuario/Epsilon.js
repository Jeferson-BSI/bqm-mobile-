import React, { useState, useEffect }from 'react';
import { 
    View, 
    StyleSheet, 
    ScrollView, 
    Text, 
    AsyncStorage,
    Button
} from 'react-native';
import axios from 'axios';

import Nav from '../../components/Nav';
import Info from '../../components/Info';
import CardProva from '../../components/CardProva';
import InputModal from '../../components/InputModal';
import OptionModal from '../../components/OptionModal';
import deletarAvaliacao from '../../funções/deletarAvaliacao';
import atualizarAvaliacao from '../../funções/atualizarAvaliacao';
import { useNavigation } from '@react-navigation/native';

function Epsilon({ route }) {
    const navigation = useNavigation();
    const { token } = route.params;
    
    const [ provas, setProvas] = useState(null);
    const [ isVisible, setVisible] = useState(false);
    const [isVisibleTwo, setVisibleTwo ] = useState(false);
    const [obj, setObj ] = useState(null);
    const [nome, setNome ] = useState(null);


    const deletar = () =>{
            deletarAvaliacao(obj.id)
            provas.splice(provas.indexOf(obj), 1)
            setVisible(false)
    }

    const atualizar = () => {
        provas.splice(provas.indexOf(obj), 1)
        obj.nome = nome;
        const  list  = [...provas, obj]
        atualizarAvaliacao(obj.id, nome)
        setProvas(list)
        setVisibleTwo(false)
        setNome('')
     }
 
    const ApiGet = axios.create({
        //baseURL: 'https://bq.mat.br/api/v1',

        baseURL: 'http://10.0.2.2:8000/api/v1', //'https://bq.mat.br/api/v1',
        timeout: 200,
        //headers: {'Authorization': 'Token ' + "b6467054e25b883204ecfafbad2a37d450e1a74f"}
        headers: {'Authorization': 'Token ' + token}
    });


    const setCards = () => {
        if(provas !== null)
        provas.sort((a, b) =>{
            return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0);
        })
        
        return (provas !== null)
        ?provas.map(value =>(
           <CardProva 
            key={value.id} 
            value={value}
            token={token}
            //setId={setId}
            setObj={setObj}
            setVisible={setVisible}
            setVisibleTwo={setVisibleTwo}
           />
        ))
        :null
    }

    async function getProva(){
        const id = await AsyncStorage.getItem('user_id')
        console.log(token);
        try{
            let page = 1
            let dados = []
            while (true) {
                const response = await ApiGet.get(`/imprimir/?cadastro_pelo_usuario=${id}&page=${page}`)
                const { results, next } = response.data
                //alert(JSON.stringify(response.results))
                dados = dados.concat(results)

                if(next !== null){
                    page++}
                else{
                    break}
            }
            setProvas(dados)
        }
        catch(erro) {
            alert(erro)
        }
    };

    useEffect(() =>{getProva()}, [])

    return (
        <View style={ styles.body }>

            <Nav>EPSILON</Nav>

            <Info>DASHBOARD</Info>

            <View style={ styles.main }>
                <View style={styles.title}>
                    <Text style={styles.titleText}>
                        AVALIAÇÕES GERADAS
                    </Text>
                </View>
                <ScrollView 
                 showsVerticalScrollIndicator={false}
                 contentContainerStyle={styles.conteiner}>
                    {
                        setCards()
                    //  (provas !== null)
                    //  ?provas.map(value =>(
                    //     <CardProva 
                    //      key={value.id} 
                    //      value={value}
                    //      //setId={setId}
                    //      setObj={setObj}
                    //      setVisible={setVisible}
                    //      setVisibleTwo={setVisibleTwo}

                    //     />
                    //  ))
                    //  :null
                    }
                </ScrollView>

                <OptionModal 
                 texto={'Deseja excluir esta avaliação?'} 
                 isVisible={isVisible}
                 onPress={deletar}
                 onPress2={()=>setVisible(!isVisible)}
                />

                <InputModal 
                 texto={'Nome:'} 
                 isVisible={isVisibleTwo}
                 onChangeTex={setNome}
                 value={nome}
                 onPress={atualizar}
                 onPress2={()=>setVisibleTwo(!isVisibleTwo)}
                />
                {/* <Button
onPress={()=>{
    alert(token)
    console.log(token);
    navigation.navigate('tests')}}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/> */}
            </View>

        </View>
)};


const styles = StyleSheet.create({
    body: {
        flex: 1,
        // backgroundColor: '#fff',
        backgroundColor: '#e8f0ff',
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },

    main: {
        flex: 1,
        backgroundColor: 'rgba(152, 148, 148, 0.19)',//'#f8f8f8',
        alignItems: 'center',
        width: '95%',
        justifyContent: 'center',
        //minHeight: 500
        borderRadius: 15,
        marginBottom: 15


    },

    conteiner :{    
       // flex:1,
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        //width: '95%',
        //backgroundColor: 'rgba(152, 148, 148, 0.1)',//'#f7f7f9',
        borderRadius: 5,
        borderColor: '#e1e1e8',
        minHeight: 150,
       // marginBottom: 10

    },

    title: {
        backgroundColor: '#f7f7f9',//'rgba(152, 148, 148, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        
        width: '95%',
        paddingVertical: 10,
        marginTop: '3%',
        marginBottom: 10,

        borderTopEndRadius: 5,
        borderTopStartRadius:5,
        borderColor: '#f7f7f9',
        borderBottomWidth: 1,
        borderBottomColor:'gray'
    },

    titleText: {
        fontSize: 18,
        fontWeight: '700',
        color:'#48484c',// '#286090',
    }
});


export default Epsilon;