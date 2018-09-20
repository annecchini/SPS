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
}

const processList = [
    {
        id:1,
        number: 1,
        year: 2018
    },
    {
        id:2,
        number: 2,
        year: 2018
    },
    {
        id:3,
        number: 3,
        year: 2018
    }
]

export default DummyApi


