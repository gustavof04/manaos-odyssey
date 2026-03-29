import { HttpHelper } from '../../../shared/helpers/httpResponseHelper';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IFindAttractionImage } from '../domain/useCases/IFindAttractionImage';
import { AttractionImageDTO } from '../domain/dtos/AttractionImageDTO';

@ApiTags('attractionImage')
@Controller('attractionImage')
export class AttractionImageController {
  constructor(
    private readonly _findAttractionImage: IFindAttractionImage,
  ) {}

  @Get(':attractionId')
  @ApiOkResponse({ type: AttractionImageDTO })
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  public async GetByAttractionId(
    @Res() response: Response,
    @Param('attractionId') attractionId: number,
  ) {
    const result = await this._findAttractionImage.Execute(attractionId);
    return response
      .status(HttpHelper.StatusCode(result.status))
      .json(result);
  }
}
