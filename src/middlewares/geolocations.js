const axios = require('axios')
const { setRedis, getRedis } = require('./ioredis')

const Geolocation = {

    async getLocation (latitude, logitude) {

        let endereco = {}

        const locationRedis = await getRedis(`${latitude},${logitude}`)
        
        // Primeira busca é no cache caso retorne null é realizado o request na api
        if(locationRedis != null){

            const cacheLocation = JSON.parse(locationRedis)
            
            endereco = cacheLocation
            return endereco
        }

        let urlLocation = process.env.URL_LOCATION
        let apiKey = process.env.API_KEY
        let url = `${urlLocation}key=${apiKey}&location=${latitude},${logitude}`

        try{
            await axios.get(url)
                .then((response) => {

                    const locations = response.data.results[0].locations

                    // Caso o array retorne vazio não foi possivel encontrar o endereço
                    if(locations.length == 0){
                        endereco.status = false
                    }
                    
                    const data = response.data.results[0].locations

                    for(let i in data){
                        endereco.logradouro = data[i].street
                        endereco.bairro = data[i].adminArea6
                        endereco.cidade = data[i].adminArea5
                        endereco.estado = data[i].adminArea3
                        endereco.pais = data[i].adminArea1
                        endereco.cep = data[i].postalCode
                    }
                    
                })

                // Se o endereço for valido a latitude e longitude passa a ser a key do endereço em cache
                await setRedis(`${latitude},${logitude}`, JSON.stringify(endereco))
        }
        catch(error){
            // Caso a requisição não tenha sucesso por erro no servidor mapquest.com
            endereco.error = false
        }
        
        return endereco
    }
}

module.exports = Geolocation