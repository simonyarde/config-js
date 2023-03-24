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

const envDefaults = { A: 'A1', B: 'B1' }
const env         = { B: 'B2' }

const expectConfig = {
    'rootA': 'A1 B2',
    'rootB': [
        { 'child0': 'A1 B2' },
        { 'child1': 'A1 B2' }
    ]
}

describe('Basic tests', function() {

    it('fromFile()', async function() {
        const config = await Config.fromFile(testConfigPath, envDefaults, env)
        expect(config).to.deep.equal(expectConfig)
    })

    it('fromString()', function() {
        const config = Config.fromString(testConfigString, envDefaults, env)
        expect(config).to.deep.equal(expectConfig)
    })

    it('fromObj()', function() {
        const config = Config.fromObj(testConfigObject, envDefaults, env)
        expect(config).to.deep.equal(expectConfig)
    })    
})
