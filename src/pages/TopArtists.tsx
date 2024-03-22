import { useState } from "react";
import Button from "../components/Button";
import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Artist from "../components/Artist";
import Login from "../components/Login";
import { useAuth } from "../contexts/AuthContext";
import { useFetchTopArtists } from "../hooks/useFetchTopArtists";

function TopArtists() {
  const [time_range, setTime_range] = useState<TimeRange>("medium_term");
  const authContext = useAuth();

  const { data: userTopArtists, isLoading } = useFetchTopArtists(time_range);

  if (!authContext.accessToken) {
    return <Login />;
  }

  return (
    <main className="w-full h-full space-y-4">
      <div className="flex items-center justify-center gap-4">
        <Button
          type="time_range"
          onClick={() => setTime_range("short_term")}
          loading={time_range === "short_term" && isLoading}
          selected={time_range === "short_term"}
        >
          4 Weeks ago
        </Button>
        <Button
          type="time_range"
          onClick={() => setTime_range("medium_term")}
          loading={time_range === "medium_term" && isLoading}
          selected={time_range === "medium_term"}
        >
          6 Months ago
        </Button>
        <Button
          type="time_range"
          onClick={() => setTime_range("long_term")}
          loading={time_range === "long_term" && isLoading}
          selected={time_range === "long_term"}
        >
          All time
        </Button>
      </div>

      <div className="space-y-4">
        {userTopArtists?.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Artist infos={item} index={index + 1} />
            </React.Fragment>
          );
        })}
      </div>
    </main>
  );
}

export default TopArtists;
