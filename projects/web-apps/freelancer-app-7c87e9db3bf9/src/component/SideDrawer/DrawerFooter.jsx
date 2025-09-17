import React from 'react';
import {Modal, StyleSheet} from 'react-native';
import {R} from '../../res';
import Text from '../common/Text';
import View from '../common/View';
import {authActions} from '../../store/auth/authActions';
import {useDispatch} from 'react-redux';
import {colors} from '@app/res/colors';
import Button from '../form/Button';

const DrawerFooter = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = React.useState(false);

  const logOut = () => {
    dispatch(authActions.logout());
  };
  return (
    <View alignItems="center" marginVertical={8} > 
      <Text
        style={styles.logout}
        onPress={() => {
          setModalVisible(true);
        }}>
        Logout
      </Text>
      <Text style={styles.version}>v1.0.0</Text>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false)
        }}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{backgroundColor: colors.background.tab, padding: 60, paddingVertical:45,borderRadius:4}}>
            <Text>Do you wish to log out?</Text>

            <View flexDirection="row" style={{justifyContent:"space-around",marginTop:10}}>
              <Button
                text={'Yes'}
                onPress={() => logOut()}
                size="sm"
                variant="contained"
              />
               <Button
                text={'No'}
                onPress={() =>  setModalVisible(false)}
                size="sm"
                variant="contained"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  logout: {
    fontWeight: '500',
    fontSize: R.units.scale(15),
    paddingHorizontal: R.units.scale(4),
    paddingVertical: R.units.scale(2)
  },
  version: {
    fontSize: R.units.scale(9),
    fontWeight: '400',
    color: R.colors.text.secondary,
  },
});

export default DrawerFooter;
