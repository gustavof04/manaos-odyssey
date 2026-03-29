import React, { useEffect, useState, useCallback } from "react";
import Card from "../../components/Card";
import { TouristAttractions } from "../../types/Types";
import { getAttractions } from "../../service/touristAttractions/touristAttractions";

const TouristAttractionsPage: React.FC = () => {
  const [attractions, setAttractions] = useState<TouristAttractions[]>([]);

  const loadData = useCallback(async () => {
    try {
      const attractionsData = await getAttractions();
      if (attractionsData?.isSuccess) {
        setAttractions(attractionsData?.content);
      }
    } catch (err: any) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <h2 className="text-2xl md:text-3xl lg:text-4xl">Atrações Turísticas</h2>

      <div className="grid grid-cols-1 gap-12 m-7 md:grid-cols-2 lg:grid-cols-3">
        {attractions.map((attraction) => (
          <Card
            key={attraction.id}
            id={attraction.id!}
            title={attraction.name}
            description={attraction.description}
            location={attraction.location}
            averageRating={attraction.averageRating}
          />
        ))}
      </div>
    </>
  );
};

export default TouristAttractionsPage;
