import styles from "./Card.module.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

interface Props {
  title: string;
  description: string;
}

const Card = ({ title, description }: Props) => {
  return (
    <section className={styles.card}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles.cardFooter}>
        <button className={styles.cardButton}>
          <ArrowRightAltIcon />
        </button>
      </div>
    </section>
  );
};

export default Card;
