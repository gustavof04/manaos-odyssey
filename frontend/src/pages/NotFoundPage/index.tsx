import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <>
      <h2 className={styles.errorTitle}>Algo deu errado!</h2>
      <div className={styles.errorMessage}>
        <span className={styles.errorCode}>404</span> <br />
        <strong className={styles.notFoundText}>Página não encontrada!</strong>
      </div>
    </>
  );
};

export default NotFoundPage;
