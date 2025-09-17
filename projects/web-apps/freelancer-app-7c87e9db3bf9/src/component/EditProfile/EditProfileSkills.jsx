import React from 'react';
import Card from '@app/component/common/Card';
import {R} from '@app/res/index';
import {FlatList, StyleSheet} from 'react-native';
import Text from '@app/component/common/Text';
import View from '@app/component/common/View';
import Chip from '@app/component/common/Chip';

const EditProfileSkills = ({
  onDeleteSkills,
  deleteSkills = [],
  onChange,
  componentData,
}) => {
  const SkillLabel = ({item}) => {
    return (
      <Chip
        onChipPress={() => onDeleteSkills({id: item.id, name: item.name})}
        iconName="ios-close-outline"
        variant="contained"
        label={item.name}
        customViewStyle={{marginVertical: R.units.scale(5)}}
        onPress={() => onDeleteSkills({id: item.id, name: item.name})}
      />
    );
  };
  return (
    <View>
      {componentData.length ? (
        <Card style={styles.cardStyle}>
          {componentData.map((item, index) => {
            return (
              <>
                <Text key={index} style={styles.skillHeaderText}>
                  {item.name}:
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <FlatList
                    horizontal={true}
                    renderItem={SkillLabel}
                    data={item.skills}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              </>
            );
          })}
        </Card>
      ) : null}
    </View>
  );
};

export default EditProfileSkills;
const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: R.units.scale(5),
    marginHorizontal: R.units.scale(12),
    marginVertical: R.units.scale(15),
    elevation: 4,
    padding: R.units.scale(10),
    justifyContent: 'center',
  },
});
