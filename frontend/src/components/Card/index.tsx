import { useNavigate } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";

interface Props {
  id: number;
  title: string;
  description: string;
  location: string;
  averageRating: number;
}

const Card = ({ id, title, description, location, averageRating }: Props) => {
  const navigate = useNavigate();

  return (
    <section className="w-[300px] h-[500px] bg-[color:var(--soft-white)] text-[color:var(--gray)] shadow-lg flex flex-col items-center justify-between p-6 rounded-lg lg:transition-transform lg:transform lg:hover:scale-105">
      <h3 className="text-[color:var(--primary)] text-xl font-semibold mb-2">
        {title}
      </h3>
      <p className="text-[#555] text-base mb-4">{description}</p>
      <div className="w-full flex flex-col gap-2 mt-auto">
        <div className="flex items-center gap-1 text-[#555] text-sm">
          <LocationOnIcon fontSize="small" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1 text-[#555] text-sm">
          <StarIcon fontSize="small" className="text-yellow-500" />
          <span>{Number(averageRating).toFixed(1)}</span>
        </div>
        <div className="w-full flex items-center justify-end">
          <button
            onClick={() => navigate(`/attractions/${id}`)}
            className="w-12 h-12 bg-[color:var(--primary)] text-[color:var(--white)] text-2xl flex items-center justify-center cursor-pointer rounded-full border-0 hover:bg-[color:var(--secondary)] transition-all duration-300"
          >
            <ArrowRightAltIcon />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Card;
