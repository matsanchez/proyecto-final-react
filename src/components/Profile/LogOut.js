import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const LogOut = () => {
  const navigate = useNavigate();
  const { setLogOut } = useAuth();

  setLogOut();
  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return <></>;
};
