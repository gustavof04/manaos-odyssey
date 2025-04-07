import { Test, TestingModule } from '@nestjs/testing';
import { TouristAttractionsController } from './touristAttractions.controller';
import { ICreateAttraction } from '../domain/useCases/ICreateAttraction';
import { IFindAttractionById } from '../domain/useCases/IFindAttractionById';
import { IFindAllAttractions } from '../domain/useCases/IFindAllAttractions';
import { IUpdateAttraction } from '../domain/useCases/IUpdateAttraction';
import { IDeleteAttraction } from '../domain/useCases/IDeleteAttraction';
import { Attractions } from '../domain/entities/attractions.entity';
import { ResultStatus } from '../../../shared/helpers/result';
import { UpdateAttractionDTO } from '../domain/dtos/UpdateAttractionDTO';

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

  it('should get all attractions', async () => {
    const result = {
      isSuccess: true,
      content: [new Attractions()],
      message: '',
      status: ResultStatus.OK,
    };
    jest.spyOn(mockFindAllAttractions, 'Execute').mockResolvedValue(result);

    const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await controller.GetAll(response as any);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(result);
  });

  it('should get an attraction by id', async () => {
    const result = {
      isSuccess: true,
      content: new Attractions(),
      message: '',
      status: ResultStatus.OK,
    };
    jest.spyOn(mockFindAttractionById, 'Execute').mockResolvedValue(result);

    const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await controller.GetById(response as any, 1);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(result);
  });

  it('should create an attraction', async () => {
    const result = {
      isSuccess: true,
      content: new Attractions(),
      message: '',
      status: ResultStatus.CREATED,
    };
    jest.spyOn(mockCreateAttraction, 'Execute').mockResolvedValue(result);

    const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await controller.Create(response as any, new Attractions());

    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith(result);
  });

  it('should update an attraction', async () => {
    const result = {
      isSuccess: true,
      content: new Attractions(),
      message: '',
      status: ResultStatus.OK,
    };
    jest.spyOn(mockUpdateAttraction, 'Execute').mockResolvedValue(result);

    const updateDto: UpdateAttractionDTO = {
      name: 'Test Park',
      description: 'A beautiful park',
      location: 'Center of the city',
      averageRating: 4.5,
      latitude: '40.712776',
      longitude: '-74.005974',
      updatedAt: new Date().toISOString(),
    };

    const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await controller.Update(response as any, 1, updateDto);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(result);
  });
});
