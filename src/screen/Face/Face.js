import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import FaceRecognition from 'react-native-face-recognition';

const Face = () => {
  const [faceDetected, setFaceDetected] = useState(false);
  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      processImage(data.base64);
    }
  };

  const processImage = async (base64Image) => {
    const result = await FaceRecognition.recognize({ image: base64Image });
    if (result && result.faces && result.faces.length > 0) {
      setFaceDetected(true);
    } else {
      setFaceDetected(false);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={RNCamera.Constants.Type.front}
        captureAudio={false}
      />
      <View style={styles.captureContainer}>
        <TouchableOpacity onPress={takePicture} style={styles.capture}>
          <Text style={styles.captureText}>CAPTURE</Text>
        </TouchableOpacity>
      </View>
      {faceDetected && <Text style={styles.faceDetectedText}>Face Detected!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captureContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  captureText: {
    fontSize: 14,
  },
  faceDetectedText: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 18,
    color: 'green',
  },
});

export default Face;

