import React from 'react';

import {StyleSheet } from 'react-native';


import Body from '../../components/Body';
import Nav from '../../components/Nav';
import Info from '../../components/Info';
import Main from '../../components/Main';

function Epsilon({ route, navigation }) {

	const { token } = route.params;

	alert(token)

    return (
 
        <Body>

            <Nav>EPSILON</Nav>

            <Info>EPSILON</Info>

            <Main>

            </Main>

        </Body>
       
    )

};


const styles = StyleSheet.create({
 
    
});


export default Epsilon;
