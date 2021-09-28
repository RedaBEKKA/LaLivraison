import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.png";
import logo2 from "../../assets/user.jpg";

import MenuItem from "./MenuItem";


/**
 * @author
 * @function SideMenu
 **/

// added more menuItems for testing
export const menuItems = [
    {
        name: "Dashboard",
        exact: true,
        to: "/dashborad",
        iconClassName: "bi bi-speedometer2",
    },
    {
        name: "Profile",
        exact: true,
        to: "/profile",
        iconClassName: "bi bi-person-square",
    },
    {
        name: "Nos partenaires",
        exact: true,
        to: '/profile',
        iconClassName: "bi bi-award",
        subMenus: [
            { name: "Restaurants", to: "/partenaires/Restaurants" },
            { name: "pâtisseries", to: "/partenaires/pâtisseries" },
        ],
    },
    { name: "A propos", to: `/apropos`, iconClassName: "bi bi-exclamation-circle" },

];

const SideMenu = (props) => {
    const auth = useSelector(state => state.auth)

    // console.log(`auth`, auth)
    // console.log(`token auth`, token)
    const { user, isLogged } = auth
    const [inactive, setInactive] = useState(false);

    //   useEffect(() => {
    //     if (inactive) {
    //       removeActiveClassFromSubMenu();
    //     }

    //     props.onCollapse(inactive);
    //   }, [inactive]);

    //just an improvment and it is not recorded in video :(
    const removeActiveClassFromSubMenu = () => {
        document.querySelectorAll(".sub-menu").forEach((el) => {
            el.classList.remove("active");
        });
    };

    /*just a little improvement over click function of menuItem
      Now no need to use expand state variable in MenuItem component
    */
    useEffect(() => {
        let menuItems = document.querySelectorAll(".menu-item");
        menuItems.forEach((el) => {
            el.addEventListener("click", (e) => {
                const next = el.nextElementSibling;
                removeActiveClassFromSubMenu();
                menuItems.forEach((el) => el.classList.remove("active"));
                el.classList.toggle("active");
                console.log(next);
                if (next !== null) {
                    next.classList.toggle("active");
                }
            });
        });
    }, []);

    return (
        <div className={`side-menu ${inactive ? "inactive" : ""}`}>
            <div className="top-section">
                <div className="logo">
                    <img src={logo} alt="webscript" />
                </div>
                <div onClick={() => setInactive(!inactive)} className="toggle-menu-btn">
                    {inactive ? (
                        <i class="bi bi-arrow-right-square-fill"></i>
                    ) : (
                        <i class="bi bi-arrow-left-square-fill"></i>
                    )}
                </div>
            </div>

            <div className="search-controller">
                <button className="search-btn">
                    <i class="bi bi-search"></i>
                </button>

                <input type="text" placeholder="search" />
            </div>

            <div className="divider"></div>

            <div className="main-menu">

                {menuItems.map((menuItem, index) => (
                    <MenuItem
                        key={index}
                        name={menuItem.name}
                        exact={menuItem.exact}
                        to={menuItem.to}
                        subMenus={menuItem.subMenus || []}
                        iconClassName={menuItem.iconClassName}
                        onClick={(e) => {
                            if (inactive) {
                                setInactive(false);
                            }
                        }}
                    />
                ))}

                {/* <div className='container-item'>
                    <a className="menu-item">
                        <div className="menu-icon">
                            <i class="bi bi-speedometer2"></i>
                        </div>
                        <span>Dashboard</span>
                    </a>
                </div> */}
                {/* <MenuItem
            name={"Content"}
            subMenus={[{ name: "Courses" }, { name: "Videos" }]}
          /> */}
                {/* <div className='container-item'>
                    <a className="menu-item">
                        <div className="menu-icon">
                            <i class="bi bi-person-square"></i>
                        </div>
                        <span>Profile</span>
                    </a>
                </div> */}
                {/* <div className='container-item'>
                    <a className="menu-item">
                        <div className="menu-icon">
                            <i class="bi bi-award"></i>
                        </div>
                        <span>Nos partenaires</span>
                    </a>
                </div> */}

            </div>

            <div className="side-menu-footer">
                <div className="avatar">
                    <img src={logo2} alt="user" />
                </div>
                <div className="user-info">
                    <h5>{user.fullName}</h5>
                    <p>{user.email}</p>
                </div>
            </div>
        </div>
    );
};

export default SideMenu;