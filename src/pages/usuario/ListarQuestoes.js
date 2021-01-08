import React, { useState} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Button
} from 'react-native';
import Nav from '../../components/Nav';
import Info from '../../components/Info';
import Questao from '../../components/Questao';
import Modal from 'react-native-modal';


// Para instalar as bibliotecas necessárias basta executar: 'yarn add react-native-modal or npm i react-native-modal.' 
function ListarQuestoes() {

    // async function QuestionStorage(op){
    //     const token = await AsyncStorage.getItem('user_token')
    
    //     const ApiGet = axios.create({
    //         baseURL: 'https://bq.mat.br/api/v1',
    //         timeout: 50,
    //         //headers: {'Authorization': 'Token ' + "b6467054e25b883204ecfafbad2a37d450e1a74f"}
    //         headers: {'Authorization': 'Token ' + token}
    //     });
    // }

    const questoes = {
        area: 'Porcentagem',
        pergunta: 'Na compra de um aparelho obtive desconto de 15% por ter feito o pagamento à vista. Se paguei R$ 102,00 reais pelo aparelho, qual era seu o preço original?',
        resposta: 'Como obtive desconto de 15%, paguei o equivalente a 100% - 15% = 85% \n0,85 * y = 102 \ny = 102 / 0,85 = 120 reais',
    };

    //const [visible, setVisible] = useState(false);

    return (
        <View style={styles.body}>
            <Nav>EPSILON</Nav>

            <Info>BQP  {'>'} QUESTÕES </Info>


            <View style={styles.main}>
                <ScrollView style={styles.conteinerQuestoes}
                    showsVerticalScrollIndicator={false}
                >
                    <Questao data={questoes} />
                    <Questao data={questoes} />
                    <Questao data={questoes}/>
                    <Questao data={questoes}/>
                    <Questao data={questoes} />
                    <Questao data={questoes} />
                    <Questao data={questoes}/>
                    <Questao data={questoes}/>
                </ScrollView>
                

                {/* <Modal isVisible={ visible }>
                    <View style={ {backgroundColor: 'white', height: '80%'}}>
                        <Text>
                            X
                        </Text>
                        <Button title='Modal' onPress={() => { setVisible(false)}}/>
                    </View>
                </Modal> */}

            </View>
        </View>   
    )
};


const styles = StyleSheet.create({

    body: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        fontSize: 14,
        alignItems: 'center',
    },

    main: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        width: '100%',
        alignItems: 'center'
    },

    conteinerQuestoes: {
        flex: 1,
        width: '90%'
    }


});


export default ListarQuestoes;