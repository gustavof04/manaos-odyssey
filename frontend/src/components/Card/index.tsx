import styles from "./Card.module.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const Card = () => {
  return (
    <section className={styles.card}>
      <h3>Título da Atração</h3>
      <p>Texto descritivo da Atração.</p>
      <div className={styles.cardFooter}>
        <button className={styles.cardButton}>
          <ArrowRightAltIcon />
        </button>
      </div>
    </section>
  );
};

export default Card;
