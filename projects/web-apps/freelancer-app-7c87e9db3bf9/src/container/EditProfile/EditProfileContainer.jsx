import moment from 'moment';
import React from 'react';
import View from '../../component/common/View';
import {navigationHelper} from '../../helper/navigation';
import {profileApis} from '../../store/profile/profileApis';

import {R} from '../../res';
import Button from '../../component/form/Button';
import Add from 'react-native-vector-icons/AntDesign';

import EditProfileDescription from '@app/component/EditProfile/EditProfileDescription';
import EditProfileKycDetails from '@app/component/EditProfile/EditProfileKycDetails';
import EditProfileBankAccountDetails from '@app/component/EditProfile/EditProfileBankAccountDetails';
import EditProfileSkills from '@app/component/EditProfile/EditProfileSkills';
import AddProfileSkills from '@app/component/EditProfile/AddProfileSkills';
import EditSingleProfileExperience from '@app/component/EditProfile/EditSingleProfileExperience';
import AddProfileExperience from '@app/component/EditProfile/AddProfileExperience';
import {ScreenConstants} from '@app/navigator/ScreenConstants';
import {validationHelper} from '@app/helper/validation';

class EditProfileContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      basicDetails: {
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
      },
      basicDetailsError: {
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
      },
      address: {},
      kycDetail: {
        adhaarNumber: '',
        panNumber: '',
      },
      kycDetailError: {
        adhaarNumber: '',
        panNumber: '',
      },
      bankDetail: {
        bankName: '',
        accountHolderName: '',
        accountNumber: '',
        ifscCode: '',
        branch: '',
      },
      bankDetailError: {
        bankName: '',
        accountHolderName: '',
        accountNumber: '',
        ifscCode: '',
        branch: '',
      },
      workDetail: {
        designation: '',
        company: '',
        workDescription: '',
        startDate: '',
        endDate: '',
        workId: '',
      },
      workDetailError: {
        designation: '',
        company: '',
        workDescription: '',
        startDate: '',
        endDate: '',
        workId: '',
      },
      selectedItems: [],
      selectedMultiItems: [],
      editSkills: {
        deleteSkills: [],
      },
      tempDeletedSkills: [],
    };
  }

  componentDidMount() {
    this.setInitialData();
    this.props.getSkillsListAction();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const {key} = this.props.route.params;
  //   if (
  //     ['editWorkDetail'].includes(key) &&
  //     !this.state.workDetail
  //   ) {
  //     this.setInitialData();
  //   }
  // }

  setInitialData = () => {
    const {key, data} = this.props.route.params;
    if (data) {
      if (key === 'basicDetails') {
        this.setState({
          basicDetails: {
            ...this.state.basicDetails,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            mobile: data.mobile,
          },
          address: data.address,
        });
      }
      if (key === 'kycDetail') {
        this.setState({
          kycDetail: {
            ...this.state.kycDetail,
            adhaarNumber: data.adhaarNumber,
            panNumber: data.panNumber,
          },
        });
      }
      if (key === 'bankDetail') {
        this.setState({
          bankDetail: {
            ...this.state.bankDetail,
            bankName: data.bankName,
            accountHolderName: data.accountHolderName,
            accountNumber: data.accountNumber,
            ifscCode: data.ifscCode,
            branch: data.branch,
          },
        });
      }
      if (key === 'editWorkDetail') {
        this.setState({
          workDetail: {
            ...this.state.workDetail,
            company: data.company,
            designation: data.designation,
            workDescription: data.workDescription,
            startDate: data.startDate,
            endDate: data.endDate,
            workId: data.workId,
          },
        });
      }
      if (key === 'addWorkDetail') {
        this.setState({
          workDetail: {
            ...this.state.workDetail,
            company: data.company,
            designation: data.designation,
            workDescription: data.workDescription,
            startDate: data.startDate,
          },
        });
      }
      if (key === 'editSkills') {
        this.setState({tempDeletedSkills: data});
      }
    }
  };

  handleChange = ({key, name, value}) => {
    const currentState = this.state;
    currentState[key][name] = value;
    this.setState(currentState);
  };

  handleSkillAdd = selectedItems => {
    let selectedItemArr = [];
    for (const sI of selectedItems) {
      selectedItemArr.push({
        id: sI,
        experience: 2,
      });
    }
    this.setState({selectedItems, selectedMultiItems: selectedItemArr});
  };

  formatDate = dateStr => {
    const formattedDateStr = moment(dateStr, 'DD MMM YY, hh:mm A').format(
      'YYYY-MM-DD',
    );
    return formattedDateStr;
  };

  handleValidation = () => {
    const {
      basicDetails,
      basicDetailsError,
      kycDetail,
      kycDetailError,
      bankDetail,
      bankDetailError,
      workDetail,
      workDetailError,
    } = this.state;
    const {key} = this.props.route.params;

    let errorCount = 0;

    if (key === 'basicDetails') {
      const firstNameValidation = validationHelper.name(basicDetails.firstName);
      if (!firstNameValidation.isValid) {
        errorCount++;
        basicDetailsError.firstName = firstNameValidation.message;
      } else {
        basicDetailsError.firstName = '';
      }

      const lastNameValidation = validationHelper.lastName(
        basicDetails.lastName,
      );
      if (!lastNameValidation.isValid) {
        errorCount++;
        basicDetailsError.lastName = lastNameValidation.message;
      } else {
        basicDetailsError.lastName = '';
      }

      const emailValidation = validationHelper.email(basicDetails.email);
      if (!emailValidation.isValid) {
        errorCount++;
        basicDetailsError.email = emailValidation.message;
      } else {
        basicDetailsError.email = '';
      }

      const mobileValidation = validationHelper.mobile(basicDetails.mobile);
      if (!mobileValidation.isValid) {
        errorCount++;
        basicDetailsError.mobile = mobileValidation.message;
      } else {
        basicDetailsError.mobile = '';
      }
    }
    if (key === 'kycDetail') {
      const aadharValidation = validationHelper.aadhar(kycDetail.adhaarNumber);
      if (!aadharValidation.isValid) {
        errorCount++;
        kycDetailError.adhaarNumber = aadharValidation.message;
      } else {
        basicDetailsError.adhaarNumber = '';
      }

      const panValidation = validationHelper.pan(kycDetail.panNumber);
      if (!panValidation.isValid) {
        errorCount++;
        kycDetailError.panNumber = panValidation.message;
      } else {
        basicDetailsError.panNumber = '';
      }
    }
    if (key === 'bankDetail') {
      const bankNameValidation = validationHelper.name(bankDetail.bankName);
      if (!bankNameValidation.isValid) {
        errorCount++;
        bankDetailError.bankName = bankNameValidation.message;
      } else {
        bankDetailError.bankName = '';
      }
      const accoundHolderNameValidation = validationHelper.name(
        bankDetail.accountHolderName,
      );
      if (!accoundHolderNameValidation.isValid) {
        errorCount++;
        bankDetailError.accountHolderName = accoundHolderNameValidation.message;
      } else {
        bankDetailError.accountHolderName = '';
      }

      const accountNumberValidation = validationHelper.accountNumber(
        bankDetail.accountNumber,
      );
      if (!accountNumberValidation.isValid) {
        errorCount++;
        bankDetailError.accountNumber = accountNumberValidation.message;
      } else {
        bankDetailError.accountNumber = '';
      }

      const ifscCodeValidation = validationHelper.ifscCode(bankDetail.ifscCode);
      if (!ifscCodeValidation.isValid) {
        errorCount++;
        bankDetailError.ifscCode = ifscCodeValidation.message;
      } else {
        bankDetailError.ifscCode = '';
      }

      const brancAddressValidation = validationHelper.required(
        bankDetail.branch,
      );
      if (!brancAddressValidation.isValid) {
        errorCount++;
        bankDetailError.branch = brancAddressValidation.message;
      } else {
        bankDetailError.branch = '';
      }
    }
    if (['editWorkDetail', 'addWorkDetail'].includes(key)) {
      const desginationValidation = validationHelper.required(
        workDetail.designation,
      );
      if (!desginationValidation.isValid) {
        errorCount++;
        workDetailError.designation = desginationValidation.message;
      } else {
        workDetailError.designation = '';
      }

      const companyValidation = validationHelper.required(workDetail.company);
      if (!companyValidation.isValid) {
        errorCount++;
        workDetailError.company = companyValidation.message;
      } else {
        workDetailError.company = '';
      }

      const workDescriptionValidation = validationHelper.required(
        workDetail.workDescription,
      );
      if (!workDescriptionValidation.isValid) {
        errorCount++;
        workDetailError.workDescription = workDescriptionValidation.message;
      } else {
        workDetailError.workDescription = '';
      }
    }

    this.setState({
      basicDetailsError,
      kycDetail,
      bankDetailError,
      workDetailError,
    });
    return errorCount;
  };

  updateBasicDetailsApi = async payload => {
    payload.address.city = 'NA';
    payload.address.country = 'NA';
    payload.address.state = 'NA';
    const res = await profileApis.updateBasicDetails(payload);
    if (res) {
      this.props.getProfileAction();
      this.props.setToastAction({message: res.message});
      navigationHelper.goBack();
    }
  };
  updateKycDetailsApi = async payload => {
    const res = await profileApis.updateKycDetails(payload);
    if (res) {
      this.props.getProfileAction();
      this.props.setToastAction({message: res.message});
      navigationHelper.goBack();
    }
  };
  updateBankDetailApi = async payload => {
    const res = await profileApis.updateBankDetails(payload);
    if (res) {
      this.props.getProfileAction();
      this.props.setToastAction({message: res.message});
      navigationHelper.goBack();
    }
  };
  updateWorkDetailApi = async () => {
    const {
      workDetail: {
        company,
        designation,
        endDate,
        startDate,
        workDescription,
        workId,
      },
    } = this.state;

    const payload = {
      company,
      designation,
      endDate: this.formatDate(endDate),
      startDate: this.formatDate(startDate),
      workDescription,
      id: workId,
    };
    const res = await profileApis.updateWorkDetail(payload);
    if (res) {
      this.props.getProfileAction();

      this.props.setToastAction({message: res.message});
      navigationHelper.goBack();
    }
  };
  addWorkDetailApi = async () => {
    const {
      workDetail: {company, designation, endDate, startDate, workDescription},
    } = this.state;

    const payload = {
      company,
      designation,
      endDate: this.formatDate(endDate),
      startDate: this.formatDate(startDate),
      workDescription,
    };
    const res = await profileApis.addWorkDetail(payload);
    if (res) {
      this.props.getProfileAction();
      this.props.setToastAction({message: res.message});
      navigationHelper.goBack();
    }
  };
  editSkillsApi = async payload => {
    let payloadData = {
      skillToRemove: payload.deleteSkills,
    };
    const res = await profileApis.updateProfileSkill(payloadData);
    if (res) {
      this.props.getProfileAction();
      this.props.setToastAction({message: res.message});
      setTimeout(() => {
        navigationHelper.goBack();
      }, 2000);
    }
  };
  addSkillsApi = async () => {
    const {selectedMultiItems} = this.state;
    let payloadData = {
      skillToAdd: selectedMultiItems,
    };
    const res = await profileApis.updateProfileSkill(payloadData);
    if (res) {
      this.props.setToastAction({message: res.message});
      setTimeout(() => {
        navigationHelper.goBack();
      }, 2000);
      this.props.getProfileAction();
    }
  };
  handleSubmit = async key => {
    // API call
    try {
      if (this.handleValidation() > 0) {
        return;
      }
      this.setState({isLoading: true});
      const payload = this.state[key];
      if (key === 'basicDetails') {
        this.updateBasicDetailsApi(payload);
      }

      if (key === 'kycDetail') {
        this.updateKycDetailsApi(payload);
      }
      if (key === 'bankDetail') {
        this.updateBankDetailApi(payload);
      }
      if (['editWorkDetail'].includes(key)) {
        this.updateWorkDetailApi();
      }
      if (key === 'addWorkDetail') {
        this.addWorkDetailApi();
      }
      if (key === 'editSkills') {
        this.editSkillsApi(payload);
      }

      if (key === 'addSkills') {
        this.addSkillsApi();
      }
    } catch (error) {
      console.log('error', error);
      this.setState({isLoading: false});
    } finally {
      this.setState({isLoading: false});
    }
  };

  handleDeleteSkills = ({id, name}) => {
    const {tempDeletedSkills} = this.state;
    let tempRemovedSkills = JSON.parse(JSON.stringify(tempDeletedSkills));
    tempRemovedSkills.forEach(item => {
      item.skills = item.skills.filter(fd => fd.id !== id);
    });
    const filterData = tempRemovedSkills.map(item => {
      if (item.skills.length) {
        return item;
      }
      return {};
    });
    tempRemovedSkills = filterData.filter(fd => JSON.stringify(fd) !== '{}');
    this.setState(prevState => ({
      tempDeletedSkills: tempRemovedSkills,
      editSkills: {
        ...prevState.editSkills,
        deleteSkills: [...prevState.editSkills.deleteSkills, id],
      },
    }));
  };

  render() {
    const {
      tempDeletedSkills,
      basicDetailsError,
      kycDetailError,
      bankDetailError,
      workDetailError,
    } = this.state;
    let {key: componentKey, data: componentData} = this.props.route.params;
    const {skillsList} = this.props;
    let value = {};
    if (componentKey === 'basicDetails') {
      value = this.state.basicDetails;
      value.address = this.state.address;
    }

    if (componentKey === 'kycDetail') {
      value = this.state.kycDetail;
    }
    if (componentKey === 'bankDetail') {
      value = this.state.bankDetail;
    }
    if (componentKey === 'workDetail') {
      value = this.state.workDetail;
    }
    if (componentKey === 'editWorkDetail') {
      value = this.state.workDetail;
    }
    if (componentKey === 'addWorkDetail') {
      value = this.state.workDetail;
    }
    if (componentKey === 'editSkills') {
      componentData = tempDeletedSkills;
    }
    return (
      <View flex={1}>
        <View scrollable>
          {componentKey === 'basicDetails' ? (
            <EditProfileDescription
              onChange={this.handleChange}
              componentData={componentData}
              formValue={value}
              formError={basicDetailsError}
            />
          ) : null}
          {componentKey === 'bankDetail' ? (
            <EditProfileBankAccountDetails
              onChange={this.handleChange}
              componentData={componentData}
              formValue={value}
              formError={bankDetailError}
            />
          ) : null}
          {componentKey === 'kycDetail' ? (
            <EditProfileKycDetails
              onChange={this.handleChange}
              formValue={value}
              formError={kycDetailError}
            />
          ) : null}
          {componentKey === 'editSkills' ? (
            <EditProfileSkills
              onDeleteSkills={this.handleDeleteSkills}
              deleteSkills={this.state.editSkills.deleteSkills}
              componentData={componentData}
            />
          ) : null}
          {componentKey === 'addSkills' ? (
            <AddProfileSkills
              skillsList={skillsList}
              onChange={this.handleChange}
              onSelectedItemsChange={this.handleSkillAdd}
              selectedItems={this.state.selectedItems}
              componentData={componentData}
            />
          ) : null}
          {componentKey === 'editWorkDetail' ? (
            <EditSingleProfileExperience
              onChange={this.handleChange}
              formValue={value}
              formError={workDetailError}
            />
          ) : null}
          {componentKey === 'addWorkDetail' ? (
            <AddProfileExperience
              onChange={this.handleChange}
              componentData={componentData}
              formValue={value}
              formError={workDetailError}
            />
          ) : null}
        </View>
        {componentKey === 'workDetail' ? (
          <Add
            name="pluscircle"
            size={R.units.scale(40)}
            style={{
              position: 'absolute',
              bottom: 20,
              color: R.colors.primary.main,
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
                isLoading={this.state.isLoading}
                disabled={this.state.isLoading}
                onPress={() => this.handleSubmit(componentKey)}
                text={'Save & Continue'}
                size="md"
                style={{flexDirection: 'row', justifyContent: 'center'}}
              />
            </View>
            {componentKey === 'editSkills' ? (
              <View alignItems="flex-end">
                <Add
                  name="pluscircle"
                  size={R.units.scale(36)}
                  style={{
                    color: R.colors.primary.main,
                    paddingHorizontal: R.units.scale(10),
                  }}
                  onPress={() => {
                    navigationHelper.navigate({
                      name: ScreenConstants.EDIT_PROFILE,
                      params: {
                        key: 'addSkills',
                        data: componentData,
                        name: 'Add Skills',
                      },
                    });
                  }}
                />
              </View>
            ) : null}
          </View>
        )}
      </View>
    );
  }
}

export default EditProfileContainer;
