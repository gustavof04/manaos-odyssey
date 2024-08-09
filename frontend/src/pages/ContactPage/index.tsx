import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import styles from "./ContactPage.module.css";

const ContactPage = () => {
  return (
    <section className={styles.contact}>
      <h2>Contatos</h2>
      <h3>Entre em contato</h3>
      <p>Para que possamos conversar mais sobre a iniciativa.</p>
      <div className={styles.icons}>
        <a
          href="mailto:fernandes.gustavo2910@gmail.com?subject=Dúvida sobre o Manaos Odyssey"
          target="_blank"
        >
          <MailOutlineIcon fontSize="large" />
        </a>
        <a
          href="https://www.linkedin.com/in/gustavofernandes04/"
          target="_blank"
        >
          <LinkedInIcon fontSize="large" />
        </a>
        <a href="https://github.com/gustavof04" target="_blank">
          <GitHubIcon fontSize="large" />
        </a>
      </div>
    </section>
  );
};

export default ContactPage;
