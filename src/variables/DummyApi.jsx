
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

    static putData(request, info){
        let result = null
        switch (request) {
            case 'process-update':
                result = processUpdateResponse
                break
        default:
            break
        }
        return result
    }

    static delData(request, info){
        let result = null
        switch (request) {
            case 'process-delete':
                result = processDeleteResponse
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
        end: new Date(2018,11,3),
        description: "Observações do primeiro processo.",
        createdAt: new Date("2018-09-03T21:23:41.000Z"),
        updatedAt: new Date("2018-09-03T21:23:41.000Z")
    },
    {
        id:2,
        number: 2,
        year: 2018,
        end: new Date(2018,11,25),
        description: "Observações do segundo processo.",
        createdAt: new Date("2018-09-03T21:23:41.000Z"),
        updatedAt: new Date("2018-09-03T21:23:41.000Z")
    },
    {
        id:3,
        number: 3,
        year: 2018,
        end: new Date(2018,11,26),
        description: "Observações do terceiro processo.",
        createdAt: new Date("2018-09-03T21:23:41.000Z"),
        updatedAt: new Date("2018-09-03T21:23:41.000Z")
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

const processUpdateResponse = {
    ok: false,
    message: {
        "code": "auth-05",
        "userMessage": "Mensagem de erro do servidor!",
        "devMessage": {}
    }
}

const processDeleteResponse = {
    ok: false,
    message: {
        "code": "auth-05",
        "userMessage": "Mensagem de erro do servidor!",
        "devMessage": {}
    }
}

export default DummyApi


