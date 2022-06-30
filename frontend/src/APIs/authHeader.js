export default function authHeader() {
  let accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    accessToken = JSON.parse(accessToken);
    return { Authorization: `Bearer ${accessToken}` };
  }

  return null;
}
