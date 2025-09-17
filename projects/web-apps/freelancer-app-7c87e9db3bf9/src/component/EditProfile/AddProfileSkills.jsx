import React from 'react';

import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddProfileSkills = ({
  items,
  componentData,
  selectedItems,
  onSelectedItemsChange,
  skillsList = [],
}) => {
  return (
    <>
      <SectionedMultiSelect
        IconRenderer={Icon}
        items={skillsList}
        uniqueKey="id"
        subKey="skills"
        selectedItems={selectedItems}
        selectText="Select Skills"
        searchPlaceholderText={'Search skills...'}
        styles={{searchTextInput: {color: '#000'}}}
        onSelectedItemsChange={onSelectedItemsChange}
      />
    </>
  );
};
export default AddProfileSkills;
