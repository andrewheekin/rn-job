import React from 'react';
import { Platform, View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends React.Component {
  // reserved class level property that react-navigation uses
  static navigationOptions = ({ navigation }) => ({
    title: 'Review Jobs',
    tabBarIcon: ({ tintColor }) => <Icon name="favorite" size={30} color={tintColor} />,
    headerRight: (
      <Button
        title="Settings"
        backgroundColor="rgba(0, 0, 0, 0)"
        color="rgba(0, 122, 255, 1)"
        onPress={() => navigation.navigate('settings')}
      >
        Go Right
      </Button>
    ),
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0,
    },
  });

  renderLikedJobs = () =>
    this.props.likedJobs.map(job => {
      const { company, formattedRelativeTime, url, longitude, latitude, jobtitle, jobkey } = job;
      const initialRegion = { longitude, latitude, latitudeDelta: 0.045, longitudeDelta: 0.02 };
      return (
        <Card title={jobtitle} key={jobkey} >
          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === 'android'}
              scrollEnabled={false}
              initialRegion={initialRegion}
            />
            <View style={styles.detailWrapper}>
              <Text style={{ fontStyle: 'italic' }}>{company}</Text>
              <Text style={{ fontStyle: 'italic' }}>{formattedRelativeTime}</Text>
            </View>
            <Button title="Apply Now!" backgroundColor="#03A9F4" onPress={() => Linking.openURL(url)} />
          </View>
        </Card>
      );
    });

  render() {
    return <ScrollView>{this.renderLikedJobs()}</ScrollView>;
  }
}

const styles = StyleSheet.create({
  detailWrapper: { marginTop: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-around' },
});

const mapStateToProps = state => ({ likedJobs: state.likedJobs });

export default connect(mapStateToProps)(ReviewScreen);
