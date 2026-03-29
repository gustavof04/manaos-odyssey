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
};

export type NearbyPlace = {
  xid: string;
  name: string;
  kinds: string;
  lat: number;
  lon: number;
};
