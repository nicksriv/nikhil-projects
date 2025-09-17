import React from "react";
import { StyleSheet } from "react-native";
import { R } from "@app/res";

import View from "@app/component/common/View";
import Text from "@app/component/common/Text";
import Separator from "@app/component/common/Separator";
import TextInput from "@app/component/common/TextInput";
import Button from "@app/component/form/Button";

const AskUsForm = ({ onChange, onSubmit, formData, isLoading, formError }) => {
  return (
    <View scrollable style={styles.container}>
      <Text>Title of your question</Text>
      <TextInput
        placeholder="Type something"
        value={formData.askUsTitle}
        onChange={(value) => onChange(value, "askUsTitle")}
        error={formError.askUsTitle}
      />

      <Separator size={20} />

      <Text>Description</Text>
      <TextInput
        multiline={true}
        placeholder="Enter Description"
        style={styles.descriptionInputStyle}
        onChange={(value) => onChange(value, "askUsDescription")}
        error={formError.askUsDescription}
        value={formData.askUsDescription}
      />

      <Separator size={40} />

      <Button
        disabled={isLoading ? true : false}
        isLoading={isLoading}
        text={"Submit"}
        onPress={() => onSubmit()}
        size="md"
        variant="contained"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: R.units.scale(14),
    backgroundColor: R.colors.background.paper,
    flex: 1,
  },
  descriptionInputStyle: {
    minHeight: 160,
    textAlignVertical: "top",
  },
});

export default AskUsForm;
