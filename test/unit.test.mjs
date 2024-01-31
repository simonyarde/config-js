import { expect } from '../node_modules/chai/chai.js'
import {
    readConfigFile,
    readConfigFileSync,
    readConfigObject,
    readConfigString
} from '../config.mjs'

const testConfigPath = './test/test-config.json'

const testConfigObject = {
    "rootA": "{{A}} {{B}}",
    "rootB": [
        { "child0": "{{A}} {{B}}" },
        { "child1": "{{A}} {{B}}" }
    ]
}

const testConfigString = `
{
    "rootA": "{{A}} {{B}}",
    "rootB": [
        { "child0": "{{A}} {{B}}" },
        { "child1": "{{A}} {{B}}" }
    ]
}
`

const vars = [
    { A: 'A1', B: 'B1' },
    { B: 'B2' }
]

const expectConfig = {
    'rootA': 'A1 B2',
    'rootB': [
        { 'child0': 'A1 B2' },
        { 'child1': 'A1 B2' }
    ]
}

describe('Basic tests', function() {

    it('fromFile()', async function() {
        const result = await readConfigFile(testConfigPath, ...vars)
        expect(result).to.deep.equal(expectConfig)
    })

    it('fromFileSync()', async function() {
        const result = readConfigFileSync(testConfigPath, ...vars)
        expect(result).to.deep.equal(expectConfig)
    })

    it('fromString()', function() {
        const result = readConfigString(testConfigString, ...vars)
        expect(result).to.deep.equal(expectConfig)
    })

    it('fromObject()', function() {
        const result = readConfigObject(testConfigObject, ...vars)
        expect(result).to.deep.equal(expectConfig)
    })    
})
