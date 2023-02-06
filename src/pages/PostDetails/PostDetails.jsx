import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./PostDetails.module.css";

import * as postService from "../../services/emotionPostService";

import NewComment from "../../components/NewComment/NewComment";

const PostDetails = ({ user, handleDeletePost }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const handleAddComment = async (commentData) => {
    const newComment = await postService.createComment(id, commentData);
    setPost({ ...post, comments: [...post.comments, newComment] });
  };

  useEffect(() => {
    const fetchPost = async () => {
      const data = await postService.show(id);
      setPost(data);
    };
    fetchPost();
  }, [id]);

  console.log("Post State", post);

  return post ? (
    <main className={styles.container}>
      <div className={styles.postDetailCard}>
        <div className="post-avatar">{post.author.avatar}</div>
        <h2>{post.author.name}</h2>
        <h2>{post.content}</h2>
        <p>{post.emotion}</p>
        {post.author._id === user.profile && (
          <>
            <Link to={`/emotionPosts/${id}/edit`} state={post}>
              Edit
            </Link>
            <button onClick={() => handleDeletePost(id)}>
              <i class="fa-solid fa-trash fa-2x"></i>
            </button>
          </>
        )}
      </div>
      <section>
        <h1>Comments</h1>
        <NewComment handleAddComment={handleAddComment} />
      </section>
    </main>
  ) : (
    <main>
      <p>Loading...</p>
    </main>
  );
};

export default PostDetails;