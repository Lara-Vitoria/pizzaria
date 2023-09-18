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
        marginBottom: 40
    },
    iconTitulo: {
        marginHorizontal: 12
    },
    linha: {
        flexDirection: 'row',
    },
    campoDados: {
        position: 'absolute',
        top: height * .5,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 40,
        backgroundColor: '#FFF8C9',
        height: '100%',
        paddingTop: 30
    },
    input: {
        borderWidth: 1,
        borderColor: '#FA9C1C',
        borderRadius: 40,
        padding: 12,
        paddingLeft: 24,
        width: '46%',
        marginBottom: 12,
        marginHorizontal: 8
    },
    btnBack: {
        borderRadius: 40,
        backgroundColor: '#FA9C1C',
        padding: 12,
        width: '46%',
        marginTop: 24,
        marginHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnTxt: {
        color: 'white',
        fontSize: 18
    },
    icon: {
        marginRight: 12
    }
});

export default styles;