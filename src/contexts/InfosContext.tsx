import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import Cookies from "js-cookie";
import axios from "axios";

interface InfosContextType {
  myInfos: User | null;
  fetchMyInfos: () => void;
  fetchTopUser: (
    type: string,
    time_range?: string
  ) => Promise<Artist[] | Track[] | undefined>;
}

const InfosContext = createContext<InfosContextType | undefined>(undefined);

interface InfosProviderProps {
  children: ReactNode;
}

const base_url = "https://api.spotify.com/v1";

export const InfosProvider = ({ children }: InfosProviderProps) => {
  const [myInfos, setMyInfos] = useState<User | null>(null);

  useEffect(() => {
    if (Cookies.get("access_token")) {
      fetchMyInfos();
    }
  }, []);

  const fetchMyInfos = async () => {
    try {
      const response = await axios(`${base_url}/me`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      const data = await response.data;
      setMyInfos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTopUser = async (
    type: string,
    time_range: string = "medium_term"
  ) => {
    try {
      const header = {
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      };

      const response = await axios(`${base_url}/me/top/${type}`, {
        headers: header,
        params: {
          limit: 50,
          time_range: time_range,
        },
      });

      const nextPageUrl = response.data.next;
      const data = nextPageUrl
        ? [
            ...response.data.items,
            ...(await axios(nextPageUrl, { headers: header })).data.items,
          ]
        : [...response.data.items];

      return data as Artist[] | Track[];
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <InfosContext.Provider value={{ myInfos, fetchMyInfos, fetchTopUser }}>
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
