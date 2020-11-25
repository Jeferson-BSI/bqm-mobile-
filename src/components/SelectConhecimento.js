import React from 'react';
import { View, Picker, StyleSheet} from 'react-native';


const selectConhecimento = (props) => {

    const Obj = {
        numeros: ["Contagem de rotina; Contagem ascendente e descendente; Reconhecimento de números no contexto diário: indicação de quantidades, indicação de ordem ou indicação de código para a organização de informações.",
        "Quantificação de elementos de uma coleção: estimativas, contagem um a um, pareamento ou outros agrupamentos e comparação.",
        "Leitura, escrita e comparação de números naturais até 100); Reta numérica.",
        "Construção de fatos básicos da adição.",
        "Composição e decomposição de números naturais.",
        "Problemas envolvendo diferentes significados da adição e da subtração juntar, acrescentar, separar, retirar).",
        ],

        algebra: ["Padrões figurais e numéricos: investigação de regularidades ou padrões em sequências.", 
        "Sequências recursivas: observação de regras usadas utilizadas em seriações numéricas mais 1, mais 2, menos 1, menos 2, por exemplo).",
        ],
        
        geometria: ["Localização de objetos e de pessoas no espaço, utilizando diversos pontos de referência e vocabulário apropriado.",
        "Figuras geométricas espaciais: reconhecimento e relações com objetos familiares do mundo físico.",
        "Figuras geométricas planas: reconhecimento do formato das faces de figuras geométricas espaciais.",    
        ],

        gradezas: ["Medidas de comprimento, massa e capacidade: comparações e unidades de medida não convencionais.",
        "Medidas de tempo: unidades de medida de tempo, suas relações e o uso do calendário.",
        "Sistema monetário brasileiro: reconhecimento de cédulas e moedas.",
        ],
        estatistica: ["Noção de acaso.",
        "Leitura de tabelas e de gráficos de colunas simples.",
        "Coleta e organização de informações; Registros pessoais para comunicação de informações coletadas.",
        ],
    
    }
    

    const PickerItem = (op) => {
        let i = 0

        if(op == 'Numeros')
            return Obj.numeros.map(area => {
                i++
                return(
                <Picker.Item key={i} label={area} value={i} />
            )})

        else if(op == 'Álgebra')
            return Obj.algebra.map(area => {
                i++
                return(
                <Picker.Item key={i} label={area} value={i} />
            )})

        else if(op == 'Geometria')
            return Obj.geometria.map(area => {
                i++
                return(
                <Picker.Item key={i} label={area} value={i} />
            )})
        else if(op == 'Gradezas e medidas')
            return Obj.gradezas.map(area => {
                i++
                return(
                <Picker.Item key={i} label={area} value={i} />
            )})

        else if(op == 'Probabilidade e estatística')
            return Obj.estatistica.map(area => {
                i++
                return(
                <Picker.Item key={i} label={area} value={i} />
            )})

            return <Picker.Item label='Objeto de Conhecimento' value='cert' />
        }
     

    return(
        <View style={Styles.select}>
            <Picker 
            style={{width: '100%', height: '100%'}}
            selectedValue={props.selectedValue}
            onValueChange={(itemValue, itemIndex) => { 
            props.onValueChange(itemValue)}}
            >
                <Picker.Item label='Objeto de Conhecimento' value='' />
                {(props.op != '0' && props.op != '')
                ?
                    PickerItem(props.op)
                : null
                }
            </Picker>
        </View>
    )
};


const Styles = StyleSheet.create({

    select: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: 'center',
        width: '90%',
        maxHeight: 40,
        color: 'red',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#0b2639',
        marginBottom: 15
    },
});


export default selectConhecimento;