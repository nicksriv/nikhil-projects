import React, {useState} from 'react';
import View from '../common/View';
import Text from '../common/Text';
import {Alert, PermissionsAndroid, StyleSheet} from 'react-native';
import {BottomSheet} from 'react-native-btr';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import Photo from 'react-native-vector-icons/FontAwesome';
import Camera from 'react-native-vector-icons/Feather';
import File from 'react-native-vector-icons/AntDesign';
import {R} from '../../res';
import DocumentPicker, { types } from 'react-native-document-picker';


// import * as DocumentPicker from "expo-document-picker";

const ImagePicker = ({uploadFile, getImage, handleResumeUpload}) => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [visible, setVisible] = useState(true);
  const refRBSheet = React.useRef();

  React.useEffect(() => {
    if (image) {
      const type = splitURI(image.uri, '.')[
        splitURI(image.uri, '.').length - 1
      ];
      const name = splitURI(image.uri, '/')[
        splitURI(image.uri, '/').length - 1
      ];
      getImage({...image, type, name});
    }
    if (file || image) {
      toggleBottomNavigationView();
    }
  }, [image, file]);

  const splitURI = (uri, char) => uri.split(char);

  const pickUsingCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await launchCamera({
          mediaTypes: 'photo',
          quality: 1,
        });
    
        if (!result.canceled) {
          setImage(result.assets[0]);
        }
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }

    
  };

  const pickUsingLibrary = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await launchImageLibrary({
          mediaTypes: 'photo',
          quality: 1,
        });

        if (!result.canceled) {
          setImage(result.assets[0]);
        }
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const pickUsingFile = async () => {
    // let result = await DocumentPicker.getDocumentAsync({});

    const result = await DocumentPicker.pick({
      presentationStyle: 'fullScreen',
      type: [types.pdf],
    });
    handleResumeUpload(result[0]);

    if (!result.canceled) {
      setFile(result);
    }
  };

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };
  return (
    <View>
      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}>
        <View style={styles.bottomNavigationView}>
          <View>
            {uploadFile ? null : (
              <>
                <View
                  pressable
                  style={styles.optionWrapper}
                  onPress={() => {
                    pickUsingLibrary();
                  }}>
                  <Photo name="photo" size={20} />
                  <Text style={styles.optionTitle}>Choose from Library</Text>
                </View>
                <View
                  pressable
                  style={styles.optionWrapper}
                  onPress={() => {
                    pickUsingCamera();
                  }}>
                  <Photo name="camera" size={20} />
                  <Text style={styles.optionTitle}>Take Photo</Text>
                </View>
              </>
            )}

            {uploadFile ? (
              <View
                pressable
                style={styles.optionWrapper}
                onPress={() => {
                  pickUsingFile();
                }}>
                <File name="file1" size={20} />
                <Text style={styles.optionTitle}>Upload File</Text>
              </View>
            ) : null}
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 2,
    backgroundColor: '#E0F7FA',
  },
  bottomNavigationView: {
    backgroundColor: R.colors.white,
    padding: R.units.scale(10),
    width: '100%',
    justifyContent: 'center',
  },
  optionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: R.units.scale(8),
  },
  optionTitle: {
    fontSize: R.units.scale(15),
    paddingHorizontal: R.units.scale(8),
    color: R.colors.text.secondary,
  },
});

export default ImagePicker;
