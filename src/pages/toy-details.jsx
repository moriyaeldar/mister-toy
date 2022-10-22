import React from "react";
import { ChatApp } from "../cmps/chat-app.jsx";
import { toyService } from "../services/toy.service.js";
export class ToyDetails extends React.Component {
  state = {
    toy: null,
  };
  componentDidMount() {
    const id= this.props.match.params.toyId;
    let toy = toyService.getById(id).then((toy) => {
      this.setState({ toy });
    });
  }

  render() {
    const { toy } = this.state;
    return !toy ? (
      <img src="../img/loading.gif" alt="" />
    ) :     
(
      <div>
        <h6>{toy._id}</h6>
        <h4>{toy.name}</h4>
        <p>added at : {toy.createdAt}</p>
        <p>price : {toy.price}$</p>
        <p>in stock : {toy.inStock ? "yes" : "no"}</p>
        <p>labels:</p>
       {toy.labels&& <div>
        {toy.labels.map((label) => (
          <li key={label}>{label}</li>
        ))}</div>}
        {/* <h6>reviews:</h6>
        {toy.reviews.map((review) => (
          <div key={review.name}>
            <p>writen by : {review.name}</p>
            <p>{review.review}</p> */}
          {/* </div>
        ))} */}
        <div className="chat">
        <ChatApp key={toy._id} id={toy._id}/>
</div>
      </div>
    );
  }
}
