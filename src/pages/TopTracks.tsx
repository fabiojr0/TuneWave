import { useState, useEffect } from "react";
import { useInfos } from "../contexts/InfosContext";
import Button from "../components/Button";
import React from "react";
import Track from "../components/Track";
import "react-loading-skeleton/dist/skeleton.css";

function TopTracks() {
  const [userTopTracks, setUserTopTracks] = useState<Track[]>([...Array(10)]);
  const [time_range, setTime_range] = useState<TimeRange>("medium_term");
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
      });
  }, [time_range]);

  return (
    <div className="w-full h-full space-y-4">
      <div className="flex items-center justify-center gap-4">
        <Button
          type="time_range"
          onClick={() => setTime_range("short_term")}
          loading={time_range === "short_term" && loadingNewInfos}
          selected={time_range === "short_term"}
        >
          4 Weeks ago
        </Button>
        <Button
          type="time_range"
          onClick={() => setTime_range("medium_term")}
          loading={time_range === "medium_term" && loadingNewInfos}
          selected={time_range === "medium_term"}
        >
          6 Months ago
        </Button>
        <Button
          type="time_range"
          onClick={() => setTime_range("long_term")}
          loading={time_range === "long_term" && loadingNewInfos}
          selected={time_range === "long_term"}
        >
          All time
        </Button>
      </div>
      <div className="space-y-4">
        {userTopTracks.map((item, index) => {
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

export default TopTracks;
