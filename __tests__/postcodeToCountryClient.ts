import * as request from 'request-promise-native'
import { PostcodeToCountryClient } from '../src'
import * as nock from 'nock'
import * as fs from 'fs'
import * as path from 'path'

const mockServer = 'http://localhost'
const postcodeToCountryClient: PostcodeToCountryClient = new PostcodeToCountryClient('APIKEY', request, mockServer)

describe('postcodeToCountryClient', () => {

    test('should throw error if no postcode found', async () => {
        nock(mockServer)
            .get(/\/opennames\/v1\/find\?query=.*&maxresults=.*&key=.*/)
            .reply(404, [])

        return expect(postcodeToCountryClient.lookupCountry('XXXX'))
            .rejects.toEqual('Unable to find country for \'XXXX\': TypeError: Cannot read property \'0\' of undefined')
    })

    test('should return found postcodes', () => {
        nock(mockServer)
            .get(/\/opennames\/v1\/find\?query=.*&maxresults=.*&key=.*/)
            .reply(200, fs.readFileSync(path.join(__dirname, 'sampleResponse.json')))

        return postcodeToCountryClient.lookupCountry('SW1H 9AJ')
            .then(country => expect(country).toEqual('England'))
    })

    test('should reject promise if no postcode', () =>
        expect(postcodeToCountryClient.lookupCountry(''))
            .rejects.toEqual(new Error('Missing required postcode'))
    )
})
