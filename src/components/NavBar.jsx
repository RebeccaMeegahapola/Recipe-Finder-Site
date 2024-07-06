import React, { useState } from 'react'
import '../styles/NavBar.css'
import { NavMenu } from "../components/NavMenu";
import { Link } from "react-router-dom";
import Logo from '../images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function NavBar() {

    const [toggle, setToggle] = useState(false);

    const showNav = () => {
        setToggle(!toggle);
    };

    return (
        <>
            <div class='h-8 bg-gradient-to-r from-cyan-500 to-[#008000]'></div>

            <nav className="w-4/5 mx-auto bg-white items-center flex p-2">
                <div className="flex justify-between items-center w-full flex-wrap md:flex-nowrap">
                    <img src={Logo} className='cursor-pointer w-20'/>

                    <button
                        className="flex justify-end md:hidden ring-1 ring-black rounded"
                        onClick={showNav}>
                        <i className="fa fa-bars text-white w-9 h-9 flex justify-center items-center hover:text-black"></i>
                    </button>

                    <ul
                    className={`${
                        toggle ? " flex" : " hidden"
                    } flex-col justify-center items-center w-full first:mt-2 md:flex-row md:w-auto md:space-x-10 md:flex`}
                    >
                    {NavMenu.map((link, index) => {
                        return (
                        <li key={index} className={link.cname}>
                            <Link
                            className="hover:text-[#008000] hover:border-b-2 border-[#008000]"
                            to={link.href}
                            onClick={showNav}
                            >
                            <i className={link.icon}></i>
                            {link.title}
                            </Link>
                        </li>
                        );
                    })}
                    </ul>
                    <button
                    className={`${
                        toggle ? " flex" : " hidden"
                    } text-black border border-[#008000] hover:bg-[#008000] hover:text-white mx-auto md:mx-0 md:flex md:mt-0 items-center justify-center font-medium bg-white px-1 p-2 rounded-lg mt-4 w-24`}
                    >
                    Sign Up
                    </button>
                </div>
            </nav>
        </>
    );
}

export default NavBar