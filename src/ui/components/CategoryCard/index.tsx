import { EButtonVariants } from "@/data/enum/button.enum";
import { type CategoryCardType } from "./categoryCard";
import Button from "@/ui/shared/Button";
import { Link } from "react-router-dom";

const CategoryCard = ({ id, name, deleteHandler }: CategoryCardType) => {
  return (
    <>
      <div className="relative flex flex-col gap-4 p-4 border border-indigo-200 rounded bg-blue-500 shadow-lg shadow-blue-500/50 overflow-hidden">
        <h2 className="font-semibold pr-4">{name}</h2>
        <div className="flex gap-x-2">
          <Link to={id ? id.toString() : "#"}>
            <Button variant={EButtonVariants.BORDERLINE}>Edit</Button>
          </Link>
          <Button variant={EButtonVariants.BORDERLINE} onClick={deleteHandler}>
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
