import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Attractions } from '../../domain/entities/attractions.entity';
import { FindAllAttractions } from './FindAllAttractions';
import { ResultStatus } from '../../../../shared/helpers/result';

describe('FindAllAttractions', () => {
  let findAllAttractions: FindAllAttractions;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllAttractions,
        {
          provide: getRepositoryToken(Attractions),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    findAllAttractions = module.get<FindAllAttractions>(FindAllAttractions);
  });

  it('should be defined', () => {
    expect(findAllAttractions).toBeDefined();
  });

  it('should return all attractions successfully', async () => {
    const attractions = [
      {
        id: 1,
        name: 'Attraction 1',
        description: 'Description 1',
        location: 'Location 1',
        averageRating: 4.5,
        createdAt: '2025-04-08T00:00:00Z',
        updatedAt: '2025-04-08T00:00:00Z',
      },
      {
        id: 2,
        name: 'Attraction 2',
        description: 'Description 2',
        location: 'Location 2',
        averageRating: 4.2,
        createdAt: '2025-04-08T00:00:00Z',
        updatedAt: '2025-04-08T00:00:00Z',
      },
    ];

    const findSpy = jest
      .spyOn(findAllAttractions['_attractionsRepository'], 'find')
      .mockResolvedValue(attractions);

    const result = await findAllAttractions.Execute();

    expect(findSpy).toHaveBeenCalled();
    expect(result.isSuccess).toBe(true);
    expect(result.status).toBe(ResultStatus.OK);
    expect(result.message).toBe('touristAttractions.getAll.success');
    expect(result.content).toEqual(attractions);
  });

  it('should throw an exception', async () => {
    jest
      .spyOn(findAllAttractions['_attractionsRepository'], 'find')
      .mockRejectedValue(new Error());

    const result = await findAllAttractions.Execute();

    expect(result.isSuccess).toBe(false);
    expect(result.status).toBe(ResultStatus.INTERNAL_ERROR);
    expect(result.content).toBeNull();
  });
});
