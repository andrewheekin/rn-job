import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import { makeRequest } from '../utils/makeRequest';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

const registerForNotifications = async () => {
  let previousToken = await AsyncStorage.getItem('pushtoken');
  console.log(previousToken); // http://rallycoding.herokuapp.com/api/tokens/push
  if (previousToken) return;

  let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
  if (status !== 'granted') return;

  let token = await Notifications.getExpoPushTokenAsync();
  await makeRequest(PUSH_ENDPOINT, 'POST', { token: { token } });

  AsyncStorage.setItem('pushtoken', token);
};

export default registerForNotifications;
