import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { onEdittoy } from "../store/toy.actions.js";
import { toyService } from "../services/toy.service.js";

class _ToyEdit extends React.Component {
  state = {
    newToy: {
      toyName: "",
      toyPrice: "",
      inStock: "",
    },
    toy: null,
  };

  componentDidMount() {
    const id= this.props.match.params.toyId;
    console.log(id);
    var currtoy = toyService.getById(id)
    .then((currtoy) => {
      this.setState({toy:currtoy });
      console.log('curr',currtoy);
    });
  }

  clearState = () => {
    const clearTemplate = {
      newToy: {
        toyName: "",
        toyPrice: "",
        inStock: "",
      },
    };
    this.setState({ clearTemplate });
  };

  handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    this.setState({
      newToy: { ...this.state.newToy, [field]: value },
    });
  };

  onSave = (ev = null) => {
    if (ev) ev.preventDefault();
    this.props.onEdittoy(this.state.newToy,this.state.toy);
    this.clearState();
  };

  render() {
    const { toyName, toyPrice, inStock, toy } = this.state;

    return (
      <div>
        <form onSubmit={this.onSave}>
          <input
            type="text"
            name="toyName"
            value={toyName}
            placeholder="toy name"
            onChange={this.handleChange}
            required
          />
          <input
            type="number"
            name="toyPrice"
            value={toyPrice}
            placeholder="toy price"
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="inStock"
            value={inStock}
            placeholder="in Stock? true/false"
            onChange={this.handleChange}
            required
          />

          <button>Edit</button>
        </form>
        <Link to={`/toy/`}>
          <button>Back</button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    toys: state.toyModule.toys,
  };
}
const mapDispatchToProps = {
  onEdittoy,
};

export const ToyEdit = connect(mapStateToProps, mapDispatchToProps)(_ToyEdit);
