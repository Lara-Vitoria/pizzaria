import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    lista: {
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
    },
    linhaContorno: {
        width: width * .95,
        height: height * .15,
        //top: height * .05,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: .5,
        borderColor: '#FA9C1C',
        marginTop: 16,
        //paddingTop: 20,
    },
    imgAlinhamento: {
        paddingTop: 20,
        height: height * .15,
    },
    icon: {
        marginBottom: 20
    },
    texto: {
        color: '#FA9C1C',
        fontFamily: 'sans-serif',
        letterSpacing: 2.5,
        fontSize: 14,
        marginLeft: '24%'
    },
    textoDesc: {
        marginBottom: '8%',
        fontSize: 16
    },
    textoPreco: {
        fontWeight: 'bold',
        letterSpacing: 3,
    },
    textoAlinhamento: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: width * .4,
    },
    btnAddItem: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 40,
        backgroundColor: '#FA9C1C',
        height: '40%',
        width: '25%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginLeft: '20%'
    },
    btn: {
        width: '30%',
        marginLeft: '15%'
    },
    btnTexto: {
        color: '#BE2A25',
        fontSize: 20,
    }
});

export default styles;