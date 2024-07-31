import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserInfo = createContext({
  USER_ID:""
});

const UserInfoProvider = ({ children }) => {
  const [userId, setUserId] = useState('')
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if(token){
      axios.post("http://localhost:3000/getId", { token }).then((res) => {
        setUserId(res.data.decode.userId)
      });
    }
  }, []);

  return <UserInfo.Provider value={{
    USER_ID:userId
  }}>{children}</UserInfo.Provider>;
};

export default UserInfoProvider;
