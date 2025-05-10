import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import logger from './utils/logger'
import { GlobalExceptionFilter } from './common/exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.useGlobalFilters(new GlobalExceptionFilter())
  const port = process.env.PORT || 3000
  await app.listen(port)
  logger.info(`Server running on port ${port}`)
}

bootstrap()
