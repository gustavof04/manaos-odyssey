import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateAttraction } from './CreateAttraction';
import { Attractions } from '../../domain/entities/attractions.entity';
import { ResultStatus } from '../../../../shared/helpers/result';

describe('CreateAttraction', () => {
  let createAttraction: CreateAttraction;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAttraction,
        {
          provide: getRepositoryToken(Attractions),
          useValue: {
            findOneBy: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    createAttraction = module.get<CreateAttraction>(CreateAttraction);
  });

  it('should be defined', () => {
    expect(createAttraction).toBeDefined();
  });

  it('should create a new attraction successfully', async () => {
    // Arrange
    const input = {
      name: 'New attraction',
      description: 'Description',
      location: 'Location',
      averageRating: 4.5,
    };
    const savedAttraction = {
      id: 1,
      ...input,
      createdAt: '2025-04-08T00:00:00Z',
      updatedAt: '2025-04-08T00:00:00Z',
    };

    const findOneSpy = jest
      .spyOn(createAttraction['_attractionRepository'], 'findOneBy')
      .mockResolvedValue(null);

    const saveSpy = jest
      .spyOn(createAttraction['_attractionRepository'], 'save')
      .mockResolvedValue(savedAttraction);

    // Act
    const result = await createAttraction.Execute(input);

    // Assert
    expect(findOneSpy).toHaveBeenCalledWith({ name: input.name });
    expect(saveSpy).toHaveBeenCalledWith(input);
    expect(result.isSuccess).toBe(true);
    expect(result.content).toEqual(savedAttraction);
    expect(result.message).toBe('touristAttraction.created.success');
    expect(result.status).toBe(ResultStatus.CREATED);
  });

  it('should return error when trying to create an existing attraction', async () => {
    // Arrange
    const input = {
      name: 'Existing attraction',
      description: 'Description',
      location: 'Location',
      averageRating: 4.0,
    };
    const existingAttraction = {
      id: 1,
      ...input,
      createdAt: '2025-04-08T00:00:00Z',
      updatedAt: '2025-04-08T00:00:00Z',
    };

    const findOneSpy = jest
      .spyOn(createAttraction['_attractionRepository'], 'findOneBy')
      .mockImplementation(async (filter: any) =>
        filter.name === input.name ? existingAttraction : null,
      );

    const saveSpy = jest.spyOn(
      createAttraction['_attractionRepository'],
      'save',
    );

    // Act
    const result = await createAttraction.Execute(input);

    // Assert
    expect(findOneSpy).toHaveBeenCalledWith({ name: input.name });
    expect(saveSpy).not.toHaveBeenCalled();
    expect(result.isSuccess).toBe(false);
    expect(result.message).toBe('touristAttraction.error.alreadyExists');
    expect(result.status).toBe(ResultStatus.OPERATIONAL_ERROR);
  });

  it('should throw an exception', async () => {
    const input = {
      name: 'New attraction',
      description: 'Description',
      location: 'Location',
      averageRating: 4.5,
    };

    jest
      .spyOn(createAttraction['_attractionRepository'], 'findOneBy')
      .mockResolvedValue(null);

    jest
      .spyOn(createAttraction['_attractionRepository'], 'save')
      .mockRejectedValue(new Error());

    const result = await createAttraction.Execute(input);

    expect(result.isSuccess).toBe(false);
    expect(result.status).toBe(ResultStatus.INTERNAL_ERROR);
  });
});
