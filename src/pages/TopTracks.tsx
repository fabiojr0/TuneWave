import { useState, useEffect } from "react";
import { useInfos } from "../contexts/InfosContext";
import Button from "../components/Button";
import React from "react";
import Track from "../components/Track";

function TopTracks() {
  const [userTopTracks, setUserTopTracks] = useState<Track[]>();
  const [time_range, setTime_range] = useState<TimeRange>("medium_term");
  const infosContext = useInfos();

  useEffect(() => {
    infosContext
      .fetchTopTracks(time_range)
      .then((data) => {
        if (data) {
          setUserTopTracks(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [infosContext, time_range]);

  return (
    <div className="w-full h-full space-y-4">
      <div className="flex items-center justify-between">
        <Button type="time_range" onClick={() => setTime_range("short_term")}>
          4 Weeks ago
        </Button>
        <Button type="time_range" onClick={() => setTime_range("medium_term")}>
          6 Months ago
        </Button>
        <Button type="time_range" onClick={() => setTime_range("long_term")}>
          All time
        </Button>
      </div>
      <div>
        {userTopTracks &&
          userTopTracks.map((item) => {
            return (
              <React.Fragment key={item.id}>
                <Track infos={item} />
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
}

export default TopTracks;
