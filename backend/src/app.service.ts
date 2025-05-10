import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return 'todolist API is up and running! (Built in NestJS)'
  }
}
