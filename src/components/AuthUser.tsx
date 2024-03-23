import { useAuth } from '../contexts/AuthContext';
import Button from './Button';
import { useUserData } from '../hooks/useUserData';

function AuthUser() {
  const authContext = useAuth();

  const { data, isLoading } = useUserData();

  const login = () => {
    authContext.redirectToSpotify();
  };

  return (
    <>
      {!isLoading && data ? (
        <span className="relative z-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold">{data?.data.display_name}</p>
            <img
              className="rounded-full h-8 w-8 object-cover border-2 border-zinc-950"
              src={data?.data.images[0].url}
              alt={`${data?.data.display_name}'s avatar`}
              loading="lazy"
            />
          </div>
        </span>
      ) : (
        <Button onClick={login} loading={isLoading}>
          <img src="./Spotify_Icon_RGB_White.png" className="h-6 w-6" />
          Login
        </Button>
      )}
    </>
  );
}

export default AuthUser;
