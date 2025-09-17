import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import View from '@app/component/common/View';
import Text from '@app/component/common/Text';
import {R} from '@app/res/index';
import Card from '@app/component/common/Card';
import {navigationHelper} from '@app/helper/navigation';
import {ScreenConstants} from '@app/navigator/ScreenConstants';
import Chip from '@app/component/common/Chip';
import CardHeader from '@app/component/Profile/CardHeader';
import InformativeImage from '@app/component/common/InformativeImage';

const SkillLabel = ({item}) => {
  return (
    <Chip
      variant="contained"
      label={item.name}
      customViewStyle={{marginVertical: R.units.scale(5)}}
    />
  );
};

const ProfileSkills = props => {
  const skillCategory = props.skillCategory;
  const checkSkills = (skillCategory = []) => {
    let isSkillsAvailable = false;
    if (skillCategory.length) {
      isSkillsAvailable = true;
    }
    return isSkillsAvailable;
  };
  return (
    <>
      <CardHeader
        cardHeader={'Skills'}
        iconName={checkSkills(skillCategory) ? 'pencil' : 'plus'}
        onIconPress={() => {
          navigationHelper.navigate({
            name: ScreenConstants.EDIT_PROFILE,
            params: {
              key: checkSkills(skillCategory) ? 'editSkills' : 'addSkills',
              data: skillCategory,
              name: checkSkills(skillCategory) ? 'Edit Skills' : 'Add Skills',
            },
          });
        }}
      />
      {skillCategory.length ? (
        <Card style={styles.cardStyle}>
          {skillCategory.map((item, index) => {
            return (
              <React.Fragment key={`profile_Skills${index}`}>
                <Text style={styles.skillHeaderText}>{item.name}:</Text>
                <View style={{flexDirection: 'row'}}>
                  <FlatList
                    horizontal={true}
                    renderItem={SkillLabel}
                    data={item.skills}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              </React.Fragment>
            );
          })}
        </Card>
      ) : (
        <InformativeImage text={'No Skills Uploaded'} />
      )}
    </>
  );
};

export default ProfileSkills;

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: R.units.scale(5),
    marginHorizontal: R.units.scale(12),
    marginBottom: R.units.scale(10),
    elevation: 4,
    padding: R.units.scale(10),
  },
  skillHeaderText: {
    color: R.colors.text.secondary,
    fontSize: R.units.scale(11),
    fontWeight: '500',
  },
});
