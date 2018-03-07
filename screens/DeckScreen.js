import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button } from 'react-native-elements';
import Swipe from '../components/Swipe';

class DeckScreen extends React.Component {
  renderCard(job) {
    const { jobtitle, company, formattedRelativeTime, snippet, longitude, latitude } = job;
    const cleanSnippet = snippet.replace(/<b>/g, '').replace(/<\/b>/g, '');
    const initialRegion = { longitude, latitude, latitudeDelta: 0.045, longitudeDelta: 0.02 };
    return (
      <Card title={jobtitle}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android' ? true : false}
            initialRegion={initialRegion}
          />
        </View>
        <View style={styles.detailWrapper}>
          <Text>{company}</Text>
          <Text>{formattedRelativeTime}</Text>
        </View>
        <Text>{cleanSnippet}</Text>
      </Card>
    );
  }

  renderNoMoreCards = () => {
    return (
      <Card title="No More Jobs">
        <Button
          title="Back To Map"
          large
          icon={{ name: 'my-location' }}
          backgroundColor="#03A9F4"
          onPress={() => this.props.navigation.navigate('map')}
        />
      </Card>
    );
  };

  render() {
    const { jobs } = this.props;
    return (
      <View style={{ marginTop: 10 }}>
        <Swipe data={jobs} renderCard={this.renderCard} renderNoMoreCards={this.renderNoMoreCards} keyProp="jobkey" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detailWrapper: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
});

const mapStateToProps = ({ jobs }) => ({ jobs: jobs.results });

export default connect(mapStateToProps)(DeckScreen);
