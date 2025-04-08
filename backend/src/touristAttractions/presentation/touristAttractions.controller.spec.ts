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
    // Arrange
    const result = {
      isSuccess: true,
      content: [new Attractions()],
      message: '',
      status: ResultStatus.OK,
    };
    jest.spyOn(mockFindAllAttractions, 'Execute').mockResolvedValue(result);

    // Act
    const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await controller.GetAll(response as any);

    // Assert
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(result);
  });

  it('should get an attraction by id', async () => {
    // Arrange
    const result = {
      isSuccess: true,
      content: new Attractions(),
      message: '',
      status: ResultStatus.OK,
    };
    jest.spyOn(mockFindAttractionById, 'Execute').mockResolvedValue(result);

    // Act
    const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await controller.GetById(response as any, 1);

    // Assert
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(result);
  });

  it('should create an attraction', async () => {
    // Arrange
    const result = {
      isSuccess: true,
      content: new Attractions(),
      message: '',
      status: ResultStatus.CREATED,
    };
    jest.spyOn(mockCreateAttraction, 'Execute').mockResolvedValue(result);

    // Act
    const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await controller.Create(response as any, new Attractions());

    // Assert
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith(result);
  });

  it('should update an attraction', async () => {
    // Arrange
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
      updatedAt: new Date().toISOString(),
    };

    // Act
    const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await controller.Update(response as any, 1, updateDto);

    // Assert
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(result);
  });

  it('should delete an attraction', async () => {
    // Arrange
    const result = {
      isSuccess: true,
      content: true,
      message: '',
      status: ResultStatus.OK,
    };
    jest.spyOn(mockDeleteAttraction, 'Execute').mockResolvedValue(result);

    // Act
    const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await controller.Remove(response as any, 1);

    // Assert
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(result);
  });
});
