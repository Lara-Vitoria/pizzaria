import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        paddingTop: 56,
    },
    titulo: {
        color: '#FA9C1C',
        fontFamily: 'sans-serif',
        letterSpacing: 2.5,
        fontSize: 28,
    },
    icon: {
        left: width * .3,
    },
    lista: {
        flex: 1,
        height: height,
    },
    dadosBack: {
        position: 'absolute',
        bottom: 0,
        width: width,
        backgroundColor: '#000',
        paddingTop: 16
    },
    linha: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    btnCarrinho: {
        width: '45%',
        height: 70,
        borderWidth: 1,
        borderColor: '#BE2A25',
        borderRadius: 30,
        backgroundColor: '#FA9C1C',
        alignItems: 'center',
    },
    texto: {
        color: '#BE2A25',
        fontSize: 16
    }
});

export default styles;