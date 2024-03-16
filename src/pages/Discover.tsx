import { useEffect, useState } from "react";
import { useInfos } from "../contexts/InfosContext";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Track from "../components/Track";
import Button from "../components/Button";

function Discover() {
  const [recommendations, setRecommendations] = useState<Track[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const infosContext = useInfos();

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const topGenres = await infosContext.fetchTopGenres(5);

      if (topGenres !== undefined) {
        const data = await infosContext.fetchReccomendations(topGenres);
        if (data) {
          setRecommendations(data);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div>
      {recommendations ? (
        <div className="space-y-4">
          <span className="flex items-center justify-between">
            <span>
              <h2 className="font-semibold text-lg">
                Reccomended tracks for you
              </h2>
              <p className="text-zinc-300 text-sm">Based on your top genres</p>
            </span>
            <Button onClick={fetchRecommendations} loading={loading}>
              Retry
            </Button>
          </span>
          {recommendations.map((item, index) => {
            return (
              <React.Fragment key={item.id}>
                <Track infos={item} index={index + 1} />
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        <div className="space-y-4">
          <SkeletonTheme
            baseColor="#585555"
            highlightColor="#444"
            width={"100%"}
            height={"100%"}
          >
            <Skeleton width={"70%"} />

            {[...Array(10)].map((_, index) => {
              return (
                <div
                  className="flex items-center pl-4 gap-4 w-full"
                  key={index}
                >
                  <Skeleton height={64} width={64} />
                  <div className="w-full">
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </div>
                  <Skeleton height={24} width={24} circle />
                </div>
              );
            })}
          </SkeletonTheme>
        </div>
      )}
    </div>
  );
}

export default Discover;
