import { useState, useEffect } from 'react'
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StatusBar,
    Alert,
    Keyboard,
    Image
} from 'react-native'
import {
    dropTables,
    createTable,
    adicionaProduto,
    obtemTodosProdutos,
    alteraProduto,
} from '../../services/dbService'
import { AntDesign, Ionicons } from '@expo/vector-icons'

import styles from './styles'
import * as Validacao from '../../Utils/Validacao'
export default function CadastroProduto({ navigation }) {

    let props = navigation.state.params;

    const [id, setId] = useState(props !== undefined ? props.id : undefined)
    const [codigo, setCodigo] = useState(props !== undefined ? props.codigo : '')
    const [descricao, setDescricao] = useState(props !== undefined ? props.descricao : '')
    const [preco, setPreco] = useState(props !== undefined ? props.preco.toString() : 0)
    const [produtos, setProdutos] = useState([])


    let tabelasCriadas = false

    async function processamentoUseEffect() {
        dropTables()
        if (!tabelasCriadas) {
            console.log("Verificando necessidade de criar tabelas...")
            tabelasCriadas = true
            await createTable()
        }

        console.log("UseEffect...")
        // await carregaDados();
    }

    useEffect(
        () => {
            console.log('executando useffect')
            processamentoUseEffect() //necessário método pois aqui não pode utilizar await...
        }, [])


    function createUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(0, 2)
    }

    function verificaCampos() {
        if (Validacao.verficaCodigo(codigo)) {
            Alert.alert("Codigo deve ser maior que 0")
            return
        }

        if (Validacao.verficaPreco(preco)) {
            Alert.alert("Preço deve ser maior que 0")
            return
        }

        if (Validacao.verficaDescricao(descricao)) {
            Alert.alert("Descrição deve ser preenchida")
            return
        }

        else { salvaDados() }
    }

    async function salvaDados() {
        let novoRegistro = id == undefined

        let obj = {
            id: novoRegistro ? createUniqueId() : id,
            codigo: codigo,
            preco: preco,
            descricao: descricao,
        }



        try {

            if (novoRegistro) {
                let resposta = (await adicionaProduto(obj))
                console.log("novo registro")

                if (resposta)
                    Alert.alert('adicionado com sucesso!')
                else
                    Alert.alert('Erro ao salvar dados!')
            }
            else {
                editar(props.id)
                let resposta = await alteraProduto(obj)
                if (resposta)
                    Alert.alert('Alterado com sucesso!')
                else
                    Alert.alert('Erro ao editar produto!')
            }

            Keyboard.dismiss()
            limparCampos()
            navigation.navigate('Venda')
            await carregaDados()
        } catch (e) {
            Alert.alert(e)
        }
    }

    async function carregaDados() {
        try {
            let produtos = await obtemTodosProdutos()
            setProdutos(produtos)
        } catch (e) {
            Alert.alert(e.toString())
        }
    }

    function editar(identificador) {
        const produto = produtos.find(produto => produto.id == identificador)

        if (produto != undefined) {
            setId(produto.id)
            setCodigo(produto.codigo)
            setDescricao(produto.descricao)
            setPreco(produto.preco)
        }

        console.log(produto)
    }

    function limparCampos() {
        setCodigo('')
        setDescricao('')
        setPreco('')

        Keyboard.dismiss()
    }

    return (
        <View style={styles.container}>

            <View style={styles.linha}>
                <Text style={styles.titulo}>Cadastro de Produto</Text>
            </View>

            <View style={styles.campoDados}>
                <View style={styles.linha}>
                    <TextInput style={styles.input} placeholder='Codigo' placeholderTextColor='#FA9C1C'
                        value={codigo} keyboardType='numeric'
                        onChangeText={(codigo) => setCodigo(codigo)} />

                    <TextInput style={styles.input} value={preco} placeholderTextColor='#FA9C1C'
                        placeholder='Preço Unitário' keyboardType='decimal-pad'
                        onChangeText={(preco) => setPreco(preco)} />

                </View>

                <View style={styles.linha}>
                    <TextInput style={[styles.input, { width: '96%' }]} value={descricao}
                        placeholder='Descrição' placeholderTextColor='#FA9C1C'
                        onChangeText={(descricao) => setDescricao(descricao)} />
                </View>

                <View style={styles.linha}>
                    <TouchableOpacity onPress={() => verificaCampos()}
                        style={[styles.linha, styles.btnBack]}>
                        <AntDesign style={styles.icon} name="save" size={18} color="white" />
                        <Text style={styles.btnTxt}>Salvar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.linha, styles.btnBack, { backgroundColor: '#BE2A25' }]}
                        onPress={() => limparCampos()}>
                        <Ionicons style={styles.icon} name="backspace-outline" size={18} color="white" />
                        <Text style={styles.btnTxt}>Limpar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <Image source={require('../../../assets/img_steve_pizza.png')} />
            </View>

            <StatusBar style="auto" />
        </View>
    )
}