const Denuncias = require('../services/denunciasService')
const CpfValidador = require('../validators/cpfValidator')
const Geolocation = require('../middlewares/geolocations')
const FormValidator = require('../validators/formValidators')

const DenunciasController = {

    async all (req, res){

        let json = []

        let user = await Denuncias.getAll()

        for(let i in user){
            json.push({
                data: {
                    id: user[i].id,
                    latitude: user[i].latitude,
                    longitude: user[i].longitude,
                    denunciante: {
                        nome: user[i].nome,
                        cpf: user[i].cpf,
                    },
                    denuncia: {
                        titulo: user[i].titulo,
                        descricao: user[i].descricao,
                    },
                    endereco: {
                        logradouro: user[i].logradouro,
                        bairro: user[i].bairro,
                        cidade: user[i].cidade,
                        estado: user[i].estado,
                        pais: user[i].pais,
                        cep: user[i].cep
                    }
                }
            })
        }

        res.json(json)
    },

    async denuncia (req, res){

        let { nome, cpf } = req.body.denunciante
        let { titulo, descricao } = req.body.denuncia
        let latitude = req.body.latitude
        let longitude = req.body.longitude

        /*
            Verifica se os campos estão vazios de forma simples, uma maneira de brincar com a logica
            Mas no dia dia temos bibliotecas como express-validator para usar
        */  
        let validator = await FormValidator.isEmpty(nome, cpf, titulo, descricao, latitude, longitude)

        if(validator){
            res.json({code: 400, message: `${validator}`})
            return;
        }

        // Verifica se o cep é valido usando a lógica é uma alternativa 
        // quando não temos uma enorme base de dados para consultar
        let isValidCpf = CpfValidador.isValidCPF(cpf)

        // Caso retorno false cpf invalido
        if(!isValidCpf){
            res.json({code: 400, message: 'CNPJ/CPF Invalido'})
            return
        }

        // Busca o endereço do usuario fazendo um request em www.mapquestapi.com/geocoding
        let location = await Geolocation.getLocation(latitude, longitude)

        // Location.status retorna false quando não encontramos endereço
        if(location.status == false){ 
            res.json({
                error: {
                  message: "Endereço não encontrado para essa localidade.",
                  code: "02"
                }
            })
            return
        }

        // Location.error retorna false quando não é possivel obter resposta em www.mapquestapi.com/geocoding
        if(location.error == false){ 
            res.json({
                error: {
                  message: "Internal Server Error api mapquest.com",
                  code: 500
                }
            })
            return
        }

        // Após todas as verificaçoes e de posse das informaçoes validadas é enviado pra excução do INSERT
        let user = await Denuncias.add(nome, cpf, titulo, descricao, latitude, longitude, location)

        // Se user retornar false nenhuma linha foi inserida no Banco
        if(!user){
            res.json({
                error: {
                    message: 'Request inválido',
                    code: "01"
                }
            })
            return
        }

        // Informaçoes inseridas com sucesso é hora de montar o json reponse para o front
        let result = {
            data: {
                id: user.id,
                latitude: user.latitude,
                longitude: user.longitude,
                denunciante: {
                    nome: user.nome,
                    cpf: user.cpf,
                },
                denuncia: {
                    titulo: user.titulo,
                    descricao: user.descricao,
                },
                endereco: {
                    logradouro: user.logradouro,
                    bairro: user.bairro,
                    cidade: user.cidade,
                    estado: user.estado,
                    pais: user.pais,
                    cep: user.cep
                }
            }
        }

        res.status(201).json({result})
    }

}

module.exports = DenunciasController