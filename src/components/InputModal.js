import React, { useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput
} from 'react-native';

import Modal from 'react-native-modal';


function InputModal(props){
    const { texto, isVisible, onChangeTex, value} = props;
    const { onPress, onPress2 } = props;

    return(
        <Modal isVisible={isVisible} 
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!isVisible);
        }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.conteinerText}>
                        <Text style={styles.modalText}>{texto}</Text>
                    </View>

                    <View style={styles.conteinerInput}>
                        <TextInput
                        style= {styles.textInput}
                        placeholderTextColor= { '#48484c' }
                        placeholder='Novo nome'
                        autoCorrect={false}
                        autoFocus
                        onChangeText={text => onChangeTex(text)} 
                        // secureTextEntry={true}
                        value={value}

                        />
                </View>

                    <View style={styles.conteinerOpcao}>

                        <TouchableOpacity 
                        onPress={onPress2}
                        style={[styles.opcao, {borderBottomStartRadius: 12,}]}>
                                <Text style={{fontSize:18, color: '#48484c'}}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        onPress={onPress}
                        style={[styles.opcao, {borderBottomEndRadius: 12, borderLeftWidth: 1,}]}>
                                <Text style={{fontSize:18, color: '#48484c'}}>Renomear</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </Modal>
)};




const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        width: '100%'
      },

    modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
    },

    modalText: {
        color: '#48484c',
        fontSize: 18,
        marginBottom: 5,
        textAlign: 'justify',
        fontWeight: '700'
    },

    conteinerOpcao: {
        flexDirection: 'row',
        marginTop: 35,
        margin: -35,
        alignSelf: 'flex-end'
    },

    conteinerText: {
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    
    opcao: {
        color: '#48484c',
        flex:1, 
        height: 50,
        borderTopWidth: 1, 
        borderColor: '#48484c',
        backgroundColor: 'white', 
        alignItems: 'center', 
        justifyContent: 'center',
    },

    conteinerInput: {
        width: 250,
    },

    textInput: {
        color: '#48484c',
        fontSize: 18,
        paddingHorizontal: 6,
        borderRadius: 5,
        height: 50,
        borderWidth: 1,
        borderColor: 'gray',
        borderBottomColor: 'black',
    },

});


export default InputModal;