import CommentCard from "../CommentCard/CommentCard";

const Comments = ({ comments, user, post }) => {
  if (!comments) return <h4>No Comments</h4>;

  return (
    <>
      {comments.map((comment) => (
        <CommentCard key={comment._id} post={post} comment={comment} user={user} />
      ))}
    </>
  );
};

export default Comments;
