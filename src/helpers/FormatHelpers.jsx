
class FormatHelpers{
    static processNumber(processNumber) {
        const str = "" + processNumber
        const pad = "000"
        const number = pad.substring(0, pad.length - str.length) + str
        return number
    }
}

export default FormatHelpers
