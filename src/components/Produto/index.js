import { useState, useEffect } from 'react';
import { Text, View, PanResponder, TouchableOpacity, Alert, Image } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import styles from './styles';

export default function Produto({ produto, removerElemento, onValorTotalChange, navigation }) {
    const [quantidade, setQuantidade] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);
    const [showIcons, setShowIcons] = useState(false);

    useEffect(() => {
        const novoValorTotal = quantidade * produto.preco;
        setValorTotal(novoValorTotal);
        onValorTotalChange(novoValorTotal);
    }, []);

    const incrementarQuantidade = () => {
        setQuantidade(quantidade + 1);
        onValorTotalChange(produto.preco);
    };

    const decrementarQuantidade = () => {
        if (quantidade == 0) {
            Alert.alert("Não existe produto a ser retirado");
            return;
        }

        setQuantidade(quantidade - 1);
        onValorTotalChange(-produto.preco);
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gestureState) => {
            if (gestureState.dx > 1) {
                setShowIcons(true);
            }
            if (gestureState.dx < -1) {
                setShowIcons(false);
            }
        },
    });
    return (
        <View style={styles.container}>
            <View style={styles.linhaContorno}>
                <View style={{ padding: 16, }} {...panResponder.panHandlers} >
                    {showIcons && (
                        <View style={[styles.imgAlinhamento, { marginRight: '10%' }]}>
                            <TouchableOpacity onPress={() => navigation.navigate('CadastroProduto', produto)}>
                                <AntDesign style={styles.icon} name="edit" size={24} color="#FA9C1C" />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => removerElemento(produto.codigo)}>
                                <AntDesign style={styles.icon} name="delete" size={32} color='#FA9C1C' />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <View style={styles.textoAlinhamento}>
                    <Text style={[styles.texto, styles.textoDesc]}> {produto.descricao} </Text>
                    <Text style={[styles.texto, styles.textoPreco]}> R$ {produto.preco} </Text>
                </View>

                <View style={styles.btnAddItem}>
                    <TouchableOpacity onPress={decrementarQuantidade} style={styles.btn}>
                        <Text style={styles.btnTexto}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.btnTexto}> {quantidade} </Text>
                    <TouchableOpacity onPress={incrementarQuantidade} style={styles.btn}>
                        <Text style={styles.btnTexto}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}