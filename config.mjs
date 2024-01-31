import { is, expect } from "@simonyarde/type"
import { readFileSync } from "node:fs"
import { readFile } from "node:fs/promises"

export function readConfigObject(value, ...vars) {
    expect.prototype(value)
    if (!vars.length) {
        return value
    }
    const replacer = getReplacer(Object.assign({}, ...vars))
    return replaceTokens(value, replacer)
}

export function readConfigFileSync(path, ...vars) {
    const json = readFileSync(path, { encoding: 'utf8' })
    return readConfigString(json, ...vars)
}

export async function readConfigFile(path, ...vars) {
    expect.string(path)
    const json = await readFile(path, { encoding: 'utf8' })
    return readConfigString(json, ...vars)
}

export function readConfigString(value, ...vars) {
    expect.string(value)
    return readConfigObject(JSON.parse(value), ...vars)
}

function replaceTokens(x, replacer) {
    if (is.prototype(x, Array.prototype)) {
        return x.map(x => replaceTokens(x, replacer))
    }
    if (is.prototype(x)) {
        const obj = {}
        for (const n of Object.getOwnPropertyNames(x)) {
            obj[n] = replaceTokens(x[n], replacer)
        }
        return obj
    }
    if (is.string(x)) {
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
