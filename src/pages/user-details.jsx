import React from 'react';

import { connect } from 'react-redux';

class _UserDetails extends React.Component {
  state = {
    credentials: {
      username: "",
      password: "",
      fullname: "",
      prefs: { color: "", bgColor: "" },
    },
  };

  clearState = () => {
    const clearTemplate = {
      credentials: {
        username: "",
        password: "",
        fullname: "",
        prefs: { color: "", bgColor: "" },
      },
    };
    this.setState({ clearTemplate });
  };

  handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    this.setState({
      credentials: { ...this.state.credentials, [field]: value },
    });
  };

  onSave = (ev = null) => {
    if (ev) ev.preventDefault();
    this.props.dispatch({
      type: "SET_USER",
      user:this.state. credentials,
    });
    this.clearState();
  };

  render() {
    const { username, password, fullname, color, bgColor } =
      this.state.credentials;
    return (
      <div>
        <div>
          <form onSubmit={this.onSave}>
            <input
              type="text"
              name="fullname"
              value={fullname}
              placeholder="Fullname"
              onChange={this.handleChange}
              required
            />
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Username"
              onChange={this.handleChange}
              required
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={this.handleChange}
              required
            />
            <input
              type="color"
              name="color"
              value={color}
              placeholder="color"
              onChange={this.handleChange}
              required
            />
            <input
              type="color"
              name="bgColor"
              value={bgColor}
              placeholder="bgColor"
              onChange={this.handleChange}
              required
            />

            <button type="button" className="btn btn-outline-info">
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user,
  };
}

export const UserDetails = connect(mapStateToProps)(_UserDetails);
