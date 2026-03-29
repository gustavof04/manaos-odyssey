import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { Attractions } from '../../../touristAttractions/domain/entities/attractions.entity';
import { Result, ResultType } from '../../../../shared/helpers/result';
import { IFindNearbyPlaces } from '../../domain/useCases/IFindNearbyPlaces';
import { NearbyPlaceDTO } from '../../domain/dtos/NearbyPlaceDTO';

const OPENTRIPMAP_BASE_URL = 'https://api.opentripmap.com/0.1/en/places';

@Injectable()
export class FindNearbyPlaces implements IFindNearbyPlaces {
  constructor(
    @InjectRepository(Attractions)
    private readonly _attractionsRepository: Repository<Attractions>,
    private readonly _httpService: HttpService,
    private readonly _configService: ConfigService,
  ) {}

  public async Execute(
    attractionId: number,
  ): Promise<ResultType<NearbyPlaceDTO[] | null>> {
    try {
      const attraction = await this._attractionsRepository.findOneBy({
        id: attractionId,
      });

      if (!attraction) {
        return Result.NotFound(null, 'nearbyPlaces.error.attractionNotFound');
      }

      const apiKey = this._configService.get<string>('OPENTRIPMAP_API_KEY');

      const geonameResponse = await firstValueFrom(
        this._httpService.get(`${OPENTRIPMAP_BASE_URL}/geoname`, {
          params: {
            name: attraction.location,
            apikey: apiKey,
          },
        }),
      );

      const { lat, lon } = geonameResponse.data;

      if (!lat || !lon) {
        return Result.Ok<NearbyPlaceDTO[]>(
          [],
          'nearbyPlaces.get.noCoordinates',
        );
      }

      const radiusResponse = await firstValueFrom(
        this._httpService.get(`${OPENTRIPMAP_BASE_URL}/radius`, {
          params: {
            radius: 5000,
            lon,
            lat,
            limit: 10,
            rate: 2,
            format: 'json',
            apikey: apiKey,
          },
        }),
      );

      const nearbyPlaces: NearbyPlaceDTO[] = radiusResponse.data
        .filter((place: any) => place.name && place.name.trim() !== '')
        .map((place: any) => ({
          xid: place.xid,
          name: place.name,
          kinds: place.kinds,
          lat: place.point?.lat,
          lon: place.point?.lon,
        }));

      return Result.Ok<NearbyPlaceDTO[]>(
        nearbyPlaces,
        'nearbyPlaces.get.success',
      );
    } catch (err) {
      const errorMessage = (err as Error).message;
      return Result.InternalError(null, errorMessage);
    }
  }
}
