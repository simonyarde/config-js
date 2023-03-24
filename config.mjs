import { is, expect } from "@simonyarde/type"
import { readFile } from "node:fs/promises"

export const config = {

    fromObject(x, ...vars) {
        expect.prototype(x)
        const replacer = getReplacer(Object.assign({}, ...vars))
        return replaceTokens(x, replacer)
    },

    async fromFile(path, ...vars) {
        expect.string(path)
        const json = await readFile(path, { encoding: 'utf8' })
        return this.fromString(json, ...vars)
    },

    fromString(x, ...vars) {
        expect.string(x)
        return this.fromObject(JSON.parse(x), ...vars)
    }
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
