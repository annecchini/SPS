
class RegexHelpers{
    static emailRegex() {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex
    }

    static numberRegex() {
        const numberRegex = /^\d+$/;
        return numberRegex
    }

    static yearRegex() {
        const yearRegex = /^\d{4}$/;
        return yearRegex
    }

    static dateBrRegex() {
        const dateBrRegex = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]\d{4}$/;
        return dateBrRegex
    }
}

export default RegexHelpers