import { styles } from "../Post/Post.module.css";

import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const Post = () => {

  const {id} = useParams()
  const {document: post} = useFetchDocument("posts", id)

  return (
    <div>
      {post ? 
      <>
      <h1>{post.title}</h1>
      </>
      : null}
    </div>
  );
};

export default Post;
