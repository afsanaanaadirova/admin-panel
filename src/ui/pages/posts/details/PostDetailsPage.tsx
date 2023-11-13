import { useParams } from "react-router-dom";
import { usePost } from "@/app/api/postApi";

const PostDetailsPage = () => {
  const params = useParams();
  const { data } = usePost(Number(params.postId));

  return (
    <div>
      {
        data && (
          <>
            <h1>{data.title}</h1>
            <h2>{data.description}</h2>
          </>
        )
      }
    </div>
  );
};

export default PostDetailsPage;
