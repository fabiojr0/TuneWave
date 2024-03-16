import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

function Callback() {
  const [loading, setLoading] = useState<boolean>();
  const location = useLocation();
  const authContext = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const login = async () => {
      setLoading(true);
      const code = await new URLSearchParams(location.search).get("code");
      if (code) {
        const response = await authContext.changeCode(code);
        if (response) {
          navigate("/");
          window.location.reload();
        }
      }
      setLoading(false);
    };
    login();
  }, [authContext, location.search, navigate]);

  return <div>{loading && <p>Loading...</p>}</div>;
}

export default Callback;
