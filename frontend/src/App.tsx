import "./App.css";
import Footer from "./components/FooterComponent";
import Header from "./components/HeaderComponent";

function App() {
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
}

export default App;
