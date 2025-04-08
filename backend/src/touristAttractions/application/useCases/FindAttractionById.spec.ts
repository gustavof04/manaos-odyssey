import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Attractions } from '../../domain/entities/attractions.entity';
import { FindAttractionById } from './FindAttractionById';
import { ResultStatus } from '../../../../shared/helpers/result';

describe('FindAttractionById', () => {
  let findAttractionById: FindAttractionById;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAttractionById,
        {
          provide: getRepositoryToken(Attractions),
          useValue: {
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    findAttractionById = module.get<FindAttractionById>(FindAttractionById);
  });

  it('should be defined', () => {
    expect(findAttractionById).toBeDefined();
  });

  it('should return attraction by id successfully', async () => {
    const attraction = {
      id: 1,
      name: 'Attraction to be found',
      description: 'Description',
      location: 'Location',
      averageRating: 4.5,
      createdAt: '2025-04-08T00:00:00Z',
      updatedAt: '2025-04-08T00:00:00Z',
    };

    const findOneSpy = jest
      .spyOn(findAttractionById['_attractionsRepository'], 'findOneBy')
      .mockResolvedValue(attraction);

    const result = await findAttractionById.Execute(1);

    expect(findOneSpy).toHaveBeenCalledWith({ id: 1 });
    expect(result.isSuccess).toBe(true);
    expect(result.status).toBe(ResultStatus.OK);
    expect(result.message).toBe('touristAttraction.get.success');
    expect(result.content).toEqual(attraction);
  });

  it('should return not found if attraction does not exist', async () => {
    jest
      .spyOn(findAttractionById['_attractionsRepository'], 'findOneBy')
      .mockResolvedValue(null);

    const result = await findAttractionById.Execute(1);

    expect(result.isSuccess).toBe(false);
    expect(result.status).toBe(ResultStatus.NOT_FOUND);
    expect(result.message).toBe('touristAttraction.get.error.notFound');
    expect(result.content).toBeNull();
  });

  it('should throw an exception', async () => {
    jest
      .spyOn(findAttractionById['_attractionsRepository'], 'findOneBy')
      .mockRejectedValue(new Error());

    const result = await findAttractionById.Execute(1);

    expect(result.isSuccess).toBe(false);
    expect(result.status).toBe(ResultStatus.INTERNAL_ERROR);
    expect(result.content).toBeNull();
  });
});
