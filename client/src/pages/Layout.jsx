import { Navigate, Outlet } from "react-router";
import { hasToken } from "../utilities/AuthValid";
const Layout = () => {
  const isLoggedin = hasToken();
  return (
    <>
      {isLoggedin ? (
        <Navigate to={"/dashboard"} />
      ) : (
        <main className="App">
          <div className="w-full h-screen justify-items-center place-content-center">
            <Outlet />
          </div>
        </main>
      )}
    </>
  );
};

export default Layout;
