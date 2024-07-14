import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <Container>
        <h2 className={styles.errorTitle}>Algo deu errado!</h2>
        <div className={styles.errorMessage}>
          <span className={styles.errorCode}>404</span> <br />
          <strong className={styles.notFoundText}>
            Página não encontrada!
          </strong>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default NotFoundPage;
