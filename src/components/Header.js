import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// const HeaderStyle = () => (
//     {
//         title: 'BQM: BANCO DE QUESTÕES DE MATEMÁTICA',
//         headerStyle: {
//            backgroundColor: '#0b2639',
//             //height: 40,
//             //marginTop: 30,
//             // para o headerText
//             justifyContent: 'center',
//             alignItems: 'center'
    
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//             fontSize: 14,
//             color:'#fff'
//         },
//       }
//     // <View style={styles.header}>
//     // <Text style={styles.headerText}>BQM: BANCO DE QUESTÕES DE MATEMÁTICA</Text>
//     // </View>
//     );

const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={ styles.headerText }>BQM: BANCO DE QUESTÕES DE MATEMÁTICA</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#0b2639',
        width: '100%',
        height: 40,//'35%',
        marginTop: 30,
        // para o headerText
        justifyContent: 'center',
        alignItems: 'center'
    
      },
    
      headerText: {
        fontSize: 14,
        color:'#fff'
      },
});


export default Header;