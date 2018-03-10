import React from 'react';
import { Platform, View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';

class ReviewScreen extends React.Component {
  // reserved class level property that react-navigation uses
  static navigationOptions = ({ navigation }) => ({
    title: 'Review Jobs',
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

  renderLikedJobs = () => this.props.likedJobs.map(job => {
    return (
      <Card>
        <View style={{ height: 200 }}>
          <View style={styles.detailWrapper}>
            <Text style={{ fontStyle: 'italic' }}>{job.company}</Text>
            <Text style={{ fontStyle: 'italic' }}>{job.formattedRelativeTime}</Text>
          </View>
        </View>
      </Card>
    );
  });

  render() {
    return (
      <ScrollView>
        {this.renderLikedJobs()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({ detailWrapper: { marginBottom: 10, flexDirection: 'row', justifyContent: 'space-around' }});

const mapStateToProps = state => ({ likedJobs: state.likedJobs });

export default connect(mapStateToProps)(ReviewScreen);
