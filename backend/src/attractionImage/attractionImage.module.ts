import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attractions } from '../touristAttractions/domain/entities/attractions.entity';
import { AttractionImageController } from './presentation/attractionImage.controller';
import { IFindAttractionImage } from './domain/useCases/IFindAttractionImage';
import { FindAttractionImage } from './application/useCases/FindAttractionImage';

@Module({
  imports: [TypeOrmModule.forFeature([Attractions]), HttpModule],
  controllers: [AttractionImageController],
  providers: [
    {
      provide: IFindAttractionImage,
      useClass: FindAttractionImage,
    },
  ],
})
export class AttractionImageModule {}
