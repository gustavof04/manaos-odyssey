import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

interface Props {
  title: string;
  description: string;
}

const Card = ({ title, description }: Props) => {
  return (
    <section className="w-[300px] h-[500px] bg-[color:var(--soft-white)] text-[color:var(--gray)] shadow-lg flex flex-col items-center justify-between p-6 rounded-lg lg:transition-transform lg:transform lg:hover:scale-105">
      <h3 className="text-[color:var(--primary)] text-xl font-semibold mb-2">{title}</h3>
      <p className="text-[#555] text-base mb-4">{description}</p>
      <div className="w-full flex items-center justify-end mt-auto">
        <button className="w-12 h-12 bg-[color:var(--primary)] text-[color:var(--white)] text-2xl flex items-center justify-center cursor-pointer rounded-full border-0 hover:bg-[color:var(--secondary)] transition-all duration-300">
          <ArrowRightAltIcon />
        </button>
      </div>
    </section>
  );
};

export default Card;
