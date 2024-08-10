export type ApiResponse = {
  content: any;
  isSuccess: boolean;
  message: string;
  status: string;
};

export type TouristAttractions = {
  id?: number;
  name: string;
  description: string;
  location: string;
  averageRating: number;
  latitude: number;
  longitude: number;
};
