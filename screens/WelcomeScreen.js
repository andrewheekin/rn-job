import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to Job App', color: '#03A9F4' },
  { text: 'Find your job', color: '#009688' },
  { text: 'Set your location then swipe away', color: '#03A9F4' },
];

class WelcomeScreen extends React.Component {
  state = { token: null };

  async componentDidMount() {
    const token = await AsyncStorage.getItem('fb_token');
    if (token) {
      this.props.navigation.navigate('map');
      this.setState({ token })
    }
    else this.setState({ token: false });
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate('auth');
  };

  render() {
    if (this.state.token === null) return <AppLoading />;
    return <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />;
  }
}

export default WelcomeScreen;
