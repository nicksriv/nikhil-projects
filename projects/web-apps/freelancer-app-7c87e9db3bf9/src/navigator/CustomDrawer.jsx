import React from 'react';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import View from '../component/common/View';
import DrawerHeader from '../component/SideDrawer/DrawerHeader';
import DrawerFooter from '../component/SideDrawer/DrawerFooter';

const CustomDrawer = props => {
  return (
    <>
      <View style={{flex: 1}}>
        <DrawerContentScrollView {...props}>
          <View>
            <DrawerHeader {...props} />
          </View>
          <View>
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>
      </View>
      <View>
        <DrawerFooter />
      </View>
    </>
  );
};

export default CustomDrawer;
