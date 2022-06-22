import Consignee from "../../Components/Consignee/Consignee";
import { userContext } from "../../Context/GlobalState";
import { useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Supplier = () => {
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

  return <Consignee consigneeType="supplier" />;
};
export default Supplier;
