type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return <section className="w-full min-h-[90vh] flex flex-col items-center gap-4 py-[2.5rem]">{children}</section>;
};

export default Container;
