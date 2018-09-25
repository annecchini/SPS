
class FormatHelpers{
    static processNumber(processNumber) {
        const str = "" + processNumber
        const pad = "000"
        const number = pad.substring(0, pad.length - str.length) + str
        return number
    }

    static brDate(fullDate) {
        var mm = fullDate.getMonth(); // getMonth() is zero-based
        var dd = fullDate.getDate();
      
        return `${(dd>9 ? '' : '0') + dd}/${(mm>9 ? '' : '0') + mm}/${fullDate.getFullYear()}`
    }
}

export default FormatHelpers
