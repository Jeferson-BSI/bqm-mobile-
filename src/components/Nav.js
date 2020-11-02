import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const Nav = (props) => {

  const navigation = useNavigation();

  const { children } = props

  // Nav com 3 elementos
  if (children=='INICIO' || children=='SOBRE' || children=='POLITICADEPRIVACIDADE' || children=='ENTRAR') {

    async function NavOnePress_3(){
      //alert('NavOnePress')
      navigation.navigate('Sobre')
    }

    async function NavTwoPress_3(){
      //alert('NavTwoPress')
      navigation.navigate('PoliticaDePrivacidade')
    }

    async function NavThreePress_3(){
      //alert('NavThreePress')
      navigation.navigate('Entrar')
    }

    const NavOne_3 = `
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

    const NavTwo_3 = `
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

    const NavThree_3 = `
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
        <SvgXml  style={styles.NavOne_3}
        onPress={NavOnePress_3}
        xml={NavOne_3}
        />

        <SvgXml  style={styles.NavTwo_3}
        onPress={NavTwoPress_3}
        xml={NavTwo_3}
        />

        <SvgXml  style={styles.NavThree_3}
        onPress={NavThreePress_3}
        xml={NavThree_3} />
      </View>
    )

  } else {

    if (children=='EPSILON') {



      async function NavOnePress_5(){
        alert('NavOnePress_5')
        //navigation.navigate('Sobre')
      }

      async function NavTwoPress_5(){
        alert('NavTwoPress_5')
       // navigation.navigate('PoliticaDePrivacidade')
      }

      async function NavThreePress_5(){
        alert('NavThreePress_5')
       // navigation.navigate('Entrar')
      }

      async function NavFourPress_5(){
        alert('NavFourPress_5')
       // navigation.navigate('Entrar')
      }

      async function NavFivePress_5(){
        alert('NavFivePress_5')
       // navigation.navigate('Entrar')
      }



      const NavOne_5 = `
        <svg width="50" height="50" viewBox="0 0 640 512">
            <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            fill="url(#gradient)"
            d="M512.1 191l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1.1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0L552 6.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zm-10.5-58.8c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.7-82.4 14.3-52.8 52.8zM386.3 286.1l33.7 16.8c10.1 5.8 14.5 18.1 10.5 29.1-8.9 24.2-26.4 46.4-42.6 65.8-7.4 8.9-20.2 11.1-30.3 5.3l-29.1-16.8c-16 13.7-34.6 24.6-54.9 31.7v33.6c0 11.6-8.3 21.6-19.7 23.6-24.6 4.2-50.4 4.4-75.9 0-11.5-2-20-11.9-20-23.6V418c-20.3-7.2-38.9-18-54.9-31.7L74 403c-10 5.8-22.9 3.6-30.3-5.3-16.2-19.4-33.3-41.6-42.2-65.7-4-10.9.4-23.2 10.5-29.1l33.3-16.8c-3.9-20.9-3.9-42.4 0-63.4L12 205.8c-10.1-5.8-14.6-18.1-10.5-29 8.9-24.2 26-46.4 42.2-65.8 7.4-8.9 20.2-11.1 30.3-5.3l29.1 16.8c16-13.7 34.6-24.6 54.9-31.7V57.1c0-11.5 8.2-21.5 19.6-23.5 24.6-4.2 50.5-4.4 76-.1 11.5 2 20 11.9 20 23.6v33.6c20.3 7.2 38.9 18 54.9 31.7l29.1-16.8c10-5.8 22.9-3.6 30.3 5.3 16.2 19.4 33.2 41.6 42.1 65.8 4 10.9.1 23.2-10 29.1l-33.7 16.8c3.9 21 3.9 42.5 0 63.5zm-117.6 21.1c59.2-77-28.7-164.9-105.7-105.7-59.2 77 28.7 164.9 105.7 105.7zm243.4 182.7l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1.1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0l8.2-14.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zM501.6 431c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.6-82.4 14.3-52.8 52.8z"
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

      const NavTwo_5 = `
        <svg width="50" height="50" viewBox="0 0 448 512">
            <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            fill="url(#gradient)"
            d="M448 73.143v45.714C448 159.143 347.667 192 224 192S0 159.143 0 118.857V73.143C0 32.857 100.333 0 224 0s224 32.857 224 73.143zM448 176v102.857C448 319.143 347.667 352 224 352S0 319.143 0 278.857V176c48.125 33.143 136.208 48.572 224 48.572S399.874 209.143 448 176zm0 160v102.857C448 479.143 347.667 512 224 512S0 479.143 0 438.857V336c48.125 33.143 136.208 48.572 224 48.572S399.874 369.143 448 336z"
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

      const NavThree_5 = `
        <svg width="50" height="50" viewBox="0 0 24 24">
            <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            fill="url(#gradient)"
            d="M5.641 22.569l-5.641 1.431 1.397-5.674 4.244 4.243zm-2.829-5.657l4.243 4.243 16.945-16.913-4.242-4.242-16.946 16.912zm14.114-2.783l-1.414 1.414.708.708 1.414-1.414 1.414 1.414-2.122 2.122.707.707 2.122-2.122 1.417 1.385-2.829 2.829-4.232-4.233-1.415 1.413 5.648 5.648 5.656-5.657-5.643-5.643-1.431 1.429zm-9.887-4.261l-4.21-4.21 2.828-2.829 1.369 1.401-2.121 2.121.707.707 2.121-2.122 1.414 1.415-1.414 1.414.707.707 1.414-1.414 1.432-1.429-5.629-5.629-5.657 5.657 5.623 5.624 1.416-1.413z"
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

      const NavFour_5 = `
        <svg width="50" height="50" viewBox="0 0 24 24">
            <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            fill="url(#gradient)"
            d="M5.495 4c-1.375 0-1.375-2 0-2h16.505v-2h-17c-1.657 0-3 1.343-3 3v18c0 1.657 1.343 3 3 3h17v-20h-16.505z"
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

      const NavFive_5 = `
        <svg width="50" height="50" viewBox="0 0 24 24">
            <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            fill="url(#gradient)"
            d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7 14h-14v-4h14v4z"
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

          <SvgXml  style={styles.NavOne_5}
          onPress={NavOnePress_5}
          xml={NavOne_5}
          />

          <SvgXml  style={styles.NavTwo_5}
          onPress={NavTwoPress_5}
          xml={NavTwo_5}
          />

          <SvgXml  style={styles.NavThree_5}
          onPress={NavThreePress_5}
          xml={NavThree_5} />

          <SvgXml  style={styles.NavFour_5}
          onPress={NavFourPress_5}
          xml={NavFour_5} />


          <SvgXml  style={styles.NavFive_5}
          onPress={NavFivePress_5}
          xml={NavFive_5} />

        </View>
      )



    } else {
      return (<View style={styles.nav}></View>)
    }
  }
};


const styles = StyleSheet.create({
    nav: {
      backgroundColor: '#d9d9d9',
      height: 70,
      marginTop: 0,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },


    //para nav com 3 botoes
    NavOne_3:{
      flex: 1,
      height:70,
      margin:33.33
    },

    NavTwo_3:{
      flex: 1,
      height:70,
      margin:33.33
    },

    NavThree_3:{
      flex: 1,
      height:70,
      margin:33.33
    },

    //para nav com 5 botoes

    NavOne_5:{
      flex: 1,
      height:70,
      margin:15
    },

    NavTwo_5:{
      flex: 1,
      height:70,
      margin:15
    },

    NavThree_5:{
      flex: 1,
      height:70,
      margin:15
    },

    NavFour_5:{
      flex: 1,
      height:70,
      margin:15
    },

    NavFive_5:{
      flex: 1,
      height:70,
      margin:15
    },


});


export default Nav;
