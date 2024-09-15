const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center flex-col m-auto">
      <h2 className="text-xl mb-8 lg:text-2xl">Algo deu errado!</h2>
      <span className="font-bold text-red text-9xl">404</span> <br />
      <strong className="text-2xl text-red lg:text-3xl">
        Página não encontrada!
      </strong>
    </div>
  );
};

export default NotFoundPage;
