import moment from 'moment'

class DummyApi { 
    static getData(request) {
        let result = null
        switch (request) {
            case 'process-list':
                result = processList
                break
        default:
            break
        }
        return result
    }

    static postData(request, info){
        let result = null
        switch (request) {
            case 'process-create':
                result = processCreateResponse
                break
        default:
            break
        }
        return result
    }
}

const processList = [
    {
        id:1,
        number: 1,
        year: 2018,
        end: moment(new Date(2018,11,3))._d,
        description: "Observações do primeiro processo."
    },
    {
        id:2,
        number: 2,
        year: 2018,
        end: moment(new Date(2018,11,25))._d,
        description: "Observações do segundo processo."
    },
    {
        id:3,
        number: 3,
        year: 2018,
        end: moment(new Date(2018,11,26))._d,
        description: "Observações do terceiro processo."
    }
]

const processCreateResponse = {
    ok: false,
    message: {
        "code": "auth-05",
        "userMessage": "Mensagem de erro do servidor!",
        "devMessage": {}
    }
}

export default DummyApi


