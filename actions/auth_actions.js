import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from './types';

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');

  if (!token) {
    // Start FB login (opens FB login modal)
    let { token, type } = await Facebook.logInWithReadPermissionsAsync('1243038355798230', {
      permissions: ['public_profile'],
    });

    if (type === 'cancel') return dispatch({ type: FACEBOOK_LOGIN_FAIL });

    await AsyncStorage.setItem('fb_token', token);
  }

  // Dispatch an FB login action
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
