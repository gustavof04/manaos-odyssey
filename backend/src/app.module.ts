/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TouristAttractionsModule } from './touristAttractions/touristAttractions.module';
import { NearbyPlacesModule } from './nearbyPlaces/nearbyPlaces.module';
import { AttractionImageModule } from './attractionImage/attractionImage.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      logging: false,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
    }),
    TouristAttractionsModule,
    NearbyPlacesModule,
    AttractionImageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
