import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const ContactPage = () => {
  return (
    <section className="w-full max-w-2xl m-auto flex flex-col items-center justify-center gap-8 p-6 text-primary">
      <h2 className="text-3xl font-bold">Contatos</h2>
      <h3 className="text-xl font-semibold">Entre em contato</h3>
      <p className="text-center text-wrap text-lg">
        Para que possamos conversar mais sobre a iniciativa.
      </p>
      <div className="flex items-center justify-center gap-6">
        <a
          className="text-primary transition-all hover:text-secondary hover:scale-110"
          href="mailto:fernandes.gustavo2910@gmail.com?subject=Dúvida sobre o Manaos Odyssey"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MailOutlineIcon fontSize="large" />
        </a>
        <a
          className="text-primary transition-all hover:text-secondary hover:scale-110"
          href="https://www.linkedin.com/in/gustavofernandes04/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon fontSize="large" />
        </a>
        <a
          className="text-primary transition-all hover:text-secondary hover:scale-110"
          href="https://github.com/gustavof04"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon fontSize="large" />
        </a>
      </div>
    </section>
  );
};

export default ContactPage;
