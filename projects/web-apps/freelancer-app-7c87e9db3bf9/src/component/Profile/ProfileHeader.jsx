import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import Star from 'react-native-vector-icons/AntDesign';
import Edit from 'react-native-vector-icons/EvilIcons';
import ImagePicker from '../common/ImagePicker';
import Separator from '../common/Separator';
import View from '@app/component/common/View';
import Text from '@app/component/common/Text';
import Image from '../../component/common/Image';
import {R} from '@app/res/index';

const ProfileHeader = ({getProfileImage, profileImage, freelancerRating}) => {
  const [imagePicker, setImagePicker] = useState(false);
  const handleImagePicker = () => {
    setImagePicker(!imagePicker);
  };

  return (
    <>
      <View style={styles.profileHeaderView}>
        <Separator size={20} />
        <View
          pressable
          onPress={() => {
            handleImagePicker();
          }}>
          {profileImage ? (
            <Image source={{uri: profileImage}} style={styles} />
          ) : (
            <Image
              source={R.images.tab.userProfie()}
              style={{width: 200, height: 200}}
            />
          )}
        </View>
        <Edit
          name="pencil"
          size={R.units.scale(20)}
          style={{
            position: 'absolute',
            color: R.colors.primary.main,
            right: 120,
            top: 30,
            backgroundColor: R.colors.white,
            borderRadius: 50,
            padding: 4,
            elevation: 4,
            height: R.units.scale(24),
            width: R.units.scale(24),
          }}
          onPress={() => {
            handleImagePicker();
          }}
        />
        <Separator size={10} />
        <View flexDirection="row" alignItems="center" paddingHorizontal={10}>
          <Star name="star" size={20} color="#ffc107" />
          <Text style={styles.ratingValue}>{freelancerRating}</Text>
        </View>
      </View>
      <Separator size={10} />
      {imagePicker ? <ImagePicker getImage={getProfileImage} /> : null}
    </>
  );
};

export default ProfileHeader;

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
  colan: {
    paddingHorizontal: R.units.scale(2),
    fontWeight: '500',
  },
  designationHeader: {
    fontSize: R.units.scale(13),
    fontWeight: '500',
  },
  companyNameHeader: {
    color: R.colors.text.secondary,
    fontSize: R.units.scale(11),
    fontWeight: '500',
  },
  workDescription: {
    color: R.colors.text.secondary,
    fontSize: R.units.scale(11),
    fontWeight: '400',
    marginVertical: R.units.scale(3),
    textAlign: 'left',
    marginRight: R.units.scale(20),
  },
  fromDateStyle: {
    fontSize: R.units.scale(11),
    fontWeight: '400',
  },
  root: {
    borderRadius: R.units.scale(50),
    borderWidth: 1,
    borderColor: '#c1c1c1',
  },
  skillHeaderText: {
    color: R.colors.text.secondary,
    fontSize: R.units.scale(11),
    fontWeight: '500',
  },
});
