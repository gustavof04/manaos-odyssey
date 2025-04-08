import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Attractions } from '../../domain/entities/attractions.entity';
import { DeleteAttraction } from './DeleteAttraction';
import { ResultStatus } from '../../../../shared/helpers/result';

describe('DeleteAttraction', () => {
  let deleteAttraction: DeleteAttraction;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteAttraction,
        {
          provide: getRepositoryToken(Attractions),
          useValue: {
            findOneBy: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    deleteAttraction = module.get<DeleteAttraction>(DeleteAttraction);
  });

  it('should be defined', () => {
    expect(deleteAttraction).toBeDefined();
  });

  it('should delete an attraction successfully', async () => {
    const attraction = {
      id: 1,
      name: 'Attraction to be deleted',
      description: 'Description',
      location: 'Location',
      averageRating: 4.0,
      createdAt: '2025-04-08T00:00:00Z',
      updatedAt: '2025-04-08T00:00:00Z',
    };

    const findOneSpy = jest
      .spyOn(deleteAttraction['_attractionsRepository'], 'findOneBy')
      .mockResolvedValue(attraction);

    const removeSpy = jest
      .spyOn(deleteAttraction['_attractionsRepository'], 'remove')
      .mockResolvedValue(attraction);

    const result = await deleteAttraction.Execute(1);

    expect(findOneSpy).toHaveBeenCalledWith({ id: 1 });
    expect(removeSpy).toHaveBeenCalledWith(attraction);
    expect(result.isSuccess).toBe(true);
    expect(result.status).toBe(ResultStatus.OK);
    expect(result.message).toBe('touristAttraction.deleted.success');
    expect(result.content).toBe(true);
  });

  it('should return not found if attraction does not exist', async () => {
    jest
      .spyOn(deleteAttraction['_attractionsRepository'], 'findOneBy')
      .mockResolvedValue(null);

    const removeSpy = jest.spyOn(
      deleteAttraction['_attractionsRepository'],
      'remove',
    );

    const result = await deleteAttraction.Execute(1);

    expect(removeSpy).not.toHaveBeenCalled();
    expect(result.isSuccess).toBe(false);
    expect(result.status).toBe(ResultStatus.NOT_FOUND);
    expect(result.message).toBe('touristAttraction.deleted.error.notFound');
    expect(result.content).toBe(false);
  });

  it('should throw an exception', async () => {
    jest
      .spyOn(deleteAttraction['_attractionsRepository'], 'findOneBy')
      .mockRejectedValue(new Error());

    const result = await deleteAttraction.Execute(1);

    expect(result.isSuccess).toBe(false);
    expect(result.status).toBe(ResultStatus.INTERNAL_ERROR);
    expect(result.content).toBe(false);
  });
});
