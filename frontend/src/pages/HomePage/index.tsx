import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const HomePage = () => {
  return (
    <>
      <Header />
      <section className="container">
        <div className="presentation">
          <p>
            Bem-vindo ao <br />
            <span>Manaos Odyssey</span> <br />
            Faça sua odisséia
          </p>
          <Link to="/attractions" className="btn btn-secondary">
            Explorar Manaus
          </Link>
        </div>
        <figure>
          <img className="img-home" src="/hiking.svg" alt="home img" />
        </figure>
      </section>
      <Footer />
    </>
  );
};

export default HomePage;
