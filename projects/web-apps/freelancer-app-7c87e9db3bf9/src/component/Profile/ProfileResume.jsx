import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import PdfFile from 'react-native-vector-icons/AntDesign';
import ImagePicker from '@app/component/common/ImagePicker';
import InformativeImage from '@app/component/common/InformativeImage';

import View from '@app/component/common/View';
import Text from '@app/component/common/Text';
import {R} from '../../res';
import Card from '@app/component/common/Card';
import CardHeader from '@app/component/Profile/CardHeader';

const ProfileResume = ({handleResumeUpload, resumeName, resumeUrl}) => {
  const [filePicker, setFilePicker] = useState(false);

  const handleFilePicker = () => {
    setFilePicker(!filePicker);
  };
  let resumeFileName = '';
  if (resumeUrl && resumeUrl.length) {
    const splitURI = (uri, char) => uri.split(char);
    resumeFileName = splitURI(resumeUrl, '/')[
      splitURI(resumeUrl, '/').length - 1
    ];
  }

  return (
    <>
      <CardHeader
        cardHeader={'Resume'}
        iconName={resumeUrl ? 'pencil' : 'plus'}
        onIconPress={handleFilePicker}
      />
      {!resumeUrl ? (
        <InformativeImage text={'No Resume Uploaded'} />
      ) : (
        <Card style={styles.cardStyle}>
          <View flexDirection="row" alignItems="center">
            <PdfFile name="pdffile1" size={28} style={styles.editIcon} />
            <View paddingHorizontal={R.units.scale(10)}>
              <Text style={styles.pdfName}>{resumeFileName}</Text>
            </View>
          </View>
        </Card>
      )}
      {filePicker ? (
        <ImagePicker uploadFile handleResumeUpload={handleResumeUpload} />
      ) : null}
    </>
  );
};

export default ProfileResume;

const styles = StyleSheet.create({
  profileHeaderView: {
    alignItems: 'center',
  },
  ratingValue: {
    fontSize: R.units.scale(14),
    fontWeight: '500',
    marginHorizontal: R.units.scale(5),
  },
  ratingView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '50%',
    marginVertical: R.units.scale(8),
  },
  cardHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: R.units.scale(13),
    marginVertical: R.units.scale(10),
  },
  cardHeader: {
    fontSize: R.units.scale(14),
    fontWeight: '500',
  },
  cardStyle: {
    borderRadius: R.units.scale(5),
    marginHorizontal: R.units.scale(12),
    marginBottom: R.units.scale(10),
    elevation: 4,
    padding: R.units.scale(10),
  },
  headerText: {
    color: R.colors.text.secondary,
    fontSize: R.units.scale(11),
    fontWeight: '500',
    marginVertical: R.units.scale(3),
    width: '35%',
  },
  valueText: {
    color: R.colors.text.secondary,
    fontSize: R.units.scale(11),
    fontWeight: '400',
    marginVertical: R.units.scale(3),
    textAlign: 'left',
    width: '55%',
    marginRight: R.units.scale(20),
  },
  descriptionWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  editIcon: {
    color: R.colors.chipBorder,
  },
  pdfName: {
    color: R.colors.text.secondary,
    fontSize: R.units.scale(11),
    fontWeight: '500',
    marginVertical: R.units.scale(3),
  },
  pdfDate: {
    color: R.colors.text.secondary,
    fontSize: R.units.scale(10),
    fontWeight: '400',
  },
});
