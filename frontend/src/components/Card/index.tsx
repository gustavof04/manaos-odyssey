import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import { getAttractionImage } from "../../service/touristAttractions/touristAttractions";

interface Props {
  id: number;
  title: string;
  description: string;
  location: string;
  averageRating: number;
}

const Card = ({ id, title, description, location, averageRating }: Props) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    getAttractionImage(id)
      .then((data) => {
        if (data?.isSuccess) {
          setImageUrl(data.content.imageUrl);
        }
      })
      .catch(() => {});
  }, [id]);

  return (
    <section className="w-[300px] h-[500px] bg-[color:var(--soft-white)] text-[color:var(--gray)] shadow-lg flex flex-col rounded-lg overflow-hidden lg:transition-transform lg:transform lg:hover:scale-105">
      <div className="w-full h-[200px] bg-gray-200">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            Sem imagem
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 items-center justify-between p-5">
        <h3 className="text-[color:var(--primary)] text-xl font-semibold mb-2">
          {title}
        </h3>
        <p className="text-[#555] text-sm mb-4 line-clamp-3">{description}</p>
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
      </div>
    </section>
  );
};

export default Card;
