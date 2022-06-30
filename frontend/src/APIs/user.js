import authHeader from "./authHeader";

const UserApi = {
  register: async (registerData) => {
    const res = await fetch(
      "https://social-web-apii.herokuapp.com/api/users/register",
      {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(registerData),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = res.json();
    return data;
  },

  getUsers: async () => {
    const headers = authHeader();
    const res = await fetch("https://social-web-apii.herokuapp.com/api/users", {
      method: "GET",
      mode: "cors",
      headers,
    });
    const data = res.json();
    return data;
  },
};

export default UserApi;
