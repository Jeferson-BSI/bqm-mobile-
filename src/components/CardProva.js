import React from 'react';
import { 
    View, 
    StyleSheet, 
    Text, 
    TouchableOpacity 
} from 'react-native';

import {AntDesign, FontAwesome} from '@expo/vector-icons';


function CardProva(props) {
    return (
        <View style={ styles.conteinerCard }>
            <View style={{alignSelf: 'center'}}>
                <Text style={styles.title}>
                    {props.name}
                </Text>
            </View>

            <View style={styles.iconConteiner}>
                <TouchableOpacity
                onPress={()=>alert('Deletar')}
                >
                        <AntDesign name='delete' color='#286090' size={30}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>alert('Editar')}>
                        <FontAwesome name='edit' color='#286090' size={30}/>
                </TouchableOpacity>

                {/* <TouchableOpacity>
                    <View style={{with: 25, height: 25}}>
                        <SvgXml xml={ iconEdit } />
                    </View>
                </TouchableOpacity> */}
            </View>
        </View>
)};


const styles = StyleSheet.create({
    conteinerCard: {
        backgroundColor: 'rgba(152, 148, 148, 0.2)',
        marginVertical: '3%',

        //alignItems: 'center',
        justifyContent: 'space-between',

        paddingHorizontal: 10,
        paddingVertical: 10,
        width: '45%',
        //maxWidth: '40%',
        height: 100,

        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#e6e6e6',
        //elevation: 1
    },

    title:{
        color:'#286090',
        fontFamily: 'serif',
        fontSize: 15,
        fontWeight: '700',
    },

    iconConteiner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
       // marginVertical: 20,
    },


});


export default CardProva;
