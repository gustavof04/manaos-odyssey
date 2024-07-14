import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Container from "../../components/Container";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <>
      <Header />
      <Container>
        <section className={styles.home}>
          <div className={styles.presentation}>
            <p>
              Bem-vindo ao <br />
              <span>Manaos Odyssey</span> <br />
              Faça sua odisséia
            </p>
            <Link
              to="/attractions"
              className={`${styles.btn} ${styles.btnSecondary}`}
            >
              Explorar Manaus
            </Link>
          </div>
          <figure>
            <img className={styles.imgHome} src="/hiking.svg" alt="home img" />
          </figure>
        </section>
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
