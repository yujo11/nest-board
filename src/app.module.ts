import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { TypeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(TypeORMConfig), BoardsModule],
})
export class AppModule {}
