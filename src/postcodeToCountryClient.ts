import * as requestDefault from 'request'
import * as requestPromise from 'request-promise-native'

export class PostcodeToCountryClient {
    constructor (private readonly apiToken: string,
                 private readonly request: requestDefault.RequestAPI<requestPromise.RequestPromise,
                     requestPromise.RequestPromiseOptions,
                     requestDefault.RequiredUriUrl> = requestPromise,
                 private readonly apiUrl: string = 'https://api.ordnancesurvey.co.uk') {
    }

    public async lookupCountry (postcode: string): Promise<string> {
        if (!postcode) {
            return Promise.reject(new Error('Missing required postcode'))
        }

        return Promise.reject(new Error('Unimplemented'))
    }
}
