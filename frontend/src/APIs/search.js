import authHeader from "./authHeader";

const API_URL = "https://social-web-apii.herokuapp.com/api/search";

const SearchApi = {
  searchProfileByName: async (queryString) => {
    const headers = authHeader();
    const res = await fetch(API_URL + "?name=" + queryString, {
      method: "GET",
      mode: "cors",
      headers,
    });
    const data = res.json();
    return data;
  },
};
export default SearchApi;
