import { expect } from '../node_modules/chai/index.mjs'
import { Config } from '../config.mjs'

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
        const result = await Config.fromFile(testConfigPath, ...vars)
        expect(result).to.deep.equal(expectConfig)
    })

    it('fromString()', function() {
        const result = Config.fromString(testConfigString, ...vars)
        expect(result).to.deep.equal(expectConfig)
    })

    it('fromObject()', function() {
        const result = Config.fromObject(testConfigObject, ...vars)
        expect(result).to.deep.equal(expectConfig)
    })    
})
