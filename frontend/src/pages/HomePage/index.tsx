import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <section className="w-full min-h-screen flex justify-center items-center md:justify-around">
      <div className="flex flex-col justify-center items-center lg:block">
        <p className="text-3xl font-bold mb-8 text-center lg:text-5xl lg:font-bold lg:mb-12 lg:text-start">
          Bem-vindo ao <br />
          <span className="text-center text-secondary">
            Manaos Odyssey
          </span>{" "}
          <br />
          Faça sua odisséia
        </p>
        <Link
          to="/attractions"
          className="w-64 h-12 text-lg font-bold rounded-lg cursor-pointer flex items-center justify-center no-underline bg-secondary text-white lg:hover:bg-primary"
        >
          Explorar Manaus
        </Link>
      </div>
      <figure>
        <img
          className="h-80 hidden md:block"
          src="/hiking.svg"
          alt="home img"
        />
      </figure>
    </section>
  );
};

export default HomePage;
