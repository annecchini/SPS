import DummyApi from "variables/DummyApi.jsx"

class DummySession {

    static postData(request, info) {

        let result = null

        switch (request) {
            case 'auth-login':
                result = authLoginSession(info)
                break
            default:
                break
        }
        return result

    }

    static getData(request) {

        let result = null

        switch (request) {
            case 'user-info':
                result = userInfo()
                break
            default:
                break
        }
        return result
    }

    static delData(request) {

        let result = null

        switch (request) {
            case 'logout':
                result = logout()
                break
            default:
                break
        }
        return result
    }

}

function authLoginSession(info) {

    const result = DummyApi.postData('auth-login', info)

    if (result.ok) {
        localStorage.setItem('auth-token', result.message.token)
        return result
    } else {
        if (result.ok === false)
            return result
        else
            throw new Error('falha na comunicação com o servidor')
    }

}

function userInfo() {

    const token = localStorage.getItem('auth-token')

    const result = DummyApi.getData('user-info', token)

    if (result.ok) {
        return result
    } else {
        if (result.ok === false)
        return result
    else
        throw new Error('falha na comunicação com o servidor')
    }

}

function logout() {
        localStorage.removeItem('auth-token')
}

export default DummySession