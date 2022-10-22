import React from "react";
import { Pie } from "react-chartjs-2";
import { connect } from "react-redux";
import { StorsMap } from "../cmps/StorsMap.jsx";
import { loadtoys } from "../store/toy.actions.js";
class _Dashboard extends React.Component {
  state = {
    toysAvgPrice: null,
  };
  componentDidMount() {
    this.props.loadtoys()
    this.setLabelsPercent(this.props.toys)
  }

  setLabelsPercent = (toys) => {
    const prices = [];
    const avgPrice = [];
    toys.map((toy) => {
      toy.labels.map((label) => {
        if (toy.labels.includes(label)) {
          prices.push(toy.price);
          let sum = prices.reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
          }, 0);
          let avg = sum / prices.length;
          avgPrice.push(avg);
        }
      });
    });
    console.log(avgPrice);
    this.setState({ toysAvgPrice: avgPrice });
  };

  render() {
    var data = {
      labels: [
        "On wheels",
        "Baby",
        "Doll",
        "Battery Powered",
        "Kids",
        "Outdoor",
      ],
      datasets: [
        {
          data: this.state.toysAvgPrice,
          backgroundColor: [
            "red",
            "rgba(54, 162, 235, 0.2)",
            "grey",
            "yellow",
            "black",
            "pink",
          ],
          borderColor: [
            "red",
            "rgba(54, 162, 235, 0.2)",
            "grey",
            "yellow",
            "black",
            "pink",
          ],
          borderWidth: 3,
        },
      ],
    };

    return (
     <div>
      <h4>Price distribution by type of toy</h4>
        <Pie data={data}/> 
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
  loadtoys,
};
export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Dashboard);
