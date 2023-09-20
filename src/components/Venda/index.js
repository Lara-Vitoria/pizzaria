import { Text, View, TouchableOpacity, StatusBar, Image, Alert, ScrollView, Keyboard } from 'react-native'
import { AntDesign, Ionicons } from '@expo/vector-icons'

import styles from './styles'
import { useState, useEffect } from 'react'
import Produto from '../Produto'
import {
    excluiProduto,
    obtemTodosProdutos,
    createTable,
    adicionaVenda
} from '../../services/dbService'

export default function Venda({ navigation }) {
    const [id, setId] = useState(0)
    const [totalGeral, setTotalGeral] = useState(0)
    const [listaProdutos, setListaProdutos] = useState([])
    const [produtos, setProdutos] = useState([])
    let tabelasCriadas = false

    async function processamentoUseEffect() {
        if (!tabelasCriadas) {
            console.log("Verificando necessidade de criar tabelas...")
            tabelasCriadas = true
            await createTable()
        }

        console.log("UseEffect...")
        await carregaDados()
    }

    useEffect(
        () => {
            console.log('executando useffect')
            processamentoUseEffect() //necessário método pois aqui não pode utilizar await...
        }, [])

    const atualizarTotalGeral = (valorProduto) => {
        setTotalGeral(totalGeral + valorProduto)
    }

    function geraDataAtual() {
        const today = new Date();

        const year = today.getFullYear().toString();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');  // Os meses começam de 0 (janeiro) a 11 (dezembro)
        const day = today.getDate().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;
    }

    const atualizaLista = (acao, produto) => {

        console.log(acao)
        console.log(produto)

        if (acao === 'adicionar') {
            setListaProdutos(produto + ', ' + listaProdutos)
        } else if (acao === 'remover') {
            setListaProdutos((prevLista) =>
                prevLista.replace(new RegExp(produto + ',? ?', 'g'), '')
            );
        }

        console.log("lista: ", listaProdutos)
    }

    function createUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(0, 2)
    }

    async function salvaDados() {

        let nsei = createUniqueId()

        const newid = nsei.toString()

        let obj = {
            id: newid,
            data: geraDataAtual(),
            produtos: listaProdutos,
            preco: totalGeral
        }

        console.log(listaProdutos)

        try {
            let resposta = (await adicionaVenda(obj));
            console.log(resposta);

            if (resposta)
                Alert.alert('adicionado com sucesso!');
            else
                Alert.alert('Ocorreu um erro!');

            Keyboard.dismiss();
            navigation.navigate('ListaVendas');

        } catch (e) {
            Alert.alert('Error:', e.message)
        }
    }

    const mostrarProdutosSelecionados = () => {
        const selecionados = produtos.filter((produto) => produto.quantidade > 0)
        setProdutosSelecionados(selecionados)

        Alert.alert(produtosSelecionados)
        // Abra um modal ou navegue para outra tela para mostrar os produtos selecionados.
        // navigation.navigate('ProdutosSelecionados', { produtosSelecionados: selecionados });
    }

    async function removeProduto(codigo) {
        try {
            await excluiProduto(codigo)
            await carregaDados()
            Alert.alert('Produto excluido com sucesso!')
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

    return (
        <View style={styles.container}>

            <View style={styles.linha}>
                <Text style={styles.titulo}>Pedido</Text>
                <TouchableOpacity style={styles.icon}
                    onPress={() => navigation.navigate('CadastroProduto')}>
                    <Ionicons name="ios-add-circle-outline" size={40} color="#FA9C1C" />
                </TouchableOpacity>
            </View>

            {
                produtos.length == 0
                    ? <Text style={styles.textoSemCadastro}>Não há produtos cadastrados</Text>
                    : null
            }
            <View contentContainerStyle={{ flex: 1 }}>
                <ScrollView >
                    {
                        produtos.map((produto, index) => (
                            <Produto produto={produto} key={index.toString()} removerElemento={removeProduto}
                                onValorTotalChange={atualizarTotalGeral} onProdutosChange={atualizaLista}
                                navigation={navigation} />
                        ))
                    }
                </ScrollView>
            </View>

            <View style={styles.dadosBack}>
                <View style={styles.linha}>

                    <TouchableOpacity onPress={() => salvaDados()} style={[styles.btnCarrinho, styles.linha]}>
                        {
                            totalGeral > 0
                                ? <Text style={styles.texto}>Valor Total: {totalGeral}</Text>
                                : null
                        }
                        <AntDesign name="shoppingcart" size={32} color='#BE2A25' />
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    )
}