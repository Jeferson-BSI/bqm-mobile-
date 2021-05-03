import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet,
    CheckBox,
} from 'react-native';


const filterText = (text) =>{
    if(text.lehgth < 130){
        return text;
    }
    return `${text.substring(0, 130)}`;
};


export default function QuestaoAvaliacao(props) {
    const { data, list, setList, id, setId, setVisibleQuestao,
        setDataQuestao, selected} = props;
    
    let listId = [...list];
    let qids = [...id];

    const [ isSelected, setSelection ] = useState(selected);
    
    return (
        <View>
            <TouchableOpacity style={ styles.conteiner}
            onPress={() => {
                setDataQuestao(data)
                setVisibleQuestao(true)
                }}>
                <View style={styles.questao}>

                    <View>
                        <Text style={ styles.textAp }>Pergunta:  </Text>
                        <Text style={ styles.textPergunta } >{filterText(data.pergunta) } ...? </Text>
                    </View>
                    
                    <View>
                        <Text style={ styles.textAp }>Resposta:  </Text>
                        <Text style={ styles.textPergunta } >{filterText(data.resposta) } </Text>
                    </View>

                    <View style={ styles.checkConteiner}>
                        <CheckBox
                        value={isSelected} 
                        onValueChange={()=>{
                            setSelection(!isSelected)
                            if(!isSelected){
                                listId.push(data)
                                setList(listId)

                                qids.push(data.id)
                                setId(qids)
                            }
                            else{
                                listId.splice(listId.indexOf(data), 1);
                                setList(listId);

                                qids.splice(qids.indexOf(data.id), 1);
                                setId(qids);
                            }
                        }}
                        style={styles.checkBox}
                        size={25}
                        />
                    </View>

                </View>
            </TouchableOpacity>

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
        marginTop: '3%'

    },

    questao: {
        //alignItems: 'center',
        paddingHorizontal: '3%',
        paddingVertical: '2%',
    },

    title: {
        fontSize: 16,
        color: '#0b2639'

    },

    textAp: {
        fontSize: 16,
        fontWeight: '700',
        marginRight: '2%'
    },

    textPergunta: {
        fontSize: 14,
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
});