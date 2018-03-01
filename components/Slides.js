import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends React.Component {
  renderSlides() {
    return this.props.data.map((slide, idx) => {
      return (
        <View key={idx} style={[styles.slide, { backgroundColor: slide.color }]}>
          <Text style={styles.text}>{slide.text}</Text>
          {idx === this.props.data.length - 1 && (
            <Button title="Let's Go" raised containerViewStyle={styles.button} onPress={this.props.onComplete} />
          )}
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView horizontal pagingEnabled style={{ flex: 1 }}>
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  slide: { flex: 1, justifyContent: 'center', alignItems: 'center', width: SCREEN_WIDTH },
  text: { fontSize: 30, color: 'white' },
  button: { backgroundColor: '#0288D1', marginTop: 15 },
});

export default Slides;
