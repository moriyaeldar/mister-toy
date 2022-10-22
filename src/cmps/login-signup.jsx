import React from 'react';

export class LoginSignup extends React.Component {
  state = {
    credentials: {
      username: "",
      password: "",
      fullname: "",
    },
    isSignup: false,
  };

  clearState = () => {
    const clearTemplate = {
      credentials: {
        username: "",
        password: "",
        fullname: "",
      },
      isSignup: false,
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
  
  toggleSignup = () => {
    this.setState({ isSignup: !this.state.isSignup })
}

  onLogin = (ev = null) => {
    if (!this.state.credentials.username || !this.state.credentials.password) return;
    if (ev) ev.preventDefault();
    this.props.onLogin(this.state.credentials);
    this.clearState()
}

onSignup = (ev = null) => {
    if (!this.state.credentials.username || !this.state.credentials.password || !this.state.credentials.fullname) return;
    if (ev) ev.preventDefault();
    this.props.onSignup(this.state.credentials);
    this.clearState()
}

  render() {
    const { username, password, fullname } = this.state.credentials;
    const { isSignup } = this.state;
    return (
      <div className="login-page">
        <p>
          <button className="loginBtn" onClick={this.toggleSignup}>
            {!isSignup ? "Signup" : "Login"}
          </button>
        </p>
        {!isSignup && 
          <form className="login-form" onSubmit={this.onLogin}>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Username"
              onChange={this.handleChange}
              required
              autoFocus
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={this.handleChange}
              required
            />
            <button className="btn btn-outline-info">
              Login!
            </button>
          </form>
        }

        <div className="signup-section">
          {isSignup && 
            <form className="signup-form" onSubmit={this.onSignup}>
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
              <button className="btn btn-outline-info">
                Signup!
              </button>
            </form>
          }
        </div>
      </div>
    );
  }
}

