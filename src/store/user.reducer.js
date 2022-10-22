import { userService } from "../services/user.service.js";

const initialState = {
  user: userService.getLoggedinUser(),
};
export function userReducer(state = initialState, action) {
  var newState = state;
  switch (action.type) {
    case "SET_USER":
      newState = { ...state, user: action.user };
      break;
  }

  window.userState = newState;
  return newState;
}
