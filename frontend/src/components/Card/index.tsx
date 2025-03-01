import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

interface Props {
  title: string;
  description: string;
}

const Card = ({ title, description }: Props) => {
  return (
    <section className="w-[300px] h-[400px] bg-[color:var(--soft-white)] text-[color:var(--gray)] shadow-[5px_5px_10px_#22222270] flex flex-col items-center justify-between p-5 rounded-lg">
      <h3 className="text-[color:var(--primary)]">{title}</h3>
      <p className="text-[#555]">{description}</p>
      <div className="w-full flex items-center justify-end">
        <button className="w-10 h-10 bg-[color:var(--primary)] text-[color:var(--white)] text-2xl flex items-center justify-center cursor-pointer rounded-lg border-0 hover:bg-[color:var(--secondary)] hover:transition-all hover:duration-[0.5s]">
          <ArrowRightAltIcon />
        </button>
      </div>
    </section>
  );
};

export default Card;
