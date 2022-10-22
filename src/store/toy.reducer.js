const initialState = {
    toys: [],
    // filterBy: 'all',
    priceAvg:null

}
export function toyReducer(state = initialState, action) {
    var newState = state
    var toys;
    
    switch (action.type) {
       
            case "SET_TOYS":
              newState = { ...state, toys: action.toys };
              break;
            case "REMOVE_TOY":
              toys = state.toys.filter((toy) => toy._id !== action.toyId);
              newState = { ...state, toys: toys };
              break;
            case "ADD_TOY":
              newState = { ...state, toys: [...state.toys, action.toy] };
              break;
            case "UPDATE_TOY":
              toys = state.toys.map((toy) =>
                toy._id === action.toy._id ? action.toy : toy
              );        
              newState = { ...state, toys };
              break;
              // case 'CHANGE_FILTER':
              //   newState = {...state, filterBy: action.newFilterBy }
              //   console.log('newState:',newState);
              //   break;
             
    }
    window.toyState = newState
    
    return newState

}
