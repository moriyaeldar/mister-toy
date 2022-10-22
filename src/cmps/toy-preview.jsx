import React from 'react';

import { Link } from 'react-router-dom';
import { ToyEdit } from "../pages/toy-edit.jsx";
import { ToyDetails } from "../pages/toy-details.jsx";
export class ToyPreview extends React.Component {
  render() {
    const { toy } = this.props;
    return (
      <li key={toy._id} className="toy-preview margin">
        <h6 >{toy.name}</h6>
        <Link  to={`/toy/${toy._id}`}>
          more details
        </Link>

        <div>
          
          <button
            type="button"
            className="btn btn-outline-danger margin"
            onClick={() => {
              this.props.onRemovetoy(toy._id);
            }}
          >
            x
          </button>
          <Link className="link-info margin" to={`/toy/edit/${toy._id}`} >
            <button type="button" className="btn btn-outline-success margin">
              Edit
            </button>
          </Link>
        </div>
      </li>
    );
  }
}
