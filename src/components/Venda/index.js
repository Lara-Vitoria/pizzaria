import { Text, View, TouchableOpacity, StatusBar, Image, Alert, ScrollView } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import styles from './styles';
import { useState, useEffect } from 'react';
import Produto from '../Produto';
import {
    excluiProduto,
    obtemTodosProdutos,
    createTable,
    adicionaVenda
} from '../../services/dbService';

// let produtos = [
//     { "codigo": "1", "descricao": "Marguerita", "preco": 10 },
//     { "codigo": "2", "descricao": "Portuguesa", "preco": 20 },
//     { "codigo": "3", "descricao": "Brócolis", "preco": 30 },
//     { "codigo": "4", "descricao": "Mussarela", "preco": 40 },
//     { "codigo": "5", "descricao": "Mussarela", "preco": 40 },
//     { "codigo": "6", "descricao": "Mussarela", "preco": 40 },
//     { "codigo": "7", "descricao": "Mussarela", "preco": 40 },
//     { "codigo": "8", "descricao": "Mussarela ", "preco": 40 },
// ]
export default function Venda({ navigation }) {
    const [id, setId] = useState(0);
    const [totalGeral, setTotalGeral] = useState(0);
    const [produtosSelecionados, setProdutosSelecionados] = useState([]);
    const [produtos, setProdutos] = useState([]);
    let tabelasCriadas = false;

    async function processamentoUseEffect() {
        if (!tabelasCriadas) {
            console.log("Verificando necessidade de criar tabelas...");
            tabelasCriadas = true;
            await createTable();
        }

        console.log("UseEffect...");
        await carregaDados();
    }

    useEffect(
        () => {
            console.log('executando useffect');
            processamentoUseEffect(); //necessário método pois aqui não pode utilizar await...
        }, []);

    const atualizarTotalGeral = (valorProduto) => {
        setTotalGeral(totalGeral + valorProduto);
    };
    
    function createUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
    }

    async function salvaDados() {

        let novoRegistro = id == undefined;

        let obj = {
            id: novoRegistro ? createUniqueId() : id,
            data: Date.now(), 
            produtos: produtos,
            preco: totalGeral
        };

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
            Alert.alert(e);
        }
    }

    const mostrarProdutosSelecionados = () => {
        const selecionados = produtos.filter((produto) => produto.quantidade > 0);
        setProdutosSelecionados(selecionados);

        Alert.alert(produtosSelecionados)
        // Abra um modal ou navegue para outra tela para mostrar os produtos selecionados.
        // navigation.navigate('ProdutosSelecionados', { produtosSelecionados: selecionados });
    };

    async function removeProduto(codigo) {
        try {
            await excluiProduto(codigo);
            await carregaDados();
            Alert.alert('Produto excluido com sucesso!');
        } catch (e) {
            Alert.alert(e);
        }
    }

    async function carregaDados() {
        try {
            let produtos = await obtemTodosProdutos()
            setProdutos(produtos);
        } catch (e) {
            Alert.alert(e.toString());
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

            <View contentContainerStyle={{ flex: 1 }}>

                <ScrollView >
                    {
                        produtos.map((produto, index) => (
                            <Produto produto={produto} key={index.toString()} removerElemento={removeProduto}
                                onValorTotalChange={atualizarTotalGeral} navigation={navigation} />
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
    );
}