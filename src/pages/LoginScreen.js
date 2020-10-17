import React, { useEffect, useState } from 'react';
import FormRow from '../components/FormRow';
import Api from '../components/Api';


import { 
    Text, View, 
    StyleSheet,Image,
    TextInput, TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard 
} from 'react-native'


function LoginScreen() {
    const logText = {fontSize:28, marginTop:20, color: '#ace5f2'}
    const [logo, setLogo] = useState({width: 150, height: 150, marginTop: 30})
    const [logoText, setText] = useState(logText)

    async function handlesLogin(){
    try {
        const response = await Api.post('/token/bearer/', {
                     "email": User.email,
                     "password": User.senha,
                 });
                 const { access, refresh } = response.data;
                 alert(access)

      } catch (_err) {
        alert('Houve um problema com o login, verifique suas credenciais!')
      }
    }

    const [email, onChangeEmail] = React.useState('epsilon@bq.mat.br');
    const [senha, onChangeSenha] = React.useState('23571113');
    
    const User = {
        'email': email,
        'senha': senha
    }

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", keyboardDidHide);
    }, []);


    const keyboardDidShow = () => {
        setLogo({width: 0, height: 0});
        setText({fontSize:38, marginTop: 10, color: '#3397de', marginBottom: 30});
        //alert("Keyboard Shown");
    }

    const keyboardDidHide = () => {
        setLogo({width: 130, height: 130, marginTop: 30});
        setText({fontSize:28, marginTop: 20, color: '#ace5f2'})
    }


    return(
        <KeyboardAvoidingView style={ styles.screen }>    
            <View style={styles.containerlogo}>
                <Image style={logo} 
                    source={require('../assets/mat.png')}/>
                <Text style={logoText}> Login </Text>
            </View>

            <View style={styles.conteiner}>
                <FormRow>
                    <TextInput
                    style= {styles.styleText}
                    //placeholderTextColor= { '#000' }
                    placeholder='Email'
                    autoCorrect={false}
                    keyboardType={'email-address'}
                    onChangeText={text => onChangeEmail(text)}
                    value={email}
                    />
                </FormRow>

                <FormRow >
                    <TextInput 
                    style={ styles.styleText }
                    //placeholderTextColor= { '#000' }
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={text => onChangeSenha(text)}
                    value={senha}

                    />
                </FormRow>

                <TouchableOpacity 
                style={styles.btnSubmit}
                onPress={handlesLogin} >
                    <Text style={styles.btnText}> Acessar </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={styles.btnRegister}
                onPress={handlesLogin}>
                    <Text style={styles.singin}>Criar Conta!</Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#f7feff',//'white',//'#f7fbfc',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    containerlogo: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'red'
    },

    conteiner: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        paddingBottom: 50,
        //backgroundColor:'blue'
    },

    styleText: {
        fontSize: 17,
        padding: 10,
    },

    btnSubmit: {
        backgroundColor: '#46abf2', //'#3397de',
        width: '70%',
        height: 43,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        marginTop: 20,
    },

    btnText: {
        color: 'white',
        fontSize: 18,
    },
    btnRegister: {
        marginTop: 10,
    },

    singin: {
        color: '#ace5f2',
    }
  });

  
export default LoginScreen;