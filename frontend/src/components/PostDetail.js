import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentApi from "../APIs/comment";
import colorHeart from "../assets/color-heart.png";
import removeReactionIcon from "../assets/remove-reaction.png";
import PostApi from "../APIs/post";
import useLoggedInUser from "../hooks/useLoggedInUser";
import formatDate from "../helpers/formatDate";

const PostDetail = () => {
  const [author, setAuthor] = useState(null);
  const [post, setPost] = useState(null);
  const [createdComment, setCreatedComment] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [content, setContent] = useState("");
  const [contentToUpdate, setContentToUpdate] = useState("");
  const [liked, setLiked] = useState(null);
  const [showReactions, setShowReactions] = useState(false);

  const [commentOnUpdate, setCommentOnUpdate] = useState(null);
  const [commentOnDelete, setCommentOnDelete] = useState(null);

  const { postId } = useParams();
  const loggedInUser = useLoggedInUser();

  const fetchPost = async () => {
    const data = await PostApi.getPost(postId);
    if (data.post && data.author) {
      setPost(data.post);
      setAuthor(data.author);
      document.title = "Post Details | " + data.post._id;
    }
  };
  const fetchReactions = async () => {
    const data = await PostApi.getReactions(postId);
    if (data.reactions.userList) {
      setReactions(data.reactions.userList);
      if (
        data.reactions.userList.includes(loggedInUser.loggedInUser.user._id)
      ) {
        setLiked(true);
      }
    }
  };

  const fetchCreatedComment = async () => {
    PostApi.getComments(postId).then((data) => {
      if (data.comments) {
        setCreatedComment(data.comments);
      }
    });
  };

  const fetchCreateComment = async () => {
    CommentApi.createComment(postId, content).then((data) => {
      if (data.newComment) {
        setCreatedComment((oldCreatedComment) => [
          data.newComment,
          ...oldCreatedComment,
        ]);
        setContent("");
      } else {
        alert(data.message);
      }
    });
  };

  const fetchSetReaction = async () => {
    PostApi.setReaction(postId).then(() => {
      setLiked(true);
      setReactions((oldState) => [
        ...oldState,
        loggedInUser.loggedInUser.user._id,
      ]);
    });
  };

  const fetchRemoveReaction = async () => {
    PostApi.removeReaction(postId).then(() => {
      setLiked(false);
      setReactions((oldState) => {
        oldState.splice(
          oldState.indexOf(loggedInUser.loggedInUser.user._id),
          1
        );
        return oldState;
      });
    });
  };

  const handleSubmit = async () => {
    fetchCreateComment();
  };

  const handleReaction = async () => {
    fetchSetReaction();
  };

  const handleRemoveReaction = async () => {
    fetchRemoveReaction();
  };

  const handleShowReactions = () => {
    setShowReactions(true);
  };

  useEffect(() => {
    fetchPost();
    fetchCreatedComment();
    fetchReactions();
  }, []);

  if (post && author && reactions && createdComment) {
    let pathToProfile = "/profile/" + author.userId;
    if (author.userId === loggedInUser.loggedInUser.user._id) {
      pathToProfile = "/profile/me";
    }
    return (
      <>
        <Link className="flex items-center" to={pathToProfile}>
          <img
            src={author.avatar}
            className="rounded-full object-contain"
            style={{ height: "40px", width: "40px" }}
          />
          <p className="text-sm ml-2">{author.name}</p>
        </Link>

        <p className="text-sm mb-1 mt-1">
          #postID: <span className="text-red-500">{post._id}</span>
        </p>
        <p className="text-sm mb-1">
          #createdAt:{" "}
          <span className="text-red-500">{formatDate(post.createdAt)}</span>
        </p>
        <p className="text-sm mb-1">
          #updatedAt:{" "}
          <span className="text-red-500">{formatDate(post.updatedAt)}</span>
        </p>
        <p className="text-base text-cyan-800">{post.caption}</p>
        {post.image && (
          <img className="rounded-xl mt-3 w-full h-full" src={post.image} />
        )}

        <div className="flex items-center justify-center mt-1">
          {liked ? (
            <button onClick={handleRemoveReaction}>
              <img style={{ width: "32px" }} src={removeReactionIcon} />
            </button>
          ) : (
            <button onClick={handleReaction}>
              <img src={colorHeart} />
            </button>
          )}
        </div>
        <div className="flex justify-center items-center m-2">
          {reactions.length === 0 ? (
            <p>No one like this post 😭</p>
          ) : (
            <p>{reactions.length} people liked this post</p>
          )}

          {reactions.length != 0 && (
            <button
              onClick={handleShowReactions}
              className="bg-red-400 p-2 rounded-full ml-2"
            >
              Show
            </button>
          )}
        </div>
        {showReactions && (
          <div className="flex justify-center mb-2">
            <div className="border-2 border-gray-400 rounded px-4 py-1">
              <p className="text-sm underline mb-1">Who liked this post?</p>
              <div className="flex flex-col">
                {reactions.map((userId, index) => {
                  let pathToProfile = "/profile/" + userId;
                  if (userId === loggedInUser.loggedInUser.user._id) {
                    pathToProfile = "/profile/me";
                    return (
                      <Link
                        key={index}
                        className="text-sm text-red-400"
                        to={pathToProfile}
                      >
                        You
                      </Link>
                    );
                  }
                  return (
                    <Link
                      key={index}
                      className="text-sm text-cyan-800"
                      to={pathToProfile}
                    >
                      {userId}
                    </Link>
                  );
                })}
                <button
                  onClick={() => setShowReactions(false)}
                  className="bg-red-200 mt-1 rounded py-1"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex mb-2 items-center">
          <input
            className="w-full rounded-lg p-2 border-2 border-gray-300"
            placeholder="> Type a comment..."
            onChange={(e) => setContent(e.target.value)}
            value={content}
            name={content}
          />
          {content && (
            <button
              onClick={handleSubmit}
              className="p-2 bg-red-400 ml-2 rounded-full"
            >
              Submit
            </button>
          )}
        </div>
        {createdComment.length === 0 && (
          <p className="text-gray-400 italic">No comment here</p>
        )}
        {createdComment.map((comment, index) => {
          let pathToProfile = "/profile/" + comment.userId;
          let contentToUpdatePlaceholder = "> " + comment.content;

          if (comment.userId === loggedInUser.loggedInUser.user._id) {
            pathToProfile = "/profile/me";
          }

          const fetchDeleteComment = async () => {
            PostApi.deleteComment(postId, commentOnDelete)
              .then((data) => {
                if (data.deletedComment) {
                  setCreatedComment((oldState) => {
                    for (let i = 0; i < oldState.length; i++) {
                      if (oldState[i]._id === commentOnDelete) {
                        oldState.splice(i, 1);
                        break;
                      }
                    }
                    return oldState;
                  });
                  setCommentOnDelete(null);
                }
              })
              .catch((err) => console.log(err));
          };

          const handleDeleteComment = () => {
            fetchDeleteComment();
          };

          const fetchUpdateComment = async () => {
            PostApi.updateComment(postId, commentOnUpdate, contentToUpdate)
              .then((data) => {
                if (data.updatedComment) {
                  setCreatedComment((oldState) => {
                    for (let i = 0; i < oldState.length; i++) {
                      if (oldState[i]._id === commentOnUpdate) {
                        oldState[i].content = data.updatedComment.content;
                        oldState[i].updatedAt = data.updatedComment.updatedAt;
                        break;
                      }
                    }
                    return oldState;
                  });
                  setCommentOnUpdate(null);
                  setContentToUpdate("");
                } else {
                  alert(data.message);
                }
              })
              .catch((err) => console.log(err));
          };

          const handleUpdateComment = () => {
            fetchUpdateComment();
          };

          return (
            <div key={index} className="text-sm">
              {comment.userId === loggedInUser.loggedInUser.user._id ? (
                <div className="my-2">
                  <Link to={pathToProfile}>
                    <span className="px-2 py-1 rounded-xl bg-red-200">
                      It's your comment
                    </span>
                  </Link>
                </div>
              ) : (
                <div className="my-2">
                  <Link to={pathToProfile}>
                    <span className="px-2 py-1 rounded-xl bg-red-200">
                      Navigate to author's profile
                    </span>
                  </Link>
                </div>
              )}

              <p>
                #createdAt:{" "}
                <span className="text-red-500">
                  {formatDate(comment.createdAt)}
                </span>
              </p>
              <p>
                #updatedAt:{" "}
                <span className="text-red-500">
                  {formatDate(comment.updatedAt)}
                </span>
              </p>
              <p className="text-base text-cyan-800">- {comment.content}</p>

              {comment.userId == loggedInUser.loggedInUser.user._id && (
                <div className="mt-1 flex flex-col">
                  <div>
                    {!(commentOnDelete == comment._id) && (
                      <button
                        onClick={() => {
                          setCommentOnUpdate(comment._id);
                          setCommentOnDelete(null);
                        }}
                        className="p-2 bg-red-400 rounded-full mr-2"
                      >
                        Update
                      </button>
                    )}
                    {!(commentOnUpdate == comment._id) && (
                      <button
                        onClick={() => {
                          setCommentOnDelete(comment._id);
                          setCommentOnUpdate(null);
                        }}
                        className="p-2 bg-red-500 rounded-full"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              )}

              {commentOnUpdate == comment._id && (
                <div className="w-full flex items-center mt-2 text-sm">
                  <input
                    className="w-full rounded-lg border-2 border-gray-300 p-1 pl-2"
                    placeholder={contentToUpdatePlaceholder}
                    type="text"
                    value={contentToUpdate}
                    name="content"
                    onChange={(e) => setContentToUpdate(e.target.value)}
                  />
                  {contentToUpdate && (
                    <button
                      onClick={handleUpdateComment}
                      className="p-1 bg-green-300 ml-1 rounded-full"
                    >
                      Change
                    </button>
                  )}

                  <button
                    className="p-1 bg-red-300 rounded-full ml-1"
                    onClick={() => {
                      setCommentOnUpdate(null);
                      setContentToUpdate("");
                    }}
                  >
                    Close
                  </button>
                </div>
              )}

              {commentOnDelete == comment._id && (
                <div className="w-full flex items-center mt-2 text-sm">
                  <p className="italic">Delete this comment?</p>
                  <button
                    onClick={handleDeleteComment}
                    className="p-1 bg-green-300 mx-2 rounded-full"
                  >
                    Sure
                  </button>
                  <button
                    onClick={() => setCommentOnDelete(null)}
                    className="p-1 bg-red-300 rounded-full"
                  >
                    Close
                  </button>
                </div>
              )}
              <hr className="my-2" />
            </div>
          );
        })}
      </>
    );
  }
};

export default PostDetail;
