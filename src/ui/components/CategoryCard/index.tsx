import { EButtonVariants } from "@/data/enum/button.enum";
import { type CategoryCardType } from "./categoryCard";
import Button from "@/ui/shared/Button";

const PostCard = ({ categoryName,deleteHandler}: CategoryCardType) => {
  return (
    <>
      <div className="relative flex flex-col gap-4 p-4 border rounded overflow-hidden">
        <h2 className="font-semibold pr-4">{categoryName}</h2>
        <div className="flex gap-x-2">
            {/* <Button variant={EButtonVariants.BORDERLINE}>Edit</Button> */}
            <Button
              variant={EButtonVariants.BORDERLINE}
              onClick={deleteHandler}
            >
              Delete
            </Button>
          </div>
      </div>
    </>
  );
};

export default PostCard;
