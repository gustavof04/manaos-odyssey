import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attractions } from '../touristAttractions/domain/entities/attractions.entity';
import { NearbyPlacesController } from './presentation/nearbyPlaces.controller';
import { IFindNearbyPlaces } from './domain/useCases/IFindNearbyPlaces';
import { FindNearbyPlaces } from './application/useCases/FindNearbyPlaces';

@Module({
  imports: [TypeOrmModule.forFeature([Attractions]), HttpModule, ConfigModule],
  controllers: [NearbyPlacesController],
  providers: [
    {
      provide: IFindNearbyPlaces,
      useClass: FindNearbyPlaces,
    },
  ],
})
export class NearbyPlacesModule {}
