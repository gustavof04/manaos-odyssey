import React, { useEffect, useState, useCallback } from "react";
import styles from "./TouristAttractionsPage.module.css";
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
      <h2>Atrações Turísticas</h2>

      <div className={styles.attractionsGrid}>
        {attractions.map((attraction) => (
          <Card
            key={attraction.id}
            title={attraction.name}
            description={attraction.description}
          />
        ))}
      </div>
    </>
  );
};

export default TouristAttractionsPage;
