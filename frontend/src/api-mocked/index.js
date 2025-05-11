import mockedServer from './mockedServer'
import './mockedApi/MockedMerchantsApi'
import './mockedApi/MockedTodoListApi'

mockedServer.onAny().passThrough()
