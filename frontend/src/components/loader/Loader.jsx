import { LuLoaderCircle } from "react-icons/lu";
import "../../style/homepage/loader.css";
function Loader() {
  const token = localStorage.getItem("token");
  return (
    <>
      <div className="loader">
        < LuLoaderCircle  className="spin"/>
      </div>
    </>
  );
}

export default Loader;
