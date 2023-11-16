import { EButtonVariants } from "@/data/enum/button.enum";
import { type CategoryCardType } from "./categoryCard";
import Button from "@/ui/shared/Button";
import { Link } from "react-router-dom";

const PostCard = ({ id, categoryName, deleteHandler }: CategoryCardType) => {
  return (
    <>
      <div className="relative flex flex-col gap-4 p-4 border rounded overflow-hidden">
        <h2 className="font-semibold pr-4">{categoryName}</h2>
        <div className="flex gap-x-2">
          <Link to={id ? id.toString() : '#'}>
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

export default PostCard;
