import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';


const NavColumns = () => {

    async function navColumnsOnePress(){

        alert('navColumnsOnePress')

    }

    async function navColumnsTwoPress(){

        alert('navColumnsTwoPress')

    }

    async function navColumnsThreePress(){

        alert('navColumnsThreePress')

    }

    const navColumnsOne = `
    <svg width="50" height="50" viewBox="0 0 24 24">
        <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        fill="url(#gradient)"
        d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z"
        />
        <defs>
        <linearGradient
        id="gradient"
        x1="0"
        y1="0"
        x2="0"
        y2="0"
        gradient-units="userSpaceOnUse">
        <stop offset="0" stop-color="#0b2639" />
        <stop offset="1" stop-color="#0b2639" />
        </linearGradient>
        </defs>
    </svg> `;

    const navColumnsTwo = `
    <svg width="50" height="50" viewBox="0 0 512 512">
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        fill="url(#gradient)"
        d="M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256.1 446.3l-.1-381 175.9 73.3c-3.3 151.4-82.1 261.1-175.8 307.7z"
    />
    <defs>
        <linearGradient
        id="gradient"
        x1="0"
        y1="0"
        x2="0"
        y2="0"
        gradient-units="userSpaceOnUse">
        <stop offset="0" stop-color="#0b2639" />
        <stop offset="1" stop-color="#0b2639" />
        </linearGradient>
    </defs>
    </svg> `;

    const navColumnsThree = `
    <svg width="50" height="50" viewBox="0 0 576 512">
        <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        fill="url(#gradient)"
        d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"
    />
    <defs>
        <linearGradient
        id="gradient"
        x1="0"
        y1="0"
        x2="0"
        y2="0"
        gradient-units="userSpaceOnUse">
        <stop offset="0" stop-color="#0b2639" />
        <stop offset="1" stop-color="#0b2639" />
        </linearGradient>
        </defs>
    </svg> `;

    return (
        <View style={styles.nav}>
        <SvgXml  style={styles.navColumnsOne}
        onPress={navColumnsOnePress}
        xml={navColumnsOne}
        />

        <SvgXml  style={styles.navColumnsTwo}
        onPress={navColumnsTwoPress}
        xml={navColumnsTwo}
        />

        <SvgXml  style={styles.navColumnsThree}
        onPress={navColumnsThreePress}
        xml={navColumnsThree} />
    </View>
)};


const styles = StyleSheet.create({
    nav: {
    backgroundColor: '#d9d9d9',
    height: 70,
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    },

    navColumnsOne:{
    flex: 1,
    height:70,
    margin:33.33
    },

    navColumnsTwo:{
    flex: 1,
    height:70,
    margin:33.33
    },

    navColumnsThree:{
    flex: 1,
    height:70,
    margin:33.33
    },

});


export default NavColumns;