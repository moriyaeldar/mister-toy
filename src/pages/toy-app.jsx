import React from "react";

import { connect } from "react-redux";
import { ToyAdd } from "../cmps/toy-add.jsx";
import {
  loadtoys,
  onRemovetoy,
  onCheckBox,
} from "../store/toy.actions.js";
import { ToyList } from "../cmps/toy-list";
import { toyService } from "../services/toy.service.js";
import { ToyFilter } from "../cmps/toy-filter.jsx";
class _ToyApp extends React.Component {
  state = {
    isAddingToy: false,
    sortBy:null
  };
  componentDidMount() {
    this.props.loadtoys();
  }

  onRemovetoy = (toyId) => {
    this.props.onRemovetoy(toyId);
    this.props.loadtoys();
  };

  sortBy(toys, sortBy) {
    if (sortBy === "name") {
      toys.sort((toy1, toy2) => {
        return toy1.name.localeCompare(toy2.name);
      });
    } else if (sortBy === "price") {
      toys.sort((toy1, toy2) => {
        return toy1.price - toy2.price;
      });
    } else if (sortBy == "created") {
      toys.sort((toy1, toy2) => {
        return toy1.createdAt - toy2.createdAt;
      });
    }
    return toys;
  }

  onAddToy = () => {
    this.setState({ isAddingToy: true });
  };

  onClosAddToy = () => {
    this.setState({ isAddingToy: false });
  };
  onChangeFilter = (value) => {
    // this.props.onChangeFilter(value);
    this.props.loadtoys(value)
  };
  onChangeSort = (value) => {
    this.setState({sortBy:value})
  }
  onCheckBox = (toy) => {
    this.props.onCheckBox(toy);
  };

  render() {
    var { toys } = this.props;
console.log(this.props);
    toys=this.sortBy(toys,this.state.sortBy)
    return !toys||!toys.length ? (
      <img src="../img/loading.gif" alt="" />
    ) : (
      <div>
        <main>
          <ToyFilter onChangeFilter={this.onChangeFilter} />
          <label htmlFor="sort">Sort By:</label>
          <select
            className="browser-default"
            name="sort"
            id="sort"
            onChange={(ev) => {
              this.onChangeSort(ev.target.value);
            }}
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="created">Created</option>
          </select>
          <button
            type="button"
            className="btn-floating btn-large waves-effect waves-light grey"
            onClick={this.onAddToy}
          >
          <i className="material-icons">add</i>
          </button>
          {this.state.isAddingToy && (
            <div>
              <ToyAdd />
              <button onClick={this.onClosAddToy}>back</button>
            </div>
          )}
          <ToyList
            onRemovetoy={this.onRemovetoy}
            onCheckBox={this.onCheckBox}
            toys={toys}
          />
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    toys: state.toyModule.toys,
    filterBy: state.toyModule.filterBy,
  };
}
const mapDispatchToProps = {
  loadtoys,
  onRemovetoy,
  onCheckBox,
};
export const ToyApp = connect(mapStateToProps, mapDispatchToProps)(_ToyApp);
