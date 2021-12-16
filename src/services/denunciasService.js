const db = require('../database/pg')

const Denuncias = {

    // Select com SQL no padrão Postgres abaixo deixei um exemplo usando Promisse usando Promise
    getAll: async () => {
        const { rows } = await db.query(`SELECT * FROM denunciantes`)
        return rows
    },

    // Insert no Postgres abaixo deixei um exemplo de INSERT trantando melhor os erros
    add: async (nome, cpf, titulo, descricao, latitude, longitude, location) => {
        const { rows } = await db.query(`
            INSERT INTO denunciantes
                (nome, cpf, titulo, descricao, latitude, longitude, logradouro, bairro, cidade, estado, pais, cep)
                VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
            [
                nome, cpf, titulo, descricao, 
                latitude, longitude, location.logradouro,
                location.bairro, location.cidade, location.estado,
                location.pais, location.cep,
            ]
        )
        return rows[0]
    },

    /*------------------------------------------------------------------------------------------------*/

    // Select com SQL e usando Promise
    // getAll: () => {
    //     return new Promise((resolve, reject) => {

    //         db.query('SELECT * FROM denunciantes', (error, results) => {
    //             if(error) { reject(error); return;}
    //             resolve(results.rows)
    //         })

    //     })
    // },

    // INSERT com SQL e usando async await
    // add: async (nome, cpf, titulo, descricao, latitude, longitude, location) => {
    //     try{
    //         const sql = `
    //             INSERT INTO 
    //                 denunciantes(nome, cpf, titulo, descricao, latitude, longitude, logradouro, bairro, cidade, estado, pais, cep) 
    //             VALUES
    //                 ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`
    //         const values = [
    //             nome, cpf, titulo, descricao, 
    //             latitude, longitude, location.logradouro,
    //             location.bairro, location.cidade, location.estado,
    //             location.pais, location.cep,
    //         ]  
    //         const res = await db.query(sql, values)
    //         return res.rows[0]
    //     }
    //     catch(error){
    //         return error
    //     }
    // }
}

module.exports = Denuncias