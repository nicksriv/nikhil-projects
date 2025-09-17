import React from "react";
import Text from "../common/Text";
import View from "../common/View";
import Button from "../form/Button";
import { Modal, StyleSheet } from "react-native";
import TextInput from "../../component/common/TextInput";
import { R } from "../../res";
import Close from "react-native-vector-icons/Ionicons";

const JobApplyNote = ({
  text,
  modalVisible,
  buttonText,
  onChange,
  userNote,
  onClose,
  handleJobAction,
  jobID,
  isLoading,
}) => {
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View alignItems="flex-end" paddingHorizontal={R.units.scale(4)}>
              <Close
                name="close-outline"
                size={20}
                onPress={() => {
                  onClose();
                }}
              />
            </View>
            <Text style={styles.modalText}>{text}</Text>
            <TextInput onChange={(value) => onChange(value)} />
            <Button
              isLoading={isLoading}
              text={buttonText}
              size="sm"
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginHorizontal: 10,
              }}
              onPress={() => handleJobAction(jobID)}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: R.colors.white,
    borderRadius: R.units.scale(10),
    padding: R.units.scale(4),
    width: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default JobApplyNote;
