import { useCookies, Cookies } from 'react-cookie';

export const signIn = async (creds, setCookie) => {
  return async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);

      const idToken = await firebase
        .auth()
        .currentUser.getIdToken(/* forceRefresh */ true);
      // Sets the Auth ID token
      await setCookie('authToken', idToken, { path: '/enterprise/dashboard' });
      dispatch({ type: 'LOGIN_SUCCESS' });
    } catch (err) {
      dispatch({ type: 'LOGIN_ERROR', err: err });
    }
  };
};

export const signOut = () => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        const cookies = new Cookies();
        cookies.remove('authToken', { path: '/' });
        dispatch({ type: 'SIGNOUT_SUCCESS' });
      })
      .catch((err) => {
        // An error happened.
        dispatch({ type: 'SIGNOUT_ERROR', err: err });
      });
  };
};
