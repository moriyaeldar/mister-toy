import React from "react";

import { connect } from "react-redux";
import Select from 'react-select';
import { onAddToy } from "../store/toy.actions.js";

const options = [
  { value: 'On wheels', label: 'On wheels' },
  { value: 'Baby', label: 'Baby' },
  { value: 'Doll', label: 'Doll' },
  { value: 'Outdoor', label: 'Outdoor' },
  { value: 'Battery Powered', label: 'Battery Powered' },
  { value: 'Kids', label: 'Kids' },
];
class _ToyAdd extends React.Component {
  state = {
    newToy: {
      toyName: "",
      toyPrice: "",
      selectedOption: null,
    },
    
    }


  clearState = () => {
    const clearTemplate = {
      newToy: {
        toyName: "",
      toyPrice: "",
      },
    };
    this.setState({ clearTemplate });
  };

  handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    this.setState({
      newToy: { ...this.state.newToy, [field]: value},
    });
  };

  handleSelectChange = selectedOption => {
    this.setState({ ...this.state.newToy.selectedOption,selectedOption });
    console.log(`Option selected:`, selectedOption, this.state);
  };

  onSave = (ev = null) => {
    if (ev) ev.preventDefault();
    this.props.onAddToy(this.state.newToy)
    this.clearState();
  };

  render() {
    const {  toyName,
    toyPrice ,selectedOption } =
      this.state


    return (
      <div>
        <form onSubmit={this.onSave}>
          <input
            type="text"
            name="toyName"
            value={toyName}
            placeholder="toyName"
            onChange={this.handleChange}
            required
          />
          <input
            type="number"
            name="toyPrice"
            value={toyPrice}
            placeholder="toyPrice"
            onChange={this.handleChange}
            required
          />
          <Select
            value={selectedOption}
            name="selectedOption"
            onChange={this.handleSelectChange}
            options={options}
          />

          <button>
            Save
          </button>
        </form>

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
  onAddToy
};

export const ToyAdd = connect(mapStateToProps, mapDispatchToProps)(_ToyAdd);
