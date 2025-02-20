import { getUserFromServer } from "@/actions/auth";
import { redirect } from "next/navigation";

const AuthCallbackPage = async () => {
  const user = await getUserFromServer();
  if(user){
    return redirect(`/dashboard/home`);
  }
  return redirect(`/auth/sign-in`);
};

export default AuthCallbackPage;
