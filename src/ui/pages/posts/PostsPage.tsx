import PostForm from "@/ui/containers/PostForm";
import PostList from "@/ui/containers/PostList";

const PostsPage = () => {
  
  return (
    <div className="container py-6 flex flex-col gap-6">
      <PostForm />
      <PostList />
    </div>
  );
};

export default PostsPage;
