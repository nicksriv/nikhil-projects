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

const AddProfileExperience = ({onChange, formValue, formError}) => {
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const handleChange = (type, selectedDate, value) => {
    if (type === 'startDate') {
      setStartDate(new Date(value));
      onChange({
        key: 'workDetail',
        name: 'startDate',
        value: selectedDate,
      });
      return;
    }

    setEndDate(new Date(value));
    onChange({
      key: 'workDetail',
      name: 'endDate',
      value: selectedDate,
    });
  };

  const formatDate = (startDate, endDate) => {
    const sDate = moment(startDate, 'DD MMM YY, hh:mm A').valueOf();
    const eDate = moment(endDate, 'DD MMM YY, hh:mm A').valueOf();

    if (sDate) {
      setStartDate(sDate);
    }
    if (eDate) {
      setStartDate(eDate);
    }
  };

  React.useEffect(() => {
    formatDate(formValue.startDate, formValue.endDate);
  }, []);

  const showMode = type => {
    if (type === 'startDate') {
      DateTimePickerAndroid.open({
        value: startDate,
        onChange: (data, selectedDate) =>
          handleChange('startDate', selectedDate, data.nativeEvent.timestamp),
        mode: 'date',
        // is24Hour: true,
      });
      return;
    }

    DateTimePickerAndroid.open({
      value: endDate,
      onChange: (data, selectedDate) =>
        handleChange('endDate', selectedDate, data.nativeEvent.timestamp),
      mode: 'date',
      // is24Hour: true,
    });
  };

  const showDatepicker = type => {
    showMode(type);
  };
  const addProfileExperience = [
    {
      label: 'Designation:',
      placeholder: 'Enter Your Designation',
      value: formValue?.designation,
      onChange: value =>
        onChange({key: 'workDetail', name: 'designation', value: value}),
      error: formError.designation,
    },
    {
      label: 'Company Name:',
      placeholder: 'Enter Company Name',
      value: formValue?.company,
      onChange: value =>
        onChange({key: 'workDetail', name: 'company', value: value}),
      error: formError.company,
    },
    {
      label: 'Work Description:',
      placeholder: 'Enter Work Description',
      value: formValue?.workDescription,
      onChange: value =>
        onChange({key: 'workDetail', name: 'workDescription', value: value}),
      multiline: true,
      numberOfLines: 3,
      error: formError.workDescription,
    },
  ];
  return (
    <View>
      <Card style={styles.cardStyle}>
        <RenderForm data={addProfileExperience} />
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
  );
};

export default AddProfileExperience;

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: R.units.scale(5),
    marginHorizontal: R.units.scale(12),
    marginVertical: R.units.scale(15),
    elevation: 4,
    padding: R.units.scale(10),
    justifyContent: 'center',
  },
  headerText: {
    color: R.colors.text.secondary,
    fontSize: R.units.scale(12),
    fontWeight: '500',
    // width: "40%",
    marginHorizontal: R.units.scale(6),
  },
});
