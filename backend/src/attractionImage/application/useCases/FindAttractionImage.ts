import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { Attractions } from '../../../touristAttractions/domain/entities/attractions.entity';
import { Result, ResultType } from '../../../../shared/helpers/result';
import { IFindAttractionImage } from '../../domain/useCases/IFindAttractionImage';
import { AttractionImageDTO } from '../../domain/dtos/AttractionImageDTO';

const WIKIPEDIA_API_URL = 'https://pt.wikipedia.org/api/rest_v1/page/summary';

@Injectable()
export class FindAttractionImage implements IFindAttractionImage {
  constructor(
    @InjectRepository(Attractions)
    private readonly _attractionsRepository: Repository<Attractions>,
    private readonly _httpService: HttpService,
  ) {}

  public async Execute(
    attractionId: number,
  ): Promise<ResultType<AttractionImageDTO | null>> {
    try {
      const attraction = await this._attractionsRepository.findOneBy({
        id: attractionId,
      });

      if (!attraction) {
        return Result.NotFound(null, 'attractionImage.error.attractionNotFound');
      }

      const encodedName = encodeURIComponent(
        attraction.name.replace(/\s+/g, '_'),
      );

      const wikiResponse = await firstValueFrom(
        this._httpService.get(`${WIKIPEDIA_API_URL}/${encodedName}`, {
          headers: {
            'User-Agent': 'ManaosOdyssey/1.0 (tourism platform)',
          },
        }),
      );

      const imageUrl =
        wikiResponse.data?.thumbnail?.source ||
        wikiResponse.data?.originalimage?.source ||
        null;

      if (!imageUrl) {
        return Result.NotFound(null, 'attractionImage.error.imageNotFound');
      }

      return Result.Ok<AttractionImageDTO>(
        { imageUrl },
        'attractionImage.get.success',
      );
    } catch (err) {
      if ((err as any)?.response?.status === 404) {
        return Result.NotFound(null, 'attractionImage.error.imageNotFound');
      }
      const errorMessage = (err as Error).message;
      return Result.InternalError(null, errorMessage);
    }
  }
}
