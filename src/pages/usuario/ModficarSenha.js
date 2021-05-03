import React, {useState} from 'react';
import {
    ScrollView,
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import Nav from '../../components/Nav';
import Info from '../../components/Info';
import FormRow from '../../components/FormRow';

function ModSenha() {

    const [senha, setSenha] = useState('');
    const [novaSenha, setNovaSenha] = useState(''); 
    const [novaSenha2, setNovaSenha2] = useState('');  

                       

    return (
        <KeyboardAvoidingView style={Styles.body}>

            <Nav>EPSILON</Nav>

            <Info>CONFIGURAÇÃO {'>'} MODIFICAR SENHA </Info>

            {/* <View style={Styles.main}> */}
            <ScrollView 
            style={Styles.main}
            contentContainerStyle={Styles.ScrollStyle}>

                <Text style={Styles.text} >Senha antiga:</Text>
                <FormRow>
                    <TextInput
                    style= {Styles.textInput}
                    placeholderTextColor= { '#0b2639' }
                    placeholder=''
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText={text => setSenha(text)}
                    value={senha}
                    />
                </FormRow>

                <Text style={Styles.text} >Nova Senha:</Text>
                <FormRow>
                    <TextInput
                    style= {Styles.textInput}
                    placeholderTextColor= { '#0b2639' }
                    placeholder=''
                    autoCorrect={false}
                    onChangeText={text => setNovaSenha(text)} 
                    secureTextEntry={true}
                    value={novaSenha}


                    />
                </FormRow>
                
                <Text style={Styles.text} >Confirma senha:</Text>
                <FormRow >
                    <TextInput
                    style={ Styles.textInput }
                    placeholderTextColor= { '#0b2639' }
                    placeholder=''
                    secureTextEntry={true}
                    onChangeText={text => setNovaSenha2(text)} 
                    value={novaSenha2}
                    />
                </FormRow>
                

                <TouchableOpacity
                    onPress={() => (
                        alert( `${senha} ${novaSenha} ${novaSenha2}`)
                    )}
                    style={Styles.touchableOpacity}>
                    <Text style={Styles.touchableOpacityText}> Salvar alteração </Text>

                </TouchableOpacity>

            {/* </View> */}
            </ScrollView>
            
        </KeyboardAvoidingView>
    )
};


const Styles = StyleSheet.create({

    body: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        fontSize: 14,
        alignItems: 'center',
    },

    main: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#f8f8f8',
        width: '100%'
    },

    textInput: {
        fontSize: 17,
        padding: 10,
        borderRadius: 10,
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#0b2639',
    },

    touchableOpacity: {
        backgroundColor: '#0b2639', //'#3397de',
        width: '90%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 20,
        elevation: 1
    },
  
    touchableOpacityText: {
        color: 'white',
        fontSize: 18,
    },

    text: {
        alignSelf: 'flex-start',
        color:'#0b2639',
        fontSize: 17,
        paddingLeft: '8%',
        marginBottom: 5
    },

    ScrollStyle: {
        alignItems: 'center', 
        justifyContent: 'center',
    },

});


export default ModSenha;