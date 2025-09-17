import React from 'react';
import {StyleSheet} from 'react-native';
import Edit from 'react-native-vector-icons/EvilIcons';
import Add from 'react-native-vector-icons/Ionicons';
import View from '@app/component/common/View';
import Text from '@app/component/common/Text';
import {R} from '@app/res/index';
import Card from '@app/component/common/Card';
import {navigationHelper} from '@app/helper/navigation';
import {ScreenConstants} from '@app/navigator/ScreenConstants';
import CardHeader from '@app/component/Profile/CardHeader';
import InformativeImage from '@app/component/common/InformativeImage';

const ProfileWorkExperience = ({workDetail = []}) => {
  const generateJobDate = ({fromstartDate, endDate}) => {
    if (fromstartDate && endDate) {
      return `From ${fromstartDate} to ${endDate}`;
    }
    return `From ${fromstartDate} until now`;
  };
  const checkWorkDetails = (workDetail = []) => {
    let isWorkDetailsAvailable = false;
    if (workDetail.length) {
      isWorkDetailsAvailable = true;
    }
    return isWorkDetailsAvailable;
  };
  return (
    <>
      <CardHeader
        cardHeader={'Work Experience'}
        iconName={
          !Object.values(workDetail).every(element =>
            [null, '', undefined].includes(element),
          )
            ? 'pencil'
            : 'plus'
        }
        onIconPress={() => {
          navigationHelper.navigate({
            name: ScreenConstants.EDIT_PROFILE,
            params: {
              key: checkWorkDetails(workDetail)
                ? 'workDetail'
                : 'addWorkDetail',
              data: workDetail,
              name: 'Work Experience',
            },
          });
        }}
      />
      <View>
        {workDetail && workDetail.length ? (
          workDetail.map((item, index) => {
            return (
              <React.Fragment key={`workDetail${index}`}>
                <Card style={styles.cardStyle}>
                  <View>
                    <Text style={styles.designationHeader}>
                      {item.designation}
                    </Text>
                    <Text style={styles.companyNameHeader}>
                      - {item.company}
                    </Text>
                  </View>
                  <Text style={styles.workDescription}>
                    {item.workDescription}
                  </Text>
                  <View flexDirection="row" alignItems="center">
                    <Text style={styles.fromDateStyle}>
                      {generateJobDate({
                        fromstartDate: item.startDate,
                        endDate: item.endDate,
                      })}
                    </Text>
                  </View>
                </Card>
              </React.Fragment>
            );
          })
        ) : (
          <InformativeImage text={'No Work Experience Uploaded'} />
        )}
      </View>
    </>
  );
};

export default ProfileWorkExperience;

const styles = StyleSheet.create({
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
  editIcon: {
    color: R.colors.chipBorder,
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
});
