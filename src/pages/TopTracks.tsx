import { useState, useEffect } from "react";
import { useInfos } from "../contexts/InfosContext";
import Button from "../components/Button";
import React from "react";
import Track from "../components/Track";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function TopTracks() {
  const [userTopTracks, setUserTopTracks] = useState<Track[]>();
  const [time_range, setTime_range] = useState<TimeRange>("medium_term");
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingNewInfos, setLoadingNewInfos] = useState<boolean>(false);
  const infosContext = useInfos();

  useEffect(() => {
    setLoadingNewInfos(true);
    infosContext
      .fetchTopUser("tracks", time_range)
      .then((data) => {
        if (data) {
          setUserTopTracks(data as Track[]);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoadingNewInfos(false);
        setLoading(false);
      });
  }, [time_range]);

  return (
    <div className="w-full h-full space-y-4">
      <div className="flex items-center justify-center gap-4">
        <Button
          type="time_range"
          onClick={() => setTime_range("short_term")}
          loading={time_range === "short_term" && loadingNewInfos}
        >
          4 Weeks ago
        </Button>
        <Button
          type="time_range"
          onClick={() => setTime_range("medium_term")}
          loading={time_range === "medium_term" && loadingNewInfos}
        >
          6 Months ago
        </Button>
        <Button
          type="time_range"
          onClick={() => setTime_range("long_term")}
          loading={time_range === "long_term" && loadingNewInfos}
        >
          All time
        </Button>
      </div>
      {loading ? (
        <div className="space-y-4">
          {[...Array(10)].map((_, index) => {
            return (
              <SkeletonTheme
                baseColor="#585555"
                highlightColor="#444"
                key={index}
                width={"100%"}
                height={"100%"}
              >
                <div className="flex items-center pl-4 gap-4 w-full">
                  <Skeleton height={64} width={64} />
                  <div className="w-full">
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </div>
                  <Skeleton height={24} width={24} circle />
                </div>
              </SkeletonTheme>
            );
          })}
        </div>
      ) : (
        <div className="space-y-4">
          {userTopTracks &&
            userTopTracks.map((item, index) => {
              return (
                <React.Fragment key={item.id}>
                  <Track infos={item} index={index + 1} />
                </React.Fragment>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default TopTracks;
