import * as SQLite from 'expo-sqlite';

export function getDbConnection() {
    const cx = SQLite.openDatabase('dbPizzaria.db');
    return cx;
}

export async function createTable() {
    return new Promise((resolve, reject) => {
        const query = `CREATE TABLE IF NOT EXISTS tbProdutos
        (
            id text not null primary key,
            codigo text not null,
            preco text not null,          
            descricao text not null          
        )`;

        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query);
            resolve(true);
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};

export function obtemTodosProdutos() {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbProdutos';
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
                        retorno.push(obj);
                    }
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
}

export function adicionaProduto(produto) {

    return new Promise((resolve, reject) => {
        let query = 'insert into tbProdutos (id, codigo, preco, descricao) values (?,?,?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [produto.id, produto.codigo, produto.preco, produto.descricao],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}

export function alteraProduto(produto) {
    console.log('Editar produto');
    return new Promise((resolve, reject) => {
        let query = 'update tbProdutos set codigo=?, preco=?, descricao=? where id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [produto.codigo, produto.preco, produto.descricao, produto.id],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}

export function excluiProduto(id) {
    console.log('Excluindo produto: ' + id);
    return new Promise((resolve, reject) => {
        let query = 'delete from tbProdutos where id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [id],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}

export function excluiTodosProdutos() {
    console.log("Excluindo todos os produtos");
    return new Promise((resolve, reject) => {
        let query = 'delete from tbProdutos';
        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            tx.executeSql(query, [],
                (tx, resultado) => resolve(resultado.rowsAffected > 0)
            );
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    }
    );
}
