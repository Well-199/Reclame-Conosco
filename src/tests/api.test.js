const request = require('supertest')
const server = require('../server')

describe('Test My server', () => {

    // it('should get main route', async () => {
    //     const res = await request(server)
    //     .get('/v1/denuncias')
        
    //     expect(res.body).toHaveProperty('json')
    // })

    it('should post main route', async () => {
        const res = await request(server)
        .post('/v1/denuncias')
        .send({
            latitude: "-23.5617836",
            longitude: "-46.6579964",
            denunciante: {
                nome: "Amadeu da Silva",
                cpf: ""// insira um cpf valido ex: "37453234526"
            },
            denuncia: {
                titulo: "Esgoto a céu aberto",
                descricao: "Existe um esgoto a céu aberto nesta localidade."
            }
        })
        
        expect(res.body).toHaveProperty('result')
    })
})

