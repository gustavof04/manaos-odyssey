import api from "../api";
import { ApiResponse, TouristAttractions } from "../../types/Types";

const getAttractions = async () => {
  return api.get<ApiResponse>("/touristAttractions").then(({ data }) => data);
};

const getAttractionsById = async (attraction: TouristAttractions) => {
  return api
    .get<ApiResponse>(`/touristAttractions/${attraction.id}`)
    .then(({ data }) => data);
};

const createAttractions = async (attraction: TouristAttractions) => {
  return api
    .post<ApiResponse>("/touristAttractions/new", attraction)
    .then(({ data }) => data);
};

const editAttractions = async (attraction: TouristAttractions) => {
  return api
    .put<ApiResponse>(`/touristAttractions/${attraction.id}`, attraction)
    .then(({ data }) => data);
};

const deleteAttractions = async (attraction: TouristAttractions) => {
  return api
    .delete<ApiResponse>(`/touristAttractions/${attraction.id}`)
    .then(({ data }) => data);
};

export {
  getAttractions,
  getAttractionsById,
  createAttractions,
  editAttractions,
  deleteAttractions,
};
