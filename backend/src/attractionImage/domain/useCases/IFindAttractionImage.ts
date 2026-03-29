import { type ResultType } from 'shared/helpers/result';
import { type AttractionImageDTO } from '../dtos/AttractionImageDTO';

export abstract class IFindAttractionImage {
  Execute: (attractionId: number) => Promise<ResultType<AttractionImageDTO | null>>;
}
