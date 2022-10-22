import React from "react"
import { NavLink } from "react-router-dom";

export function Footer(){
    return(
        <footer>
            <nav>
          <div className="footer"> 
       
            <ul > 
            
              <li>
                {" "}
                <NavLink to="/">Home</NavLink>{" "}
              </li>
              <li>
                {" "}
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/toy">Toys</NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/toy/dashbord">Dashbord</NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/toy/login">Login</NavLink>
              </li>{" "}
         
            </ul>
          </div>{" "}
        </nav>
            <p>cofferight 2021 MoriyaEldar</p>
        </footer>
    )
}