import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { MapView } from 'expo';

class MapScreen extends React.Component {
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
      </View>
    );
  }
}

export default MapScreen;
