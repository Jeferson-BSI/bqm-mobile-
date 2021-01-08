import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet,
    Button,
    CheckBox
} from 'react-native';
import Modal from 'react-native-modal';


export default function Questao(props) {

    const { data } = props;
    const [ visible, setVisible] = useState(false);
    const [ isSelected, setSelection ] = useState(false);

    const filterText = (text) =>{
        if(text.lehgth < 150){
            return text;
        }
        return `${text.substring(0, 150)}...?`;
    };

    return (
        <View>
            <TouchableOpacity style={ styles.conteiner}
            onPress={() => setVisible(false)}>
                <View style={styles.questao}>

                    <View style={ {flexDirection: 'row'}}>
                        <Text  style={ styles.textAp }>Área: </Text>
                        <Text style={ styles.title }>{ data.area } </Text>
                    </View>

                    <View>
                        <Text style={ styles.textAp }>Pergunta:  </Text>
                        <Text style={ styles.textPergunta } >{filterText(data.pergunta) } </Text>
                    </View>

                    <View style={ styles.checkConteiner}>
                        <CheckBox
                        value={isSelected} 
                        onValueChange={setSelection}
                        style={styles.checkBox}
                        size={25}
                        />
                    </View>

                </View>
            </TouchableOpacity>

            <Modal isVisible={ visible }>
                <View style={ {backgroundColor: 'white', height: '50%', justifyContent: 'space-between'}}>
                    <View style={styles.questao}>

                        <View style={ {flexDirection: 'row'}}>
                            <Text  style={ styles.textAp }>Área: </Text>
                            <Text style={ styles.title }>{ data.area } </Text>
                        </View>

                        <View style={{marginVertical: 10}}>
                            <Text style={ styles.textAp }>Pergunta:  </Text>
                            <Text style={ styles.textPergunta } >{ data.pergunta } </Text>
                        </View>

                        <View style={{marginVertical: 10}}>
                            <Text style={ styles.textAp}>Resposta:  </Text>
                            <Text style={ styles.textPergunta }> { data.resposta } </Text>
                        </View>
                    </View>
                    <View>
                        <Button color='#0b2639' title='Fechar' onPress={() => { setVisible(false)}}/>
                    </View>

                </View>
                </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    conteiner: {
        backgroundColor: 'rgba(152, 148, 148, 0.1)',
        //backgroundColor: '#e6e6e6',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#0b2639',
        marginVertical: '2%'
    },

    questao: {
        alignItems: 'center',
        paddingHorizontal: '2%',
        paddingVertical: '2%',
    },

    title: {
        fontSize: 18,
        color: '#0b2639'

    },

    textAp: {
        fontSize: 18,
        fontWeight: '700',
        marginRight: '2%'
    },

    textPergunta: {
        fontSize: 16,
        textAlign: 'justify',
        lineHeight: 20,
        marginLeft: '2%',
        fontFamily: 'sans-serif'
    },

    checkConteiner: {
        alignSelf: 'flex-start'
    },

    checkBox: {
        color: 'blue'
    }
})