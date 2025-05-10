// mockedServer.js
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

// Create a single mock adapter instance
const mockedServer = new MockAdapter(axios, { onNoMatch: 'passthrough' })

// Export the mocked server
export default mockedServer
