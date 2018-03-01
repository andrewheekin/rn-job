import React from 'react';
import { View, Text } from 'react-native';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to Job App', color: '#03A9F4' },
  { text: 'Find your job', color: '#009688'  },
  { text: 'Set your location then swipe away', color: '#03A9F4'  },
];

class WelcomeScreen extends React.Component {
  onSlidesComplete = () => {
    this.props.navigation.navigate('auth')
  }

  render() {
    return <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />;
  }
}

export default WelcomeScreen;
