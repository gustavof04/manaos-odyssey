import styles from "./AttractionsPage.module.css";
import Card from "../../components/Card";

const AttractionsPage = () => {
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

export default AttractionsPage;
