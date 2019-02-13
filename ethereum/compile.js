const path = require('path')
const solc = require('solc')
const fs = require('fs-extra')

// Delete the entire "build" directory
const buildPath = path.resolve(__dirname, 'build')
fs.removeSync(buildPath)

// Read 'Campaign.sol' from the 'contracts' directory
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol')
const source = fs.readFileSync(campaignPath, 'utf8')

// Compile both the Campaign and CampaignFactory with 'solc'
const output = solc.compile(source, 1).contracts

// Recreate the 'build' directory and write the output to it
fs.ensureDirSync(buildPath)

for (let contract in output) {
    fs.outputJSONSync(
        path.resolve(buildPath, contract + '.json'),
        output[contract]
    )
}