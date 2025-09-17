import React from 'react';
import {StyleSheet} from 'react-native';
import Text from '@app/component/common/Text';
import View from '@app/component/common/View';
import Card from '@app/component/common/Card';
import RenderForm from '@app/component/common/RenderForm';
import {R} from '@app/res/index';
import TextInput from '@app/component/common/TextInput';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import moment from 'moment';

const EditSingleProfileExperience = ({onChange, formValue, formError}) => {
  const {designation, company, workDescription} = formValue;
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const editprofileExperience = [
    {
      label: 'Designation:',
      placeholder: 'Enter Designation:',
      value: designation,
      onChange: value =>
        onChange({key: 'workDetail', name: 'designation', value: value}),
      error: formError.designation,
    },
    {
      label: 'Company Name:',
      placeholder: 'Enter Company Name',
      value: company,
      onChange: value =>
        onChange({key: 'workDetail', name: 'company', value: value}),
      error: formError.company,
    },
    {
      label: 'Work Description:',
      placeholder: 'Enter Work Description',
      value: workDescription,
      onChange: value =>
        onChange({key: 'workDetail', name: 'workDescription', value: value}),
      multiline: true,
      numberOfLines: 3,
      error: formError.workDescription,
    },
  ];

  const handleChange = (type, selectedDate, value) => {
    if (type === 'startDate') {
      setStartDate(new Date(selectedDate));
      onChange({
        key: 'workDetail',
        name: 'startDate',
        value: selectedDate,
      });
      return;
    }

    setEndDate(new Date(selectedDate));
    onChange({
      key: 'workDetail',
      name: 'endDate',
      value: selectedDate,
    });
  };

  const formatDate = (startDate, endDate) => {
    const sDate = moment(startDate, 'DD MMM YY, hh:mm A').valueOf();
    const eDate = moment(endDate, 'DD MMM YY, hh:mm A').valueOf();
    if (startDate) {
      setStartDate(sDate);
    }
    if (endDate) {
      setEndDate(eDate);
    }
  };

  React.useEffect(() => {
    formatDate(formValue.startDate, formValue.endDate);
  }, [formValue?.startDate, formValue?.endDate]);

  // React.useEffect(() => {}, [startDate, endDate]);

  const showMode = type => {
    if (type === 'startDate') {
      DateTimePickerAndroid.open({
        value: new Date(startDate),
        onChange: (data, selectedDate) =>
          handleChange('startDate', selectedDate, data.nativeEvent.timestamp),
        mode: 'date',
        // is24Hour: true,
      });
      return;
    }

    DateTimePickerAndroid.open({
      value: new Date(endDate),
      onChange: (data, selectedDate) =>
        handleChange('endDate', selectedDate, data.nativeEvent.timestamp),
      mode: 'date',
      // is24Hour: true,
    });
  };

  const showDatepicker = type => {
    showMode(type);
  };
  return (
    <>
      <View>
        <Card style={styles.cardStyle}>
          <RenderForm data={editprofileExperience} />
          <View flexDirection="column">
            <View>
              <Text style={styles.headerText}>Start Date:</Text>
              <View pressable onPress={() => showDatepicker('startDate')}>
                <TextInput
                  style={{color: '#000', marginBottom: 4, marginTop: 3}}
                  value={
                    startDate ? new Date(startDate).toLocaleDateString() : ''
                  }
                  disabled
                  helperText="DD/MM/YY"
                />
              </View>
            </View>
            <View width={'100%'} style={{marginVertical: 10}}>
              <Text style={styles.headerText}>End Date:</Text>
              <View pressable onPress={() => showDatepicker('endDate')}>
                <TextInput
                  style={{color: '#000', marginBottom: 4, marginTop: 3}}
                  value={endDate ? new Date(endDate).toLocaleDateString() : ''}
                  disabled
                  helperText="DD/MM/YY"
                />
              </View>
            </View>
          </View>
        </Card>
      </View>
    </>
  );
};

export default EditSingleProfileExperience;
const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: R.units.scale(5),
    marginHorizontal: R.units.scale(12),
    marginVertical: R.units.scale(15),
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
    color: R.colors.chipBorder,
  },
});
