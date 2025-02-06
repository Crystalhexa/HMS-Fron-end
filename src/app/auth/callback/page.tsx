import { redirect } from 'next/navigation'

const AuthCallbackPage = async () => {
  
    return redirect(`/dashboard/home`)

}

export default AuthCallbackPage