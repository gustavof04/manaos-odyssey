import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateAttraction } from './UpdateAttraction';
import { Attractions } from '../../domain/entities/attractions.entity';
import { ResultStatus } from '../../../../shared/helpers/result';

describe('UpdateAttraction', () => {
  let updateAttraction: UpdateAttraction;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateAttraction,
        {
          provide: getRepositoryToken(Attractions),
          useValue: {
            findOneBy: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    updateAttraction = module.get<UpdateAttraction>(UpdateAttraction);
  });

  it('should be defined', () => {
    expect(updateAttraction).toBeDefined();
  });

  it('should update an attraction successfully', async () => {
    // Arrange
    const input = {
      name: 'Updated attraction',
      description: 'Description',
      location: 'Location',
      averageRating: 4.5,
    };
    const updatedAttraction = {
      id: 1,
      ...input,
      createdAt: '2025-04-08T00:00:00Z',
      updatedAt: '2025-04-08T00:00:00Z',
    };

    const findOneSpy = jest
      .spyOn(updateAttraction['_attractionsRepository'], 'findOneBy')
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({
        id: 1,
        ...input,
        createdAt: '2025-04-08T00:00:00Z',
        updatedAt: '2025-04-08T00:00:00Z',
      });

    const saveSpy = jest
      .spyOn(updateAttraction['_attractionsRepository'], 'save')
      .mockResolvedValue(updatedAttraction);

    // Act
    const result = await updateAttraction.Execute(1, input);

    // Assert
    expect(findOneSpy).toHaveBeenCalledWith({ name: input.name });
    expect(findOneSpy).toHaveBeenCalledWith({ id: 1 });
    expect(saveSpy).toHaveBeenCalledWith(expect.objectContaining(input));
    expect(result.isSuccess).toBe(true);
    expect(result.content).toEqual(updatedAttraction);
    expect(result.message).toBe('touristAttraction.updated.success');
    expect(result.status).toBe(ResultStatus.OK);
  });

  it('should return error when trying to update an attraction with an existing name', async () => {
    // Arrange
    const input = {
      name: 'Existing attraction name',
      description: 'Description',
      location: 'Location',
      averageRating: 4.0,
    };

    const findOneBySpy = jest
      .spyOn(updateAttraction['_attractionsRepository'], 'findOneBy')
      .mockResolvedValue({
        id: 1,
        ...input,
        createdAt: '2025-04-08T00:00:00Z',
        updatedAt: '2025-04-08T00:00:00Z',
      });

    const saveSpy = jest.spyOn(
      updateAttraction['_attractionsRepository'],
      'save',
    );

    // Act
    const result = await updateAttraction.Execute(1, input);

    // Assert
    expect(findOneBySpy).toHaveBeenCalledWith({ name: input.name });
    expect(saveSpy).not.toHaveBeenCalled();
    expect(result.isSuccess).toBe(false);
    expect(result.message).toBe('touristAttraction.error.alreadyExists');
    expect(result.status).toBe(ResultStatus.OPERATIONAL_ERROR);
  });

  it('should return not found if attraction does not exist', async () => {
    // Arrange
    const input = {
      name: 'Non-existing attraction',
      description: 'Description',
      location: 'Location',
      averageRating: 4.0,
    };

    const findOneBySpy = jest
      .spyOn(updateAttraction['_attractionsRepository'], 'findOneBy')
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(null);

    const saveSpy = jest.spyOn(
      updateAttraction['_attractionsRepository'],
      'save',
    );

    // Act
    const result = await updateAttraction.Execute(1, input);

    // Assert
    expect(findOneBySpy).toHaveBeenCalledWith({ name: input.name });
    expect(findOneBySpy).toHaveBeenCalledWith({ id: 1 });
    expect(saveSpy).not.toHaveBeenCalled();
    expect(result.isSuccess).toBe(false);
    expect(result.message).toBe('touristAttraction.updated.error.notFound');
    expect(result.status).toBe(ResultStatus.NOT_FOUND);
  });

  it('should throw an exception', async () => {
    // Arrange
    const input = {
      name: 'Updated attraction',
      description: 'Description',
      location: 'Location',
      averageRating: 4.5,
    };

    jest
      .spyOn(updateAttraction['_attractionsRepository'], 'findOneBy')
      .mockRejectedValue(new Error());

    // Act
    const result = await updateAttraction.Execute(1, input);

    // Assert
    expect(result.isSuccess).toBe(false);
    expect(result.status).toBe(ResultStatus.INTERNAL_ERROR);
  });
});
