import { type ProductCardType } from "./productCard";
import Button from "@/ui/shared/Button";
import { EButtonVariants } from "@/data/enum/button.enum";
import { Link } from "react-router-dom";

const ProductCard = ({
  id,
  name,
  description,
  category,
  price,
  image,
  deleteHandler,
}: ProductCardType) => {
 
  return (
    <>
      <div className="grid grid-cols-[214px,1fr] border rounded border-indigo-200 rounded bg-blue-500 shadow-lg shadow-blue-500/50">
        <div className="flex justify-center items-center border-r-2 border-r-indigo-100 w-[214px] p-2">
          <img
            className="w-[150px] h-[150px] object-contain"
            src={image}
            alt="no photo"
          />
        </div>
        <div className="flex flex-col justify-between p-4">
          <div>
            <h2 className="font-semibold pr-4">{name}</h2>
            <h6>category: {category}</h6>
          </div>
          <p className="py-4">{description}</p>
          <span className="pb-2">Price: {price}</span>
          <div className="flex gap-x-2">
           <Link to={id.toString()}>
            <Button variant={EButtonVariants.BORDERLINE}>
              Edit
            </Button>
            </Link>
            <Button
              variant={EButtonVariants.BORDERLINE}
              onClick={deleteHandler}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductCard;
