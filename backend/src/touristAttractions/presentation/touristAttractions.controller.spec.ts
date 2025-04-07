import { Test, TestingModule } from '@nestjs/testing';
import { TouristAttractionsController } from './touristAttractions.controller';
import { ICreateAttraction } from '../domain/useCases/ICreateAttraction';
import { IFindAttractionById } from '../domain/useCases/IFindAttractionById';
import { IFindAllAttractions } from '../domain/useCases/IFindAllAttractions';
import { IUpdateAttraction } from '../domain/useCases/IUpdateAttraction';
import { IDeleteAttraction } from '../domain/useCases/IDeleteAttraction';
import { Attractions } from '../domain/entities/attractions.entity';
import { ResultStatus } from '../../../shared/helpers/result';

describe('TouristAttractionsController', () => {
  let controller: TouristAttractionsController;
  let mockCreateAttraction: ICreateAttraction;
  let mockFindAttractionById: IFindAttractionById;
  let mockFindAllAttractions: IFindAllAttractions;
  let mockUpdateAttraction: IUpdateAttraction;
  let mockDeleteAttraction: IDeleteAttraction;

  beforeEach(async () => {
    mockCreateAttraction = { Execute: jest.fn() };
    mockFindAttractionById = { Execute: jest.fn() };
    mockFindAllAttractions = { Execute: jest.fn() };
    mockUpdateAttraction = { Execute: jest.fn() };
    mockDeleteAttraction = { Execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TouristAttractionsController],
      providers: [
        { provide: ICreateAttraction, useValue: mockCreateAttraction },
        { provide: IFindAttractionById, useValue: mockFindAttractionById },
        { provide: IFindAllAttractions, useValue: mockFindAllAttractions },
        { provide: IUpdateAttraction, useValue: mockUpdateAttraction },
        { provide: IDeleteAttraction, useValue: mockDeleteAttraction },
      ],
    }).compile();

    controller = module.get<TouristAttractionsController>(
      TouristAttractionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
