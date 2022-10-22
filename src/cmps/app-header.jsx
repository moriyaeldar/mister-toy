import React from "react";
import { Link } from "react-router-dom";
import { socketService } from '../services/socket.service'

import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { UserMsg } from "./user-msg.jsx";

class _AppHeader extends React.Component {
  state={
    msg:'admin update the site',
    isModalOpen:false
  }
  componentDidMount(){
    socketService.setup()
    socketService.on('get notification', this.msgFromAdmin)
  }
  msgFromAdmin = (msg) => {
    this.setState({msg})
    this.setState({ isModalOpen:true})
  }

  closeModal(){
    this.setState({ isModalOpen:false})

  }
  render() {
    return (
      <header>
        <nav>
          <div className="nav-wrapper"> 
          <a href="/" className="brand-logo">
                MisterToys   
              </a>
            <ul id="nav-mobile" className="left hide-on-med-and-down"> 
            
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
        <UserMsg />
        {this.state.isModalOpen&&(
           <div id="modal1" class="modal">
             <div class="modal-content">
               <h4>Modal Header</h4>
               <p>A bunch of text</p>
             </div>
             <div class="modal-footer">
               <a href="#!" class="modal-close waves-effect waves-green btn-flat" onClick={this.closeModal}>o.k</a>
             </div>
           </div>
                   
        )}
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userModule.user,
    toys: state.toyModule.toys,
  };
}

export const AppHeader = connect(mapStateToProps)(_AppHeader);
