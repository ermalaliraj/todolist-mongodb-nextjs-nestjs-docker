import mockedServer from './mockedServer'
import { MOCK_API_ENABLED, MOCK_API_TODOLIST_ENABLED } from '../utils/env'

console.log('MOCK_API_ENABLED:', MOCK_API_ENABLED)
if (MOCK_API_ENABLED === 'true') {
  console.log('MOCK_API_TODOLIST_ENABLED:', MOCK_API_TODOLIST_ENABLED)
  if (MOCK_API_TODOLIST_ENABLED === 'true') {
    require('./mockedApi/MockedTodoListApi')
  }

  // Allow unmatched requests to pass through
  mockedServer.onAny().passThrough()
}
