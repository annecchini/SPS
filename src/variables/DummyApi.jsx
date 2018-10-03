
class DummyApi {
    static getData(request, info) {
        let result = null
        switch (request) {
            case 'process-list':
                result = processList
                break
            case 'user-info':
                result = userInfo(info)
                break
            default:
                break
        }
        return result
    }

    static postData(request, info) {
        let result = null
        switch (request) {
            case 'process-create':
                result = processCreateResponse
                break
            case 'user-create':
                result = userCreateResponse(info)
                break
            case 'auth-confirm':
                result = authConfirmResponse(info)
                break
            case 'auth-login':
                result = authLogin(info)
                break
            case 'auth-recover':
                result = authRecover(info)
                break
            default:
                break
        }
        return result
    }

    static putData(request, info) {
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

    static delData(request, info) {
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
        id: 1,
        number: 1,
        year: 2018,
        end: new Date(2018, 11, 3),
        description: "Observações do primeiro processo.",
        createdAt: new Date("2018-09-03T21:23:41.000Z"),
        updatedAt: new Date("2018-09-03T21:23:41.000Z")
    },
    {
        id: 2,
        number: 2,
        year: 2018,
        end: new Date(2018, 11, 25),
        description: "Observações do segundo processo.",
        createdAt: new Date("2018-09-03T21:23:41.000Z"),
        updatedAt: new Date("2018-09-03T21:23:41.000Z")
    },
    {
        id: 3,
        number: 3,
        year: 2018,
        end: new Date(2018, 11, 26),
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

function userCreateResponse(info) {
    return {
        ok: false,
        message: {
            "code": "auth-05",
            "userMessage": "Mensagem de erro do servidor!",
            "devMessage": {}
        }
    }
}

function userInfo(token) {
    if (token === 'a0b1c2d3e4f5') {
        return {
            ok: true,
            user: {
                "id": "1",
                "firstName": "Fernando",
                "lastName": "Lyrio Annecchini",
            }
        }
    } else {
        return {
            ok: false,
            message: {
                "code": "auth-05",
                "userMessage": "Mensagem de erro do servidor!",
                "devMessage": {}
            }
        }
    }
}

function authConfirmResponse(info) {

    if (info.key === "abcdef") {
        return {
            ok: true
        }
    } else {
        return {
            ok: false,
            message: {
                "code": "auth-05",
                "userMessage": "Mensagem de erro do servidor!",
                "devMessage": {}
            }
        }
    }

}

function authLogin(info) {

    if (info.login === "fernando.void@gmail.com" && info.password === "123456") {
        return {
            ok: true,
            message: {
                token: 'a0b1c2d3e4f5'
            }
        }
    } else {
        return {
            ok: false,
            message: {
                "code": "auth-05",
                "userMessage": "Mensagem de erro do servidor!",
                "devMessage": {}
            }
        }
    }

}

function authRecover(info){
    if (info.email === "fernando.void@gmail.com" && info.cpf === "088.402.807-07") {
        return {
            ok: true,
            message: {
                token: 'a0b1c2d3e4f5'
            }
        }
    } else {
        return {
            ok: false,
            message: {
                "code": "auth-05",
                "userMessage": "Mensagem de erro do servidor!",
                "devMessage": {}
            }
        }
    }
}

export default DummyApi


