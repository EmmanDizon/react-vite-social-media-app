import { sidebarLinks } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const LeftSideBar = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>

        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((s) => {
            const isActive = pathname === s.route;
            return (
              <li
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
                key={s.label}
              >
                <NavLink to={s.route} className="flex gap-4 items-center p-3">
                  <img
                    src={s.imgURL}
                    alt={s.label}
                    className={`group-hover:invert-white  ${
                      isActive && "invert-white"
                    }`}
                  />
                  {s.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default LeftSideBar;
