import Card from '@app/component/common/Card';
import React from 'react';
import {StyleSheet} from 'react-native';
import View from '../../component/common/View';
import ModuleCard from '../../component/WorkDetail/ModuleCard';
import {navigationHelper} from '../../helper/navigation';
import {ScreenConstants} from '../../navigator/ScreenConstants';
import {R} from '../../res';
class SubModuleListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subModuleData: [],
      setModuleTiles:null,
      myModule:null
    };
  }

  componentDidMount() {
    this.handleSubmoduleData();
  }

  handleSubmoduleData = () => {
    const data = this.props;
    const subModuleData = data.route?.params?.value;
    const selectedModuleData = data.route?.params?.myModule;
    this.setState({subModuleData,myModule:selectedModuleData});
  };

   

  handleOnPress = (value) => {

    const {myModule} = this.state
    navigationHelper.navigate({
      name: ScreenConstants.MODULE_DETAIL,
      params: {
        mySubModule:value,
        myModule

      },
    });
  };

  render() {
    const {subModuleData} = this.state;
    return (
      <>
        <View flexDirection="row" flexWrap="wrap" justifyContent="space-around">
        <Card style={styles.cardStyle}>
          {subModuleData.length
            ? subModuleData.map((item, idx) => {
                return (
                  <ModuleCard
                    moduleData={item}
                    key={`modules${idx}`}
                    handlePress={() =>
                      this.handleOnPress(item)
                    }
                  />
                );
              })
            : null}
            </Card>
        </View>
      </>
    );
  }
}

export default SubModuleListContainer;

const styles = StyleSheet.create({
  moduleCard: {
    borderRadius: R.units.scale(8),
    padding: R.units.scale(12),
    margin: R.units.scale(10),
    borderWidth: R.units.scale(1),
    borderColor: R.colors.chipBorder,
    backgroundColor: R.colors.white,
    alignItems: 'center',
    width: '40%',
  },
  moduleContent: {
    alignItems: 'center',
    paddingVertical: R.units.scale(10),
  },
  moduleName: {
    fontSize: R.units.scale(10),
    fontFamily: (R.fonts.poppin.light = 'Poppins-Light'),
    textAlign: 'center',
  },
  moduleIconStyle: {
    color: R.colors.chipBorder,
  },
  cardStyle: {
    backgroundColor: R.colors.white,
    elevation: 2,
    borderRadius: R.units.scale(4),
    padding: R.units.scale(8),
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between",
    flexWrap:"wrap",
    marginTop:10
  },
});
