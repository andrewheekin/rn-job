import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends React.Component {
  componentDidMount() {
    this.props.facebookLogin();
    this.onAuthComplete();
    // AsyncStorage.removeItem('fb_token');
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete();
  }

  onAuthComplete = () => {
    if (this.props.token) this.props.navigation.navigate('map');
  };

  render() {
    return <View />;
  }
}

const mapStateToProps = ({ auth }) => {
  return { token: auth.token };
};

export default connect(mapStateToProps, actions)(AuthScreen);
