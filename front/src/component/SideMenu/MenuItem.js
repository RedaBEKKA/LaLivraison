import React, { useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";

/**
 * @author
 * @function MenuItem
 **/

const MenuItem = (props) => {
    const { name, subMenus, iconClassName, onClick, to, exact } = props;
    const [expand, setExpand] = useState(false);
//console.log(subMenus)
    return (
        // <div className='item-menu'>
            <div onClick={props.onClick}>
                <Link
                    exact
                    to={to}

                    onClick={() => {
                      setExpand((e) => !e);
                    }}
                    className={`menu-item`}
                >
                    
                    <div className="menu-icon">
                        <i class={iconClassName}></i>
                    </div>
                    <span>{name}</span>
                </Link>
                {subMenus && subMenus.length > 0 ? (
                    <div className={`sub-menu`}>
                        {subMenus.map((menu, index) => (
                            <div key={index}>
                                <NavLink to={menu.to}>{menu.name}</NavLink>
                            </div>
                        ))}
                    </div>
                ) :null}
            </div>

          
    );
};

export default MenuItem;