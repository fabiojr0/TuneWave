import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useInfos } from "../contexts/InfosContext";
import { ring2 } from "ldrs";
import TrackScreen from "../components/TrackScreen";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function ShowTrack() {
  const { id } = useParams();
  const [infos, setInfos] = useState<Track>();
  const infosContext = useInfos();

  useEffect(() => {
    id &&
      infosContext
        .fetchTrackInfos(id)
        .then((data) => {
          setInfos(data);
          console.log(data);
        })
        .catch((error) => console.log(error));
  }, [id]);

  ring2.register();

  return (
    <div>
      {infos ? (
        <TrackScreen infos={infos} />
      ) : (
        <div className="space-y-2">
          <SkeletonTheme
            baseColor="#585555"
            highlightColor="#444"
            width={"100%"}
            height={"100%"}
          >
            <div className="space-y-2">
              <div className="w-full aspect-square">
                <Skeleton height={"100%"} width={"100%"} />
              </div>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
          </SkeletonTheme>
        </div>
      )}
    </div>
  );
}

export default ShowTrack;
