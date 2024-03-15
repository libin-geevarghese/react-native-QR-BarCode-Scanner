// this file have another approches to impliment this. for using this, make neccessory changes and import to APP.tsx
// refer Scanner.tsx for the current version

// import React, {useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Dimensions,
//   TouchableOpacity,
// } from 'react-native';

// //importing vision camera
// import {
//   Camera,
//   useCameraDevice,
//   useCodeScanner,
// } from 'react-native-vision-camera';
// import {useCameraPermission} from 'react-native-vision-camera';

// //Dimention APi for finding screen dimnentions
// const {width, height} = Dimensions.get('window');

// //BarCodeScanner component
// const BarCodeScanner = () => {
//   //initial value of bar code
//   const [barCode, setBarcode] = useState('');
//   //initial state of is captured
//   const [isCaptured, setIsCaptured] = useState(false);
//   const {hasPermission, requestPermission} = useCameraPermission();

//   const device = useCameraDevice('back');

//   //Automatically req persmission for cam on startup
//   useEffect(() => {
//     requestPermission();
//   }, []);

//   //code Scanner
//   const codeScanner = useCodeScanner({
//     codeTypes: ['qr', 'ean-13'],
//     onCodeScanned: codes => {
//       codes.length > 0 && codes[0]?.value
//         ? setBarcode(codes[0]?.value)
//         : setBarcode(null);

//       setIsCaptured(true);

//       console.log(
//         `Scanned ${codes.length} codes and the value is ${
//           codes[0]?.value ? codes[0].value : 'not found'
//         } !`,
//       );
//     },
//   });

//   //incase no camera persmission
//   if (!hasPermission) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.text}>
//           please enable camera permission for this App
//         </Text>
//       </View>
//     );
//   }

//   //incase no camera found
//   if (!device) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.text}>No camera found</Text>
//       </View>
//     );
//   }

//   //permission is enabled and camera is found
//   return (
//     <View style={styles.container}>
//       {/* <Text>Camera found</Text> */}

//       {isCaptured ? (
//         <>
//           <View style={styles.subContainer}>
//             <Text style={styles.barcodeText}>{barCode}</Text>
//             <TouchableOpacity
//               style={styles.rescanButton}
//               onPress={() => {
//                 setIsCaptured(false);
//               }}>
//               <View>
//                 <Text style={styles.rescanText}>ReScan</Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </>
//       ) : (
//         <Camera
//           style={styles.camera}
//           device={device}
//           isActive={true}
//           codeScanner={codeScanner}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   camera: {
//     width: width * 0.9,
//     aspectRatio: 1,
//   },
//   subContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   barcodeText: {
//     color: 'black',
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   rescanButton: {
//     backgroundColor: '#007AFF',
//     padding: 15,
//     borderRadius: 8,
//   },
//   rescanText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     textAlign: 'center',
//   },
//   text: {
//     color: 'black',
//   },
// });

// export default BarCodeScanner;
