import React, { useState } from 'react';
import { 
    View,
    Text,
    TouchableOpacity, 
    ScrollView, 
    StyleSheet, 
} from 'react-native';

import Nav from '../../components/Nav';
import Info from '../../components/Info';
import SelectedEtapa from '../../components/SelectedEtapa';
import SelectedAno from '../../components/SelectedAno';
import SelectUnidade from '../../components/SelectUnidade';
import SelectConhecimento from '../../components/SelectConhecimento';
import SelectNivel from '../../components/SelectNivel';



const GerarAvaliacao = () => {
   
    const [ selectedEtapa, setSelectedEtapa ] = useState('')
    const [ selectedAno, setSelectedAno ] = useState('')
    const [ selectedUnidade, setSelectedUnidade ] = useState('')
    const [ selectedConhecimento, setSelectedConhecimento ] = useState('')
    const [ selectedNivel, setSelectednivel ] = useState('')

    let Questao = {
        etapa: selectedEtapa,
        ano: selectedAno,
        unidade: selectedUnidade,
        conhecimento: selectedConhecimento,
        nivel: selectedNivel,
    }


    return(
        <View style={Styles.body}>

            <Nav>EPSILON</Nav>
            <Info>GERAR AVALIAÇÃO</Info>

            <ScrollView 
             style={Styles.main}
             contentContainerStyle={Styles.ScrollStyle}
             >
                <View style={ Styles.contenerSelects }>


                <Text style={Styles.text} >Etapa</Text>
                <SelectedEtapa
                selectedValue={selectedEtapa}
                onValueChange={setSelectedEtapa}/>

                <Text style={Styles.text} >Ano</Text>
                <SelectedAno 
                selectedValue={selectedAno}
                op={selectedEtapa}
                onValueChange={setSelectedAno}/>
 
                <Text style={Styles.text} >Unidade temática</Text>
                <SelectUnidade
                selectedValue={selectedUnidade}
                op={{etapa: selectedEtapa, ano: selectedAno}}
                onValueChange={setSelectedUnidade}                
                />

                <Text style={Styles.text} >Objeto de conhecimento</Text>
                <SelectConhecimento
                selectedValue={selectedConhecimento}
                op={{etapa: selectedEtapa, ano: selectedAno, unidade: selectedUnidade}}
                onValueChange={setSelectedConhecimento}                
                />

                    {/* <Text style={Styles.text} >Nível de dificuldade</Text>
                    <SelectNivel
                    op={selectedConhecimento}
                    selectedValue={selectedNivel}
                    onValueChange={setSelectednivel}
                    /> */}

                </View>

                <View style={ Styles.touchable }>
                    <TouchableOpacity 
                        style={Styles.bnt}
                        onPress={() =>(
                         alert("Buscar no BQP")
                        )}>

                        <Text style={Styles.bntText}> Buscar no BQP </Text> 
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={Styles.bnt}
                        onPress={() =>(
                         alert("Buscar no BQM")
                        )}>

                        <Text style={Styles.bntText}> Buscar no BQM </Text> 
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    )
};


const Styles = StyleSheet.create({

    body: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },

    main: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        width: '100%'
    },

    ScrollStyle: {
        alignItems: 'center', 
        justifyContent: 'center',
    },

    contenerSelects: {
        width: '100%', 
        alignItems: 'center',
        paddingVertical: '2%'
    },

    text: {
        alignSelf: 'flex-start',
        color:'#0b2639',
        fontSize: 17,
        fontWeight: 'bold',

        paddingLeft: '5%',
        marginBottom: 5
    },

    touchable: {
        alignItems: "center",
        width: '100%',
        backgroundColor: '#f8f8f8',
    },

    bnt:{
        alignItems: "center",
        justifyContent: "center",

        width: '90%',
        height: 50,
        marginVertical: '2%',


        borderWidth: 2,
        borderColor: '#002907',
        backgroundColor: '#ebebeb',//'#e8e8e8'//'#F4F5F6',
        elevation: 5,
        borderRadius: 8,
    },

    bntText: {
        color:'#0b2639',
        fontSize: 20,
        fontWeight: 'bold',
    }

});


export default GerarAvaliacao;