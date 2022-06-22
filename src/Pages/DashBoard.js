import { useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../Context/GlobalState";

const DashBoard = () => {
  const { user, setUser } = useContext(userContext);
  const didMount = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (didMount.current) {
      if (!user) {
        navigate("/login");
      }
    } else didMount.current = true;
  }, [user]);

  return <button className="button btn btn-success mt-4">Login</button>;
};

export default DashBoard;
