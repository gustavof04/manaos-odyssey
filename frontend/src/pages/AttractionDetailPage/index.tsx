import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import PlaceIcon from "@mui/icons-material/Place";
import { TouristAttractions, NearbyPlace } from "../../types/Types";
import {
  getAttractionsById,
  getNearbyPlaces,
} from "../../service/touristAttractions/touristAttractions";

const AttractionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [attraction, setAttraction] = useState<TouristAttractions | null>(null);
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlace[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    if (!id) return;

    try {
      const attractionId = Number(id);

      const [attractionData, nearbyData] = await Promise.all([
        getAttractionsById({ id: attractionId } as TouristAttractions),
        getNearbyPlaces(attractionId),
      ]);

      if (attractionData?.isSuccess) {
        setAttraction(attractionData.content);
      }

      if (nearbyData?.isSuccess) {
        setNearbyPlaces(nearbyData.content || []);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const formatKinds = (kinds: string): string[] => {
    return kinds
      .split(",")
      .slice(0, 3)
      .map((kind) =>
        kind
          .trim()
          .replace(/_/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase())
      );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-lg text-[#555]">Carregando...</p>
      </div>
    );
  }

  if (!attraction) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p className="text-lg text-[#555]">Atração não encontrada.</p>
        <button
          onClick={() => navigate("/attractions")}
          className="px-4 py-2 bg-[color:var(--primary)] text-[color:var(--white)] rounded-lg border-0 cursor-pointer hover:bg-[color:var(--secondary)] transition-all duration-300"
        >
          Voltar para Atrações
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <button
        onClick={() => navigate("/attractions")}
        className="flex items-center gap-2 mb-6 text-[color:var(--primary)] bg-transparent border-0 cursor-pointer text-base hover:underline"
      >
        <ArrowBackIcon fontSize="small" />
        Voltar para Atrações
      </button>

      <div className="bg-[color:var(--soft-white)] rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-[color:var(--primary)] text-2xl md:text-3xl font-semibold mb-4">
          {attraction.name}
        </h2>
        <p className="text-[#555] text-base mb-6">{attraction.description}</p>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-1 text-[#555]">
            <LocationOnIcon fontSize="small" />
            <span>{attraction.location}</span>
          </div>
          <div className="flex items-center gap-1 text-[#555]">
            <StarIcon fontSize="small" className="text-yellow-500" />
            <span>{Number(attraction.averageRating).toFixed(1)}</span>
          </div>
        </div>
      </div>

      <h3 className="text-xl md:text-2xl mb-6">Pontos de Interesse Próximos</h3>

      {nearbyPlaces.length === 0 ? (
        <p className="text-[#555] text-base">
          Nenhum ponto de interesse encontrado nas proximidades.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2">
          {nearbyPlaces.map((place) => (
            <div
              key={place.xid}
              className="bg-[color:var(--soft-white)] rounded-lg shadow-md p-5 flex items-start gap-3"
            >
              <PlaceIcon className="text-[color:var(--primary)] mt-1" />
              <div>
                <h4 className="text-[color:var(--primary)] font-semibold text-base mb-1">
                  {place.name}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {formatKinds(place.kinds).map((kind) => (
                    <span
                      key={kind}
                      className="text-xs bg-[color:var(--primary)] text-[color:var(--white)] px-2 py-1 rounded-full opacity-80"
                    >
                      {kind}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttractionDetailPage;
