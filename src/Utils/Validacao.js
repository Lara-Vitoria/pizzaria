export function verficaCodigo(cod) {
    const numeCod = parseInt(cod);

    return isNaN(numeCod) || numeCod < 0;
}

export function verficaPreco(preco) {
    const numePreco = parseFloat(preco);

    return isNaN(numePreco) || numePreco < 0;
}

export function verficaDescricao(descricao) {
    return descricao == null || descricao == '';
}