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
        marginBottom: 10
    },
    linhaContorno: {
        width: width,
        height: height * .15,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: .5,
        borderColor: '#FA9C1C',
        marginTop: 16,
        paddingTop: 20,
    },
    linhaContornoTitulo: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: .5,
        borderColor: '#FA9C1C',
        marginTop: 16,
        paddingTop: 20,
    },
    cellTitulo: {
        flex: 1,
        width: width,
        textAlign: 'center',
        color: '#BE2A25',
        fontWeight: 'bold'
    },
    cell: {
        flex: 1,
        width: width,
        textAlign: 'center',
        color: '#FA9C1C',
    },
    produtoColumn: {
        flex: 1,
        flexDirection: 'column',
    },
    produtoCell: {
        textAlign: 'center',
        color: '#FA9C1C',
    },
    linha: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    btnVoltar: {
        width: '45%',
        height: 70,
        borderWidth: 1,
        borderColor: '#BE2A25',
        borderRadius: 30,
        backgroundColor: '#FA9C1C',
        alignItems: 'center',
        top: height * .4
    },
    texto: {
        color: '#BE2A25',
        fontSize: 16,
        marginLeft: 12
    }
});

export default styles;