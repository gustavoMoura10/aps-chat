/**
 * Classe que irá exportar os métodos
 * de exceção
 */
const exceptions = {}
/**
 * Método que verifica se o valor do parametro
 * é de alguma forma vázio
 */
exceptions.empty = (object) => {
    if (object === undefined)
        throw 'Value is undefined'
    if (typeof object === 'object' &&
        Object.keys(object).length === 0)
        throw 'Object is empty'
    if (typeof object === 'string' && object === '')
        throw 'String is empty'
}
/**
 * Verifica se os atributos dos
 * objetos são iguais
 */
exceptions.equalBody = (object1, object2) => {
    if (Object.keys(object1).sort().toString() !== Object.keys(object2).sort().toString())
        throw 'Wrong Body'
    else
        console.log('Iguais')
}
/**
 * Verifica se os valores são iguais
 */
exceptions.equals = (value1, value2) => {
    if (value1 !== value2)
        throw 'Values not equal'
}
module.exports = exceptions;