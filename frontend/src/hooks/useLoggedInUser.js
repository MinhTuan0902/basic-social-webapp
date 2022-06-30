import { useSelector } from "react-redux";

export default function useLoggedInUser() {
  const user = useSelector((state) => state.user);
  if (user && user.loggedInUser !== null && user.accessToken !== null) {
    return user;
  }

  return null;
}
