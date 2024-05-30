import AuthLogout from "../AuthLogout/AuthLogout";
import AuthProfile from "../AuthProfile/AuthProfile";
import { useAuth0 } from "@auth0/auth0-react";


const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="wrapper">
      <div>Dashboard</div>
      <AuthProfile />
      <AuthLogout />
    </div>
  )

}

export default Dashboard