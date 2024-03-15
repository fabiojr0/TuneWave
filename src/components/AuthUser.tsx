import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useInfos } from "../contexts/InfosContext";
import Button from "./Button";

function AuthUser() {
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const infosContext = useInfos();
  const authContext = useAuth();

  const login = () => {
    authContext.redirectToSpotify();
  };

  const logout = () => {
    authContext.logout();
  };

  return (
    <>
      {infosContext.myInfos ? (
        <span onClick={() => setShowLogout(!showLogout)} className="relative">
          <div className="flex items-center gap-2 ">
            <p className="text-sm font-semibold">{infosContext.myInfos.display_name}</p>
            <img
              className="rounded-full h-8 w-8 object-cover border-2 border-zinc-950"
              src={infosContext.myInfos.images[0].url}
              alt={`${infosContext.myInfos.display_name}'s avatar`}
            />
          </div>
          <div
            className={`${
              !showLogout ? "h-0 opacity-0" : "-bottom-6 h-fit opacity-100"
            }  transition-all duration-1000 absolute -bottom-0 right-0 overflow-hidden `}
          >
            <button onClick={logout}>Logout</button>
          </div>
        </span>
      ) : (
        <Button onClick={login}>
          <img src="./Spotify_Icon_RGB_White.png" className="h-6 w-6" />
          Login
        </Button>
      )}
    </>
  );
}

export default AuthUser;
