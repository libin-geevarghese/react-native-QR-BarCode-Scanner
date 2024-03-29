import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
  TurboModuleRegistry,
} from 'react-native';

//importing vision camera
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
  useCameraPermission,
} from 'react-native-vision-camera';

//Dimension API for finding screen dimensions
const {width, height} = Dimensions.get('window');

//Scanner component
const Scanner = () => {
  const [data1, setData1] = useState(''); //initial value of bar code
  const [isInitializingCamera, setIsInitializingCamera] = useState(false); //for cam initialising
  const [submitting, setSubmitting] = useState(false); //for setting the status of submitting to conditionally render submit button/ actiity indicater

  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  //Automatically request permission for camera on startup
  useEffect(() => {
    requestPermission();
  }, []);

  //code Scanner
  const codeScanner = useCodeScanner({
    codeTypes: [
      'qr',
      'ean-13',
      'ean-8',
      'code-128',
      'code-39',
      'code-93',
      'codabar',
      'aztec',
      'data-matrix',
      'pdf-417',
      'itf',
      'upc-e',
    ],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes.length} codes!`);
      console.log(`type :  ${codes[0].type}.`);
      console.log(`value :  ${codes[0].value}.`);
      console.log(codes[0].value);
      console.log('************');
      setData1(codes[0]?.value);
    },
  });

  //incase no camera permission
  if (!hasPermission) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.text}>
          Please enable camera permission for this App in phone settings
        </Text>
      </View>
    );
  }

  //incase no camera found
  if (!device) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.text}>No camera found</Text>
      </View>
    );
  }

  //permission is enabled and camera is found
  return (
    <View style={styles.container}>
      {/* Displaying Activity Indicator while camera is initializing */}
      {isInitializingCamera && (
        <>
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.activityIndicator}
          />
          <Text style={styles.text}>Loading Camera.Please Wait... </Text>
          <Text style={styles.text}>
            Ensure you have enabled camera permission and your device camera is
            working properly
          </Text>
        </>
      )}

      {/* camera starting */}
      {!isInitializingCamera && (
        <>
          <Text style={styles.title}>||||||BarCodeX</Text>
          <Camera
            style={styles.camera}
            device={device}
            isActive={true}
            codeScanner={codeScanner}
            onInitialized={() => setIsInitializingCamera(false)} // Callback when camera is initialized
            onInitializedFailure={() => setIsInitializingCamera(false)} // Callback when camera initialization fails
            onInitialize={() => setIsInitializingCamera(true)} // Callback when camera initialization starts
          />

          {data1 != '' && (
            <View style={styles.outputContainer}>
              <ScrollView>
                <Text style={styles.text}>{data1} </Text>
              </ScrollView>
            </View>
          )}

          {!submitting ? (
            <TouchableOpacity
              style={styles.scanButton}
              onPress={async () => {
                setSubmitting(true);
                if (!data1) {
                  Alert.alert(
                    'Nothing to clear',
                    'Please Scan a Bar code or QR code',
                  );
                  setSubmitting(false);
                  return;
                }
                setSubmitting(false);
                setData1('');
              }}>
              <Text style={styles.scanBtnText}>Clear Previous Data</Text>
            </TouchableOpacity>
          ) : (
            <>
              <Text>Clearing Data.Please wait....</Text>
              <ActivityIndicator size="large" color="#0000ff" />
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b7c4b9',
    padding: 15,
  },
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#b7c4b9',
    padding: 15,
  },
  title: {
    color: '#208afa',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  camera: {
    width: width * 0.9,
    aspectRatio: 2,
  },
  subContainer: {
    alignItems: 'center',
  },
  outputContainer: {
    width: width * 0.9,
    borderRadius: 15,
    backgroundColor: 'white',
    marginVertical: 10,
    height: height * 0.2,
  },
  barcodeText: {
    color: 'black',
    fontSize: 24,
    marginBottom: 20,
  },
  scanButton: {
    marginVertical: 15,
    backgroundColor: '#344f3e',
    padding: 15,
    borderRadius: 8,
  },
  scanBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
  text: {
    color: 'black',
    textAlign: 'center',
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent background to dim the camera preview
    zIndex: 999, // Place the activity indicator above the camera preview
  },
});

export default Scanner;
