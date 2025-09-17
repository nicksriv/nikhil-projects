import React from 'react';
import {StyleSheet, Modal} from 'react-native';
import Edit from 'react-native-vector-icons/EvilIcons';

import {navigationHelper} from '../../helper/navigation';
import {ScreenConstants} from '../../navigator/ScreenConstants';

import InformativeImage from '@app/component/common/InformativeImage';
import Card from '@app/component/common/Card';
import {R} from '@app/res/index';
import View from '../common/View';
import Text from '../common/Text';
import CardHeader from '../Profile/CardHeader';

import Button from '../form/Button';

const EditProfileExperience = ({
  componentData = [],
  deleteWorkExperience,
  toggleDeleteModal,
  isModalVisible,
}) => {
  const generateJobDate = ({fromstartDate, endDate}) => {
    if (fromstartDate && endDate) {
      return `From ${fromstartDate} to ${endDate}`;
    }
    return `From ${fromstartDate} until now`;
  };
  return (
    <>
      <CardHeader
        cardHeader={'Work Experience'}
        iconName="plus"
        onIconPress={() => {
          navigationHelper.navigate({
            name: ScreenConstants.EDIT_PROFILE,
            params: {
              key: 'addWorkDetail',
              // data: workDetail,
              name: 'Work Experience',
            },
          });
        }}
      />
      <View flex={1}>
        {componentData && componentData.length ? (
          componentData.map((item, index) => {
            return (
              <React.Fragment key={`edit_work_detail${index}`}>
                <Card style={styles.cardStyle}>
                  <View
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="flex-start">
                    <View>
                      <Text style={styles.designationHeader}>
                        {item.designation}
                      </Text>
                      <Text style={styles.companyNameHeader}>
                        - {item.company}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Edit
                        name="pencil"
                        size={R.units.scale(23)}
                        style={styles.editIcon}
                        onPress={() => {
                          navigationHelper.navigate({
                            name: ScreenConstants.EDIT_PROFILE,
                            params: {
                              key: 'editWorkDetail',
                              data: item,
                              name: 'Work Experience',
                            },
                          });
                        }}
                      />
                      <Edit
                        name="trash"
                        size={R.units.scale(23)}
                        style={styles.editIcon}
                        onPress={() => toggleDeleteModal(true)}
                      />
                    </View>
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
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={isModalVisible}
                  onRequestClose={() => toggleDeleteModal(false)}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        backgroundColor: R.colors.background.tab,
                        padding: 60,
                        paddingVertical: 45,
                        borderRadius: 4,
                      }}>
                      <Text>Are you sure you want to delete?</Text>

                      <View
                        flexDirection="row"
                        style={{
                          justifyContent: 'space-around',
                          marginTop: 10,
                          marginHorizontal: R.units.scale(20),
                        }}>
                        <Button
                          text={'Yes'}
                          onPress={() => deleteWorkExperience(item.workId)}
                          size="sm"
                          variant="contained"
                        />
                        <Button
                          text={'No'}
                          onPress={() => toggleDeleteModal(false)}
                          size="sm"
                          variant="contained"
                        />
                      </View>
                    </View>
                  </View>
                </Modal>
              </React.Fragment>
            );
          })
        ) : (
          <InformativeImage text={'No Work Experience Uploaded'} />
        )}
        {}
      </View>
    </>
  );
};

export default EditProfileExperience;
const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: R.units.scale(5),
    marginHorizontal: R.units.scale(12),
    marginVertical: R.units.scale(6),
    elevation: 4,
    padding: R.units.scale(10),
    justifyContent: 'center',
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
  editIcon: {
    color: R.colors.primary.main,
  },
});
