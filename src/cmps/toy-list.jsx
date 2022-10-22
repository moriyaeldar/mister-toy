import React from 'react';

import { ToyPreview } from "./toy-preview.jsx";

export class ToyList extends React.Component {
  render() {
    const { toys } = this.props;
    return !toys||!toys.length ? (
      <img src="../img/loading.gif" alt="" />
    ) :  (
      <ul className="toy-list margin">
        {toys.map((toy) => (
          <ToyPreview
            key={toy._id}
            onRemovetoy={this.props.onRemovetoy}
            onEdittoy={this.props.onEdittoy}
            onCheckBox={this.props.onCheckBox}
            toy={toy}
          />
        ))}
      </ul>
    );
  }
}
