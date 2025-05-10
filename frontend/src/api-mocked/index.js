import mockedServer from './mockedServer'
import './mockedApi/MockedMerchantsApi'

mockedServer.onAny().passThrough()
