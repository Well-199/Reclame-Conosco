
const FormValidator = {

    async isEmpty (nome, cpf, titulo, descricao, latitude, longitude){

        let message = false

        if(!nome){
            message = 'Nome não enviado'
            return message
        }

        if(!cpf){
            message = 'Cpf não enviado'
            return message
        }

        if(!titulo){
            message = 'Titulo não enviado'
            return message
        }

        if(!descricao){
            message = 'Descrição não enviado'
            return message
        }

        if(!latitude){
            message = 'Latitude não enviado'
            return message
        }

        if(!longitude){
            message = 'Longitude não enviado'
            return message
        }

        return message
    }

}

module.exports = FormValidator