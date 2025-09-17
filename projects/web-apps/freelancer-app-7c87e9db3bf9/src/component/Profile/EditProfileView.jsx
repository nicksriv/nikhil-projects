import React from 'react';
import {FlatList, Modal, StyleSheet} from 'react-native';
import Text from '../common/Text';
import View from '../common/View';
import {R} from '../../res';
import Button from '../../component/form/Button';
import Add from 'react-native-vector-icons/EvilIcons';
import {navigationHelper} from '../../helper/navigation';
import {ScreenConstants} from '../../navigator/ScreenConstants';
import {useDispatch} from 'react-redux';
import {colors} from '@app/res/colors';
import EditProfileDescription from '@app/component/EditProfile/EditProfileDescription';
import EditProfileKycDetails from '@app/component/EditProfile/EditProfileKycDetails';
import EditProfileBankAccountDetails from '@app/component/EditProfile/EditProfileBankAccountDetails';
import EditProfileSkills from '@app/component/EditProfile/EditProfileSkills';
import AddProfileSkills from '@app/component/EditProfile/AddProfileSkills';
import EditProfileExperience from '@app/component/EditProfile/EditProfileExperience';
import EditSingleProfileExperience from '@app/component/EditProfile/EditSingleProfileExperience';
import AddProfileExperience from '@app/component/EditProfile/AddProfileExperience';

const EditProfileView = ({
  isLoading,
  items,
  componentKey,
  componentData,
  onChange,
  onSelectedItemsChange,
  selectedItems,
  formValue,
  onSubmit,
  deleteSkills,
  onDeleteSkills,
  skillsList,
  deleteWorkExperience,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(authActions.logout());
  };

  return (
    <>
      <View flex={1}>
        <View scrollable>
          {componentKey === 'basicDetails' ? (
            <EditProfileDescription
              onChange={onChange}
              componentData={componentData}
              formValue={formValue}
            />
          ) : null}
          {componentKey === 'bankDetail' ? (
            <EditProfileBankAccountDetails
              onChange={onChange}
              componentData={componentData}
              formValue={formValue}
            />
          ) : null}
          {componentKey === 'kycDetail' ? (
            <EditProfileKycDetails onChange={onChange} formValue={formValue} />
          ) : null}
          {componentKey === 'editSkills' ? (
            <EditProfileSkills
              onDeleteSkills={onDeleteSkills}
              deleteSkills={deleteSkills}
              onChange={onChange}
              componentData={componentData}
              selectedItems={selectedItems}
            />
          ) : null}
          {componentKey === 'addSkills' ? (
            <AddProfileSkills
              skillsList={skillsList}
              onChange={onChange}
              componentData={componentData}
              onSelectedItemsChange={onSelectedItemsChange}
              selectedItems={selectedItems}
              items={items}
            />
          ) : null}
          {componentKey === 'workDetail' ? (
            <EditProfileExperience
              onChange={onChange}
              componentData={componentData}
              formValue={formValue}
              modalVisible={modalVisible}
              deleteWorkExperience={deleteWorkExperience}
            />
          ) : null}
          {componentKey === 'editWorkDetail' ? (
            <EditSingleProfileExperience
              onChange={onChange}
              componentData={componentData}
              formValue={formValue}
            />
          ) : null}
          {componentKey === 'addWorkDetail' ? (
            <AddProfileExperience
              onChange={onChange}
              componentData={componentData}
              formValue={formValue}
            />
          ) : null}
        </View>
        {componentKey === 'workDetail' ? (
          <Add
            name="plus"
            size={R.units.scale(32)}
            style={{
              position: 'absolute',
              bottom: 20,
              color: R.colors.chipBorder,
              right: 10,
            }}
            onPress={() => {
              navigationHelper.navigate({
                name: ScreenConstants.EDIT_PROFILE,
                params: {
                  key: 'addWorkDetail',
                  // data: 123,
                  name: 'Work Experience',
                },
              });
            }}
          />
        ) : (
          <View
            paddingHorizontal={15}
            paddingVertical={10}
            flexDirection="row"
            alignItems="center">
            <View flex={1}>
              <Button
                isLoading={isLoading}
                disabled={isLoading}
                onPress={() => onSubmit(componentKey)}
                text={'Save & Continue'}
                size="md"
                style={{flexDirection: 'row', justifyContent: 'center'}}
              />
            </View>
            {componentKey === 'editSkills' ? (
              <View alignItems="flex-end">
                <Add
                  name="plus"
                  size={R.units.scale(32)}
                  style={{
                    color: R.colors.chipBorder,
                    paddingHorizontal: R.units.scale(10),
                  }}
                  onPress={() => {
                    navigationHelper.navigate({
                      name: ScreenConstants.EDIT_PROFILE,
                      params: {
                        key: 'addSkills',
                        // data: 123,
                        name: 'Add Skills',
                      },
                    });
                  }}
                />
              </View>
            ) : null}
          </View>
        )}

        {/* {componentKey === 'workDetail' ? (
          <Add
            name="add-circle-outline"
            size={R.units.scale(32)}
            style={{
              position: 'absolute',
              bottom: 20,
              color: R.colors.chipBorder,
              right: 10,
            }}
            onPress={() => {
              navigationHelper.navigate({
                name: ScreenConstants.EDIT_PROFILE,
                params: {
                  key: 'addWorkDetail',
                  // data: 123,
                  name: 'Work Experience',
                },
              });
            }}
          />
        ) : null} */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: R.units.scale(5),
    marginHorizontal: R.units.scale(12),
    marginVertical: R.units.scale(15),
    elevation: 4,
    padding: R.units.scale(10),
    justifyContent: 'center',
  },
  cardHeader: {
    fontSize: R.units.scale(14),
    fontWeight: '500',
    marginHorizontal: R.units.scale(10),
    marginVertical: R.units.scale(5),
  },
  headerText: {
    color: R.colors.text.secondary,
    fontSize: R.units.scale(12),
    fontWeight: '500',
    // width: "40%",
    marginHorizontal: R.units.scale(6),
  },
  longInput: {
    backgroundColor: R.colors.background.tab,
    paddingHorizontal: R.units.scale(10),
    textAlign: 'left',
    marginHorizontal: R.units.scale(4),
    paddingVertical: R.units.scale(11),
    borderRadius: R.units.scale(5),
    minHeight: 90,
    textAlignVertical: 'top',
    marginBottom: R.units.scale(6),
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
    color: R.colors.chipBorder,
  },
  deleteIcon: {
    color: 'red',
    marginHorizontal: R.units.scale(10),
  },
  skillHeaderText: {
    color: R.colors.text.secondary,
    fontSize: R.units.scale(11),
    fontWeight: '500',
    marginVertical: R.units.scale(2),
  },
});
export default EditProfileView;
