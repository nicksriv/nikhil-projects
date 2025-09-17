import React from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import Check from "react-native-vector-icons/Feather";

import { R } from "@app/res";

import Text from "@app/component/common/Text";
import View from "@app/component/common/View";
import TextInput from "@app/component/common/TextInput";
import Separator from "@app/component/common/Separator";
import Button from "@app/component/form/Button";

const itemColor = {
  default: R.colors.text.primary,
  selected: R.colors.primary,
};

const RaisedDisputeForm = ({
  formData,
  formError,
  onChange,
  myWorkList = [],
  disputeListCategory = [],
  onSubmit,
  isLoading,
}) => {
  const disputeCategoryOptions = [];
  disputeListCategory.map((item) => {
    const option = {
      id: item.id,
      label: item.disputeCategoryName,
      value: item.id.toUpperCase(),
    };
    disputeCategoryOptions.push(option);
  });

  const jobOptions = [];
  myWorkList.map((item) => {
    const option = {
      id: item.id,
      label: item.jobTitle,
      value: item.id.toUpperCase(),
    };
    jobOptions.push(option);
  });

  const renderDropdownItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === formData.disputeCategoryId && (
          <Check style={styles.icon} color="green" name="check" size={20} />
        )}
      </View>
    );
  };
  return (
    <View style={styles.container} scrollable>
      <Text>Select Dispute Category</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={disputeCategoryOptions}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select Category"
          searchPlaceholder="Search..."
          value={formData.disputeCategoryId}
          onChange={item => {
            onChange('disputeCategoryId', item.value);
          }}
          renderLeftIcon={() => (
            <Check style={styles.icon} color="green" name="check" size={20} />
          )}
          renderItem={renderDropdownItem}
        />
      <Separator size={20} />
      <Text>Select Job</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={jobOptions}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select Jobs"
          searchPlaceholder="Search..."
          value={formData.jobCandidateId}
          onChange={item => {
            onChange('jobCandidateId', item.value);
          }}
          renderLeftIcon={() => (
            <Check style={styles.icon} color="green" name="check" size={20} />
          )}
          renderItem={renderDropdownItem}
        />
      <Separator size={10} />

      <Text style={styles.header}>Title</Text>
      <TextInput
        placeholder="Enter Title"
        value={formData.disputeTitle}
        onChange={value => onChange('disputeTitle', value)}
      />

      <Separator size={10} />
      <Text style={styles.header}>Description</Text>
      <TextInput
        placeholder="Enter Description"
        name="disputeDescription"
        value={formData.disputeDescription}
        style={styles.descriptionInputStyle}
        onChange={value => onChange('disputeDescription', value)}
      />

      <Separator size={0} />
      <Button
        text={'Submit'}
        onPress={onSubmit}
        isLoading={isLoading}
        size="md"
        variant="contained"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: R.units.scale(20),
    backgroundColor: R.colors.background.paper,
    flex: 1,
  },
  descriptionInputStyle: {
    minHeight: 150,
    textAlignVertical: 'top',
  },
  dropdown: {
    height: 50,
    backgroundColor:R.colors.background.input,
    borderRadius: R.units.scale(5),
    padding:R.units.scale(6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding:R.units.scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize:R.units.scale(12),
  },
  placeholderStyle: {
    fontSize:R.units.scale(12),
  },
  selectedTextStyle: {
    fontSize:R.units.scale(12),
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize:R.units.scale(12),
  },
});

export default RaisedDisputeForm;
