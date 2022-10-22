import { toyService } from "../services/toy.service.js";
import { utilService } from "../services/util.service.js";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import { socketService } from '../services/socket.service'

export function loadtoys(filterBy='all') {
  return (dispatch) => {
    toyService.query(filterBy).then(toys => {
      dispatch({
        type: "SET_TOYS",
        toys,
      });
      console.log("toys from DB:", toys);
    });
  };
}

export function onRemovetoy(toyId) {
  return (dispatch) => {
    toyService
      .remove(toyId)
      .then(() => {
        console.log("Deleted Succesfully!");
        dispatch({
          type: "REMOVE_TOY",
          toyId,
        });
        showSuccessMsg("toy removed");
        socketService.emit('shop edited', `toy num ${toyId} has been removed`)

      })
      .catch((err) => {
        showErrorMsg("Cannot remove toy");
      });
  };
}

export function onAddToy(toy) {
  return (dispatch) => {
    const newToy = {
      name: toy.toyName,
      price: toy.toyPrice,
      labels: toy.selectedOption,
      createdAt: utilService.getDate(Date.now()),
      inStock: true,
    };
    console.log('new tou in action',newToy);
    toyService
      .add(newToy)
      .then((savedtoy) => {
        console.log("Added toy", savedtoy);
        dispatch({
          type: "ADD_TOY",
          toy: savedtoy,
        });
        showSuccessMsg("toy added");
        socketService.emit('shop edited', `toy num ${toy._id} has been added`)

      })
      .catch((err) => {
        showErrorMsg("Cannot add toy");
      });
  };
}

export function onEdittoy(newToy,toy) {
  return (dispatch) => {
    const updatToy = {
      _id: toy._id,
      inStock: newToy.inStock,
      name: newToy.toyName,
      price: newToy.toyPrice,
      labels: toy.labels,
      createdAt: toy.createdAt,
    };
    toyService
      .update(updatToy,updatToy._id)
      .then((savedtoy) => {
        console.log("Updated toy:", savedtoy);
        dispatch({
          type: "UPDATE_TOY",
          savedtoy,
        });
        showSuccessMsg("toy updated");
        socketService.emit('shop edited', `toy has been updated`)

      })
      .catch((err) => {
        showErrorMsg("Cannot update toy");
      });
  };
}


// export function onSaveHistory(newToy) {
//   return (dispatch) => {
//     toyService
//       .update(newToy)
//       .then((savedtoy) => {
//         console.log("Updated toy:", savedtoy);
//         dispatch({
//           type: "UPDATE_TOY",
//           savedtoy,
//         });
//         showSuccessMsg("toy updated");
//       })
//       .catch((err) => {
//         showErrorMsg("Cannot update toy");
//       });
//   };
// }

// export function onChangeFilter(value) {
//   return (dispatch) => {
//     const newFilterBy = value;
//     dispatch({
//       type: "CHANGE_FILTER",
//       newFilterBy,
//     });
//     console.log("value:", value);
//   };
  
// }

export function onCheckBox(toy) {
  // return (dispatch) => {
  //   const status = "In stock";
  //   const toyToSave = { ...toy, status };
  //   toyService.save(toyToSave).then((savedtoy) => {
  //     dispatch({
  //       type: "UPDATE_toy",
  //       savedtoy,
  //     });
  //   });
  // };
}

