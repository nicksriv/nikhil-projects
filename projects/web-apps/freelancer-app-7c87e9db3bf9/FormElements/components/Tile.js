import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { colors, primaryColor } from "../themes/color"; // Dynamic Themes
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";

const Tile = (props) => {
  const { data, themeData } = props;

  const [selectedItem, setSelectedItem] = useState(null);

  const onPress = (key) => {
    setSelectedItem(key);
  };

  return (
    <SafeAreaView style={{ marginVertical: 5 }}>
      <Text style={{ marginVertical: 10, marginLeft: 20, fontFamily: fontsRegular(themeData) }}>{data?.label}</Text>
      <FlatList
        numColumns={2}
        data={data?.customOptions?.tileProperties}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1 / 2,
              width: "95%",
              padding: 2,
              margin: 2
            }}
          >
            <TouchableOpacity
              disabled={true}
              style={[
                styles.tileStyle,
                {
                  borderWidth: 1,
                  borderColor:
                    item.key == selectedItem ? primaryColor(themeData) : colors.lightGrayColor,
                  borderRadius: 5,
                  backgroundColor: item.tilesColor,
                },
              ]}
              //onPress={() => onPress(item.key)}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: item.key == selectedItem ? primaryColor(themeData) : colors.lightGrayColor,
                  marginVertical: 10,
                  width: "100%",
                  fontSize: 15,
                  fontFamily: fontsRegular(themeData)
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  color: item.key == selectedItem ? primaryColor(themeData) : colors.lightGrayColor,
                  width: "100%",
                  fontSize: 15,
                  fontFamily: fontsRegular(themeData)
                }}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Tile;

const styles = StyleSheet.create({
  tileStyle: {
    width: "97%",
    height: 90,
    margin: 2,
    flexDirection: "column",
  },
});
