import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserInfo = createContext({
  USER_ID: "",
});

const UserInfoProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("Token Fetched ",token)
    if (token) {
      axios
        .get(`${import.meta.env.VITE_HOST_URL}/getId`, {
          headers: {
            authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          setUserId(res.data.decode.userId);
        });
    }
  }, []);

  return (
    <UserInfo.Provider
      value={{
        USER_ID: userId,
      }}
    >
      {children}
    </UserInfo.Provider>
  );
};

export default UserInfoProvider;
