import authHeader from "./authHeader";

const API_URL = "https://social-web-apii.herokuapp.com/api/posts/";

const PostApi = {
  getPost: async (postId) => {
    const headers = authHeader();
    const res = await fetch(API_URL + postId, {
      method: "GET",
      mode: "cors",
      headers,
    });

    const postData = res.json();
    return postData;
  },

  deletePost: async (postId) => {
    const headers = authHeader();
    const res = await fetch(API_URL + postId, {
      method: "DELETE",
      mode: "cors",
      headers,
    });
    const data = res.json();
    return data;
  },

  getReactions: async (postId) => {
    const headers = authHeader();
    const res = await fetch(API_URL + postId + "/reactions", {
      method: "GET",
      mode: "cors",
      headers,
    });
    const data = res.json();
    return data;
  },

  getComments: async (postId) => {
    const headers = authHeader();
    const res = await fetch(API_URL + postId + "/comments", {
      method: "GET",
      mode: "cors",
      headers,
    });
    const data = res.json();
    return data;
  },

  setReaction: async (postId) => {
    const headers = authHeader();
    const res = await fetch(API_URL + postId + "/set-reaction", {
      method: "POST",
      mode: "cors",
      headers,
    });
    const data = res.json();
    return data;
  },

  removeReaction: async (postId) => {
    const headers = authHeader();
    const res = await fetch(API_URL + postId + "/remove-reaction", {
      method: "POST",
      mode: "cors",
      headers,
    });
    const data = res.json();
    return data;
  },

  getPostsOfUser: async (userId) => {
    const headers = authHeader();
    const res = await fetch(API_URL + "?userId=" + userId, {
      method: "GET",
      mode: "cors",
      headers,
    });

    const data = res.json();
    return data;
  },

  createPost: async (caption, imageURL) => {
    const formData = new FormData();

    formData.append("caption", caption);
    if (imageURL) {
      formData.append("image", imageURL);
    }

    const headers = authHeader();
    const res = await fetch(API_URL, {
      method: "POST",
      mode: "cors",
      headers,
      body: formData,
    });
    const data = res.json();
    return data;
  },

  getMyPosts: async () => {
    const headers = authHeader();
    const res = await fetch(API_URL + "my-posts", {
      method: "GET",
      mode: "cors",
      headers,
    });
    const data = res.json();
    return data;
  },

  deleteComment: async (postId, commentId) => {
    const headers = authHeader();
    const res = await fetch(API_URL + postId + "/comments/" + commentId, {
      method: "DELETE",
      mode: "cors",
      headers,
    });
    const data = res.json();
    return data;
  },

  updateComment: async (postId, commentId, content) => {
    const headers = authHeader();
    const res = await fetch(API_URL + postId + "/comments/" + commentId, {
      method: "PUT",
      mode: "cors",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    const data = res.json();
    return data;
  },

  updatePost: async (postId, caption) => {
    const headers = authHeader();
    const res = await fetch(API_URL + postId, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify({ caption }),
      headers: { ...headers, "Content-Type": "application/json" },
    });
    const data = res.json();
    return data;
  },
};

export default PostApi;
