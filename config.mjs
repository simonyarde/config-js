import { readFileSync } from "node:fs"
import { readFile } from "node:fs/promises"

export function readConfigObject(value, ...vars) {
    if (!(typeof value === 'object' && value !== 'null')) {
        throw new Error('Expected object.')
    }
    if (!vars.length) {
        return value
    }
    const replacer = getReplacer(Object.assign({}, ...vars))
    return replaceTokens(value, replacer)
}

export function readConfigFileSync(path, ...vars) {
    if (!(typeof path === 'string')) {
        throw new Error('Expected string.')
    }
    const json = readFileSync(path, { encoding: 'utf8' })
    return readConfigString(json, ...vars)
}

export async function readConfigFile(path, ...vars) {
    if (!(typeof path === 'string')) {
        throw new Error('Expected string.')
    }
    const json = await readFile(path, { encoding: 'utf8' })
    return readConfigString(json, ...vars)
}

export function readConfigString(value, ...vars) {
    if (!(typeof value === 'string')) {
        throw new Error('Expected string.')
    }
    return readConfigObject(JSON.parse(value), ...vars)
}

function replaceTokens(x, replacer) {
    if (Array.isArray(x)) {
        return x.map(x => replaceTokens(x, replacer))
    }
    if (typeof x === 'object' && x !== null) {
        const obj = {}
        for (const n of Object.getOwnPropertyNames(x)) {
            obj[n] = replaceTokens(x[n], replacer)
        }
        return obj
    }
    if (typeof x === 'string') {
        return replaceTokensInString(x, replacer)
    }
    return x
}

function replaceTokensInString(str, replacer) {
    return str.replace(tokenRegex, replacer)
}

function getReplacer(vars) {
    return (match, tokenName) => {
        if (tokenName in vars) {
            return vars[tokenName]
        }
        throw new Error(
            `Token: ${match}. No property with name ${tokenName} found in supplied in vars.`
        )
    }
}

// Matches on tokens like {{My_var-1}}.
const tokenRegex = /{{([\w\d_-]+)}}/g
