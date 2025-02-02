import { redirect } from 'next/navigation'

const AuthCallbackPage = async () => {
  
    return redirect(`/admin/dashboard/home`)

}

export default AuthCallbackPage