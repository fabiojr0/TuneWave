import { useAuth } from "../contexts/AuthContext";
import Button from "./UI_Kit/Button";

function Login() {
  const authContext = useAuth();

  const login = () => {
    authContext.redirectToSpotify();
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2 pt-20 text-center">
      <img
        src="../../Spotify_Icon_RGB_Green.png"
        alt="Spotify logo"
        className="w-24 h-24"
      />
      <span className="flex flex-col justify-center items-center">
        <h2 className="font-semibold text-lg flex gap-1">
          Welcome To Sound Scout!
        </h2>
        <p className="font-medium">Log in to access your information.</p>
      </span>
      <Button onClick={login} loading={authContext.accessToken ? true : false}>
        <img src="./Spotify_Icon_RGB_White.png" className="h-6 w-6" />
        Login
      </Button>
    </div>
  );
}

export default Login;
