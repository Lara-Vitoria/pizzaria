import * as SQLite from 'expo-sqlite'

export function getDbConnection() {
    const cx = SQLite.openDatabase('dbPizzaria.db')
    return cx
}

export async function createTable() {
    return new Promise((resolve, reject) => {
        const queryProdutos = `CREATE TABLE IF NOT EXISTS tbProdutos
        (
            id TEXT NOT NULL PRIMARY KEY,
            codigo TEXT NOT NULL,
            preco FLOAT,
            descricao TEXT NOT NULL
        )`

        const queryVendas = `CREATE TABLE IF NOT EXISTS tbVendas
        (
            id TEXT NOT NULL PRIMARY KEY,
            data TEXT NOT NULL,
            produtos TEXT NOT NULL,
            preco TEXT NOT NULL
        )`

        let dbCx = getDbConnection()

        dbCx.transaction(tx => {
            tx.executeSql(queryProdutos)
            tx.executeSql(queryVendas)
            resolve(true)
        },
            error => {
                console.log(error)
                resolve(false)
            }
        )
    })
}

export async function dropTables() {
    return new Promise((resolve, reject) => {
        const dropQueryProdutos = 'DROP TABLE IF EXISTS tbProdutos';
        const dropQueryVendas = 'DROP TABLE IF EXISTS tbVendas';

        let dbCx = getDbConnection();

        dbCx.transaction(
            (tx) => {
                tx.executeSql(dropQueryProdutos);
                tx.executeSql(dropQueryVendas);
                resolve(true);
            },
            (error) => {
                console.log(error);
                resolve(false);
            }
        );
    });
}

export function obtemTodasVendas() {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection()
        dbCx.transaction(tx => {
            let query = 'select * from tbVendas'
            tx.executeSql(query, [],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            id: registros.rows.item(n).id,
                            data: registros.rows.item(n).data,
                            produtos: registros.rows.item(n).produtos,
                            preco: registros.rows.item(n).preco,
                        }
                        retorno.push(obj)
                    }
                    resolve(retorno)
                })
        },
            error => {
                console.log(error)
                resolve([])
            }
        )
    }
    )
}

export function obtemTodosProdutos() {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection()
        dbCx.transaction(tx => {
            let query = 'select * from tbProdutos'
            tx.executeSql(query, [],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            id: registros.rows.item(n).id,
                            codigo: registros.rows.item(n).codigo,
                            preco: registros.rows.item(n).preco,
                            descricao: registros.rows.item(n).descricao
                        }
                        retorno.push(obj)
                    }
                    resolve(retorno)
                })
        },
            error => {
                console.log(error)
                resolve([])
            }
        )
    }
    )
}

export function adicionaVenda(venda) {

    console.log(venda.id)

    return new Promise((resolve, reject) => {
        let query = 'insert into tbVendas (id, data, produtos, preco) values (?,?,?,?)'
        let dbCx = getDbConnection()

        dbCx.transaction(tx => {
            tx.executeSql(query, [venda.id, venda.data, venda.produtos, venda.preco],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0)
                })
        },
            error => {
                console.log(error)
                resolve(false)
            }
        )
    }
    )
}

export function adicionaProduto(produto) {

    return new Promise((resolve, reject) => {
        let query = 'insert into tbProdutos (id, codigo, preco, descricao) values (?,?,?,?)'
        let dbCx = getDbConnection()

        dbCx.transaction(tx => {
            tx.executeSql(query, [produto.id, produto.codigo, produto.preco, produto.descricao],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0)
                })
        },
            error => {
                console.log(error)
                resolve(false)
            }
        )
    }
    )
}

export function alteraProduto(produto) {
    console.log(produto)
    return new Promise((resolve, reject) => {
        let query = 'update tbProdutos set codigo=?, preco=?, descricao=? where id=?'
        let dbCx = getDbConnection()

        dbCx.transaction(tx => {
            tx.executeSql(query, [produto.codigo, produto.preco, produto.descricao, produto.id],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0)
                })
        },
            error => {
                console.log(error)
                resolve(false)
            }
        )
    }
    )
}

export function excluiProduto(id) {
    console.log('Excluindo produto: ' + id)
    return new Promise((resolve, reject) => {
        let query = 'delete from tbProdutos where id=?'
        let dbCx = getDbConnection()

        dbCx.transaction(tx => {
            tx.executeSql(query, [id],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0)
                })
        },
            error => {
                console.log(error)
                resolve(false)
            }
        )
    }
    )
}

export function excluiTodosProdutos() {
    console.log("Excluindo todos os produtos")
    return new Promise((resolve, reject) => {
        let query = 'delete from tbProdutos'
        let dbCx = getDbConnection()
        dbCx.transaction(tx => {
            tx.executeSql(query, [],
                (tx, resultado) => resolve(resultado.rowsAffected > 0)
            )
        },
            error => {
                console.log(error)
                resolve(false)
            }
        )
    }
    )
}
