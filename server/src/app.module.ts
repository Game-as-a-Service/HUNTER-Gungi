import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsService } from './cats/cats.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CatsService],
})
export class AppModule {}
