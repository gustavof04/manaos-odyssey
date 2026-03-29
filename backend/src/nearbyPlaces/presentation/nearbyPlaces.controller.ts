import { HttpHelper } from '../../../shared/helpers/httpResponseHelper';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IFindNearbyPlaces } from '../domain/useCases/IFindNearbyPlaces';
import { NearbyPlaceDTO } from '../domain/dtos/NearbyPlaceDTO';

@ApiTags('nearbyPlaces')
@Controller('nearbyPlaces')
export class NearbyPlacesController {
  constructor(
    private readonly _findNearbyPlaces: IFindNearbyPlaces,
  ) {}

  @Get(':attractionId')
  @ApiOkResponse({ type: NearbyPlaceDTO, isArray: true })
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  public async GetByAttractionId(
    @Res() response: Response,
    @Param('attractionId') attractionId: number,
  ) {
    const result = await this._findNearbyPlaces.Execute(attractionId);
    return response
      .status(HttpHelper.StatusCode(result.status))
      .json(result);
  }
}
