import { MiddlewareConsumer, Module, NestModule, RequestMethod, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { APP_PIPE } from '@nestjs/core'
import { TodoListModule } from './todolist/todolist.module'
import logger from "./utils/logger";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const mongoUri = configService.get<string>('MONGO_URI')
        if (!mongoUri) {
          throw new Error('MONGO_URI is not configured!');
        }
        logger.info('Connecting to MongoDB at:', mongoUri)
        return {
          uri: mongoUri,
        };
      },
      inject: [ConfigService],
    }),
    TodoListModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
  exports: []
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthMiddleware)
  //     .exclude(        
  //       { path: '/todolist/onGoingAndFuture', method: RequestMethod.GET }
  //     )
  //     .forRoutes('*')
  }
}