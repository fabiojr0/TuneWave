import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { SCOPES } from "../utils/utils";
import Cookies from "js-cookie";
import axios from "axios";

interface AuthContextType {
  accessToken: string | null;
  redirectToSpotify: () => void;
  refreshTokens: () => void;
  logout: () => void;
  changeCode: (code: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const redirect_uri = process.env.REDIRECT_URI;

  // useEffect(() => {
  //   const temporizador = setTimeout(() => {
  //     setAccessToken(null);
  //   }, 3600000);

  //   return () => clearTimeout(temporizador);
  // }, [accessToken]);

  useEffect(() => {
    const access_token = Cookies.get("access_token");

    if (!access_token) {
      refreshTokens();
    } else {
      setAccessToken(access_token);
    }
  }, []);

  const redirectToSpotify = () => {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${SCOPES.join(
      "%20"
    )}`;
  };

  const changeCode = async (code: string) => {
    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        {
          grant_type: "authorization_code",
          code,
          redirect_uri: redirect_uri,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(client_id + ":" + client_secret),
          },
        }
      );
      setAccessToken(response.data.access_token);

      Cookies.set("access_token", response.data.access_token, {
        expires: response.data.expires_in / 86400,
      });
      Cookies.set("refresh_token", response.data.refresh_token, {
        expires: 60,
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const refreshTokens = async () => {
    try {
      const refresh_token = Cookies.get("refresh_token");

      if (!refresh_token) {
        return false;
      }

      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        {
          grant_type: "refresh_token",
          refresh_token,
          client_id: client_id,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(client_id + ":" + client_secret),
          },
        }
      );

      setAccessToken(response.data.access_token);

      Cookies.set("access_token", response.data.access_token, {
        expires: response.data.expires_in / 86400,
      });
      Cookies.set("refresh_token", refresh_token, {
        expires: 60,
      });

      window.location.reload();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    setAccessToken(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        redirectToSpotify,
        changeCode,
        refreshTokens,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
