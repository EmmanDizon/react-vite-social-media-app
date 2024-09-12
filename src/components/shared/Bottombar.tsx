import { bottombarLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";

const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar">
      {bottombarLinks.map((s) => {
        const isActive = pathname === s.route;
        return (
          <Link
            className={`group ${
              isActive &&
              "bg-primary-500 rounded-[10px] flex-center flex-col gap-1 p-2 transition"
            }`}
            key={s.label}
            to={s.route}
          >
            <img
              src={s.imgURL}
              alt={s.label}
              width={16}
              height={16}
              className={`${isActive && "invert-white"}`}
            />
            <p className="tiny-medium text-light-2"> {s.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
