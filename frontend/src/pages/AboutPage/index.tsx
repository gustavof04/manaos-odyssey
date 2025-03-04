const AboutPage = () => {
  return (
    <section className="w-full max-w-4xl m-auto flex flex-col items-center justify-center gap-8 p-6 text-primary">
      <h2 className="text-3xl font-bold">Sobre</h2>
      <p className="text-center text-lg">
        Você está no Manaos Odyssey, uma iniciativa dedicada a promover as
        maravilhas turísticas de Manaus. O objetivo é facilitar a exploração do patrimônio cultural e 
        natural rico que é a capital do Amazonas, ajudando
        visitantes a planejar suas viagens e explorar tudo o que Manaus tem a
        oferecer.
      </p>
      <img src="./amazon_theater.png" alt="Teatro Amazonas" className="w-full h-auto rounded-lg shadow-lg" />
      <p className="text-center text-lg">
        Nossa equipe é composta por apaixonados por viagens e turismo, que trabalham
        incansavelmente para trazer as melhores dicas e recomendações. Esperamos que
        você aproveite sua visita ao nosso site e que ele seja útil para sua jornada.
      </p>
    </section>
  );
};

export default AboutPage;
