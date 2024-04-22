import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId as string);
  return (
    <div>
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={userId} data={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostFeed;
