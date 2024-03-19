import { useEffect, useState } from "react";
import { useInfos } from "../contexts/InfosContext";
import React from "react";
import Track from "../components/Track";
import Login from "../components/Login";
import { useAuth } from "../contexts/AuthContext";

function Discover() {
  const [recommendations, setRecommendations] = useState<Track[]>([
    ...Array(10),
  ]);
  const infosContext = useInfos();
  const authContext = useAuth();

  const fetchRecommendations = async () => {
    try {
      const topGenres = await infosContext.fetchTopGenres(5);

      if (topGenres !== undefined) {
        const data = await infosContext.fetchReccomendations(
          topGenres,
          null,
          null
        );
        if (data) {
          setRecommendations(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  if (!authContext.accessToken) {
    return <Login />;
  }

  return (
    <div>
      <div className="space-y-4">
        <span className="flex items-center justify-between">
          <span>
            <h2 className="font-semibold text-lg">
              Reccomended tracks for you
            </h2>
            <p className="text-zinc-300 text-sm">Based on your top genres</p>
          </span>
        </span>
        {recommendations.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Track infos={item} index={index + 1} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default Discover;
