import { type ResultType } from 'shared/helpers/result';
import { type NearbyPlaceDTO } from '../dtos/NearbyPlaceDTO';

export abstract class IFindNearbyPlaces {
  Execute: (attractionId: number) => Promise<ResultType<NearbyPlaceDTO[] | null>>;
}
