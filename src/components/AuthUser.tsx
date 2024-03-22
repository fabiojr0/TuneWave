import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import { useUserData } from "../hooks/useUserData";

function AuthUser() {
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const authContext = useAuth();

  const { data, isLoading } = useUserData();

  const login = () => {
    authContext.redirectToSpotify();
  };

  const logout = () => {
    authContext.logout();
  };

  return (
    <>
      {!isLoading ? (
        <span className="relative z-0">
          <div
            onClick={() => setShowLogout(!showLogout)}
            className="flex items-center gap-2"
          >
            <p className="text-sm font-semibold">{data?.data.display_name}</p>
            <img
              className="rounded-full h-8 w-8 object-cover border-2 border-zinc-950"
              src={data?.data.images[0].url}
              alt={`${data?.data.display_name}'s avatar`}
              loading="lazy"
            />
          </div>
          <div
            className={`${
              !showLogout
                ? "h-0 opacity-0 p-0"
                : "-bottom-8 h-fit opacity-100 p-1"
            }  transition-all duration-1000 absolute -bottom-0 right-0 overflow-hidden bg-black rounded`}
          >
            <button onClick={logout}>Logout</button>
          </div>
        </span>
      ) : (
        <Button
          onClick={login}
          loading={authContext.accessToken && data === null ? true : false}
        >
          <img src="./Spotify_Icon_RGB_White.png" className="h-6 w-6" />
          Login
        </Button>
      )}
    </>
  );
}

export default AuthUser;
