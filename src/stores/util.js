
export const replaceString = async (string) => {
    return string.replaceAll("_", "")
}

export const firstLower = async (string) => {
    return (string.charAt(0).toLowerCase() + string.slice(1));
}

export const firstUpper = async (string) => {
    return (string.charAt(0).toUpperCase() + string.slice(1));
}
export const dateFormat = async (tgl) => {

    let month = ('' + (tgl.getMonth() + 101)).slice(-2)
    let day = ('' + (tgl.getDate() + 100)).slice(-2)
    let year = (tgl).getFullYear()
    let dateFormat = year + '-' + month + '-' + day
    return dateFormat
}

/*
membuat case spt ini Table_kolom_contoh ---> tableKolomContoh
*/

export const createCamelCase = async (string) => {
    let myStrings = string.split('_')
    let camelVar = ''

    for (let index = 0; index < myStrings.length; index++) {
        const element = myStrings[index];
        camelVar = camelVar + await firstUpper(element)

    }
    return camelVar
}


const getAkaByToken = async (token) => {
    return
}
