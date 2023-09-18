import { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import styles from './styles';

const dados = [
    {
        codigo: '1',
        data: '2023-09-16',
        produtos: ['Produto 1', 'Produto 2', 'Produto 3',],
        preco: 10
    },
    {
        codigo: '2',
        data: '2023-09-17',
        produtos: ['Produto 4'],
        preco: 80
    },
];
export default function ListaVendas({ navigation }) {

    return (

        <View style={styles.container}>

            <View>
                <Text style={styles.titulo}>Vendas</Text>
            </View>

            <View style={styles.linhaContornoTitulo}>
                <Text style={styles.cellTitulo}> Codigo </Text>
                <Text style={styles.cellTitulo}> Data </Text>
                <Text style={styles.cellTitulo}> Produto </Text>
                <Text style={styles.cellTitulo}> Preco </Text>
            </View>

            {dados.map((item, index) => (
                <View key={index} style={styles.linhaContorno}>
                    <Text style={styles.cell}>{item.codigo}</Text>
                    <Text style={styles.cell}>{item.data}</Text>
                    <View style={styles.produtoColumn}>
                        {item.produtos.map((produto, produtoIndex) => (
                            <Text key={produtoIndex} style={styles.produtoCell}>
                                {produto}
                            </Text>
                        ))}
                    </View>
                    <Text style={styles.cell}>{item.preco}</Text>
                </View>
            ))}

            <TouchableOpacity onPress={() => navigation.navigate('Venda')} style={[styles.linha, styles.btnVoltar]}>
                <AntDesign name="back" size={24} color="#BE2A25" />
                <Text style={styles.texto}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}