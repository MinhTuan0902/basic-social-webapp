import authHeader from "./authHeader";

const API_URL = "https://social-web-apii.herokuapp.com/api/message";

const MessageApi = {
  getAllMessages: async (userOnConversation) => {
    const headers = authHeader();
    const res = await fetch(API_URL + "?receiver=" + userOnConversation, {
      method: "GET",
      mode: "cors",
      headers,
    });
    const data = res.json();
    return data;
  },

  createNewMessage: async (receiver, content) => {
    const headers = authHeader();
    const res = await fetch(API_URL + "?receiver=" + receiver, {
      method: "POST",
      mode: "cors",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    const data = res.json();
    return data;
  },
};

export default MessageApi;
