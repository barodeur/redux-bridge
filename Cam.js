import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Camera from 'react-native-camera';

export default class Cam extends Component {
  render() {
    return (
      <Camera
        ref={ref => { this.camera = ref; }}
        aspect={Camera.constants.Aspect.fill}
        onBarCodeRead={({ data }) => { console.log(data); }}
        barCodeTypes={['qr']}
        style={styles.container}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
