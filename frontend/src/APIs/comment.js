import authHeader from "./authHeader";

const API_URL = "https://social-web-apii.herokuapp.com/api/posts/";

const CommentApi = {
  createComment: async (postId, content) => {
    const headers = authHeader();
    const res = await fetch(API_URL + postId + "/comments", {
      method: "POST",
      mode: "cors",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    const data = res.json();
    return data;
  },

  getCommentOfPost: async (postId) => {},
};

export default CommentApi;
