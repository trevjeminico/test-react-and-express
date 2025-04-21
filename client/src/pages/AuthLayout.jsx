import { Outlet } from "react-router";
import SideNav from "../components/SideNav";
import { hasToken } from "../utilities/AuthValid";
import { Navigate } from "react-router";

const AuthLayout = () => {
  const isLoggedin = hasToken();
  return (
    <div>
      {isLoggedin ? (
        <main className="bg-gray-100 min-h-screen w-full">
          <div className="flex h-full w-full mx-auto">
            <div>
              <SideNav />
            </div>
            <div className="flex flex-col h-full w-full mx-auto  space-y-2">
              <Outlet />
            </div>
          </div>
        </main>
      ) : (
        <Navigate to={"/"} />
      )}
    </div>
  );
};

export default AuthLayout;
