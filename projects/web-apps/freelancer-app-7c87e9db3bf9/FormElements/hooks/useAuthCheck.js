import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useAuthCheck = () => {
  const token = useSelector((state) => state.dynamicModule.auth.login);
  const loginredirect = useSelector((state) => state.dynamicModule.auth.loginredirect);
  // const loader = useSelector((state) => state.dynamicModule.loader.loader);
  console.log("token.keys.length", Object.keys(token).length);

  return useMemo(() => {
    if (Object.keys(token).length !== 0) {
      return "home";
    } 
    else if(loginredirect === true){
      return "login";
    } 
    else {
      return "auth";
    }
    // return "loading";
  }, [token]);
};
