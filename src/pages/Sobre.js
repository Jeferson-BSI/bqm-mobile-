import React, {useEffect} from 'react';

import { useNavigation } from '@react-navigation/native';

import {StyleSheet, AsyncStorage, View, Text } from 'react-native';


import Body from '../components/Body';
import Nav from '../components/Nav';
import Info from '../components/Info';
import Main from '../components/Main';
import { ScrollView } from 'react-native-gesture-handler';

function Sobre() {

	const navigation = useNavigation();

	async function CheckLogin(){


		let UserToken = ''

	    try {
	    
	    	UserToken = await AsyncStorage.getItem('user_token')

	    	//alert(UserToken)

	    	if (UserToken !== '') {

	    		let UserNivelDeAcesso = await AsyncStorage.getItem('user_nivel_de_acesso')

		        if (UserNivelDeAcesso == 'epsilon') {

		            navigation.navigate('Epsilon', {token:UserToken})
		        }

	    	} else {
	    		//alert('Não tem dados em cache')
	    	}
	      
	    } catch (_err) {
	        //alert('Não foi possivel buscar as informacoes em cache')
	    }

	}

	React.useEffect(() => {
   		const unsubscribe = navigation.addListener('focus', () => {
   			CheckLogin()
	    });

	    return unsubscribe;

  	}, [navigation]);

    return (
 
        <View style={styles.body}>

            <Nav>SOBRE</Nav>

            <Info>SOBRE</Info>

            <View style={styles.main}>
				<ScrollView style={styles.conteiner}>
					<Text style={styles.title}>
						1. Informações gerais
					</Text>
					<Text style={[styles.text]}>
					Esta plataforma foi desenvolvida por Isak Paulo de Andrade Ruas, sob orientação do Prof. Dr. Josué Antunes de Macêdo.
					{'\n\n'}Esta plataforma origina-se do projeto "Desenvolvimento de um sistema hipermídia para elaboração de avaliações de matemática", desenvolvido com bolsa do Programa Institucional de Bolsas de Iniciação em Desenvolvimento Tecnológico e Inovação (PIBITI) do Conselho Nacional de Desenvolvimento Científico e Tecnológico (CNPq).
					{'\n\n'}Atualmente, a plataforma encontra-se na versão de código 3.0.6
					</Text>

					<Text style={styles.title}>
						2. Objetivo
					</Text>
					<Text style={styles.text}>
					Ser um sistema disponibilizado on-line na internet de forma gratuita, destinado a auxiliar professores e professoras de matemática dos anos finais do ensino fundamental e ensino médio a elaborarem suas atividades avaliativas, com um banco de dados de questões de matemática organizadas conforme eixo temático, objeto de conhecimento, ciclo de ensino e nível de dificuldade.
					</Text>

					<Text style={styles.title}>
						3. Desenvolvimento e manutenção
					</Text>
					<Text style={styles.text}>
					Esta plataforma é de código aberto e gratuita, ou seja, qualquer pessoa poderá acessar, copiar, distribuir ou fazer novas versões, desde que respeitem os termos previstos na General Public License (GNU) versão 3 de 29 junho de 2007.
					{'\n\n'}O repositório oficial desta plataforma encontra-se disponível no Github e recebe constantemente atualizações de voluntários. Abaixo relacionamos os principais colaboradores, como forma de agradecimento:
					{'\n\n'}- Jeferson Lopes Coutinho (desenvolvimento da versão mobile)
					</Text>

					<Text style={styles.title}>
						4. Sobre Isak Ruas
					</Text>
					<Text style={styles.text}>
					Acadêmico do curso Licenciatura em Matemática ofertado no Instituto Federal do Norte de Minas (IFNMG) - Campus Januária, membro da Sociedade Brasileira de Matemática (SBM), membro da Câmara de Ensino, Pesquisa e Extensão (CEPE) do IFNMG, membro do Colegiado Escolar dos Cursos de Graduação (CECG) do IFNMG - Campus Janúária e membro da Subcomissão da Comissão Própria de Avaliação (sCPA) do IFNMG - Campus Januária.
					</Text>
					<Text style={styles.title}>
						5. Sobre Josué Macêdo
					</Text>
					<Text style={styles.text}>
						Doutor em Ensino de Ciências e  Matemática pela Universidade Cruzeiro do Sul (2014). Mestre em Ensino de Ciências e Matemática pela PUC Minas (2009). Especialista em Matemática Superior pela Universidade Estadual de Montes Claros (1999). Graduado em Matemática pela Universidade Estadual de Montes Claros - Unimontes (1996) e Graduado em Física pela Universidade Iguaçú (2001). Ex-Professor da Universidade Estadual de Montes Claros. Ex-Diretor Acadêmico, Professor e Coordenador do Curso de Licenciatura em Matemática do Instituto Superior de Educação Ibituruna (ISEIB) Montes Claros. Ex-Diretor Acadêmico da Faculdade de Ciências Gerenciais e Empreendedorismo (FACIGE) Montes Claros. Atualmente é professor e pesquisador do Instituto Federal de Educação, Ciência e Tecnologia do Norte de Minas Gerais (IFNMG), Campus Januária e Professor Colaborador no Programa de Pós-Graduação em Educação (Mestrado Acadêmico) da Unimontes. Membro do Núcleo Docente Estruturante do Curso de Licenciatura em Matemática. Sócio Efetivo da Sociedade Astronômica Brasileira (SAB). Revisor de Artigos Científicos para os Periódicos: Caderno Brasileiro de Ensino de Física; Ensaio Pesquisa em Educação em Ciências; Revista Imagens da Educação; Educar em Revista; Revista de Educação, Ciências e Matemática; Revista de Ensino de Ciências e Matemática (REnCiMa); Revista Tempos e Espaços em Educação; Revista Conexões - Ciência e Tecnologia, do Instituto Federal de Educação, Ciência e Tecnologia do Ceará (IFCE); CIENTEC - Revista de Ciência, Tecnologia e Humanidades do IFPE, Revista Educação Matemática Debate e Revista Ciências&Ideias. Tem experiência nas áreas de Matemática, Cálculo Diferencial e Integral, Equações Diferenciais; Física, Educação a Distância e Gestão de Instituições de Ensino Superior, atuando principalmente nos seguinte temas: Tecnologias Digitais no Ensino de Ciências e Matemática; Formação de professores que ensinam Matemática; Ensino e aprendizagem da Matemática na Educação Básica; Investigação nas aulas de Ciências e Matemática; Educação Matemática e Científica; Práticas Matemáticas em Espaços Escolares e Não Escolares e Ensino de Matemática, Física e Astronomia.
					</Text>
            	</ScrollView>
			</View>
        </View>
       
    )

};


const styles = StyleSheet.create({

    body: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        fontSize: 14,
        alignItems: 'center'
    },

    main: {
        flex: 1,
        //marginTop: 30,
        backgroundColor: '#f8f8f8',
        alignItems: 'center'
    },

    conteiner: {
        flex: 1,
        //alignItems: 'center',
        backgroundColor: 'rgba(152, 148, 148, 0.1)',

        width: '95%',
        paddingVertical: 15,
        paddingHorizontal: '3%',
        marginVertical: '4%',

        borderRadius: 5,
        borderColor: '#e1e1e8',

        
    },

	title: {
		fontSize: 18,
        fontWeight: '700',
        color: '#286090',
        textAlign: 'justify',
		marginBottom: 5
	},

    text: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#286090',
        textAlign: 'justify',
		marginBottom: 10
    }
});


export default Sobre;
