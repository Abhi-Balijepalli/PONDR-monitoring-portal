const initState = {};

const authReducer = (state = initState, action) => {
  if (action.type === 'LOGIN_ERROR') {
    // console.log(action.err);
    return {
      ...state,
      authError: 'Sign in failed: ' + action.err
    };
  } else if (action.type === 'LOGIN_ERROR') {
    return {
      ...state,
      authError: null
    };
  } else {
    return state;
  }
};

export default authReducer;
