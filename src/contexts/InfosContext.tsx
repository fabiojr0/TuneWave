import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useAuth } from "./AuthContext";

interface InfosContextType {
  myInfos: User | null;
  fetchMyInfos: () => void;
  fetchTopUser: (
    type: string,
    time_range?: string
  ) => Promise<Artist[] | Track[] | undefined>;
  fetchFabiojr0sPlaylists: () => Promise<Playlist[] | undefined>;
  followPlaylist: (playlist_id: string) => Promise<boolean | undefined>;
  unfollowPlaylist: (playlist_id: string) => Promise<boolean | undefined>;
}

const InfosContext = createContext<InfosContextType | undefined>(undefined);

interface InfosProviderProps {
  children: ReactNode;
}

const base_url = "https://api.spotify.com/v1";
const fabiojr0_id = "21sgcpvydztoxlgbj7ay3u2la";

export const InfosProvider = ({ children }: InfosProviderProps) => {
  const [myInfos, setMyInfos] = useState<User | null>(null);

  const authContext = useAuth();

  const headers = {
    Authorization: `Bearer ${
      Cookies.get("access_token") || authContext.accessToken
    }`,
  };

  useEffect(() => {
    if (Cookies.get("access_token") || authContext.accessToken) {
      fetchMyInfos();
    }
  }, []);

  const fetchMyInfos = async () => {
    if (Cookies.get("access_token") || authContext.accessToken) {
      try {
        const response = await axios(`${base_url}/me`, { headers });
        const data = await response.data;
        setMyInfos(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchTopUser = async (
    type: string,
    time_range: string = "medium_term"
  ) => {
    if (Cookies.get("access_token") || authContext.accessToken) {
      try {
        const response = await axios(`${base_url}/me/top/${type}`, {
          headers,
          params: {
            limit: 50,
            time_range: time_range,
          },
        });

        const nextPageUrl = response.data.next;
        const data = nextPageUrl
          ? [
              ...response.data.items,
              ...(await axios(nextPageUrl, { headers })).data.items,
            ]
          : [...response.data.items];

        return data as Artist[] | Track[];
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchFabiojr0sPlaylists = async () => {
    if (Cookies.get("access_token") || authContext.accessToken) {
      try {
        const response = await axios.get(
          `${base_url}/users/${fabiojr0_id}/playlists`,
          {
            headers,
            params: {
              limit: 50,
            },
          }
        );
        const data = await response.data.items;

        const userFollowedPlaylists = await axios.get(
          `${base_url}/me/playlists/`,
          {
            headers,
            params: {
              limit: 50,
            },
          }
        );

        const user_playlist_ids = await userFollowedPlaylists.data.items.map(
          (playlist: Playlist) => playlist.id
        );

        data.forEach((playlist: Playlist) => {
          playlist.followed = user_playlist_ids.find(
            (item: string) => item === playlist.id
          );
        });

        return data;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const followPlaylist = async (playlist_id: string) => {
    if (Cookies.get("access_token") || authContext.accessToken) {
      try {
        await axios.put(
          `${base_url}/playlists/${playlist_id}/followers`,
          { public: false },
          {
            headers,
          }
        );

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  };

  const unfollowPlaylist = async (playlist_id: string) => {
    if (Cookies.get("access_token") || authContext.accessToken) {
      try {
        await axios.delete(`${base_url}/playlists/${playlist_id}/followers`, {
          headers,
        });

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  };

  return (
    <InfosContext.Provider
      value={{
        myInfos,
        fetchMyInfos,
        fetchTopUser,
        fetchFabiojr0sPlaylists,
        followPlaylist,
        unfollowPlaylist,
      }}
    >
      {children}
    </InfosContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useInfos = () => {
  const context = useContext(InfosContext);
  if (context === undefined) {
    throw new Error("useInfos must be used within a InfosProvider");
  }
  return context;
};
