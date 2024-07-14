import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Home = () => {
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
          <button className="btn btn-secondary">Explorar Manaus</button>
        </div>
        <figure>
          <img className="img-home" src="/hiking.svg" alt="home img" />
        </figure>
      </section>
      <Footer />
    </>
  );
};

export default Home;
