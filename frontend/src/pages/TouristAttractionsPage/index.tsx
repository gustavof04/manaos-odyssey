import styles from "./TouristAttractionsPage.module.css";
import Card from "../../components/Card";

const TouristAttractionsPage = () => {
  return (
    <>
      <h2>Atrações Turísticas</h2>

      <div className={styles.attractionsGrid}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
};

export default TouristAttractionsPage;
