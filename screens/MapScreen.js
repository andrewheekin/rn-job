import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Map',
    tabBarIcon: ({ tintColor }) => <Icon name="my-location" size={30} color={tintColor} />
  }

  state = {
    mapLoaded: false,
    region: {
      longitude: -122,
      latitude: 37,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09,
    },
  };

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  handleRegionChange = region => this.setState({ region });
  handleBtnPress = () => {
    this.props.fetchJobs(this.state.region);
    this.props.navigation.navigate('deck');
  };

  render() {
    if (!this.state.mapLoaded)
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    return (
      <View style={{ flex: 1 }}>
        <MapView region={this.state.region} style={{ flex: 1 }} onRegionChangeComplete={this.handleRegionChange} />
        <View style={styles.btnContainer}>
          <Button
            large
            title="Search this area"
            backgroundColor="#009688"
            icon={{ name: 'search' }}
            onPress={this.handleBtnPress}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  btnContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
};

export default connect(null, actions)(MapScreen);
