import React from "react";
import { StyleSheet } from "react-native";
import Text from "../common/Text";
import View from "../common/View";
import Icon from "react-native-vector-icons/Ionicons";
import { R } from "../../res";
import Separator from "../common/Separator";
import { navigationHelper } from "../../helper/navigation";
import CheckBox from '@react-native-community/checkbox';
import ActivityIndicator from "../common/ActivityIndicator";
import Button from "../form/Button";
// import Placesearch from "react-native-placesearch";

const RenderFilter = ({
  selectedFilterName,
  filterOptionsData = [],
  onSelectOptions,
  checkedItems,
  onLocationChange,
  selectedCity,
}) => {
  return (
    <>
      {["CATEGORY", "SKILLS"].includes(selectedFilterName)
        ? filterOptionsData.map((item, index) => {
            return (
              <React.Fragment key={`test_${index}`}>
                <View
                  touchable
                  onPress={() => {
                    onSelectOptions(item.id);
                  }}
                  paddingHorizontal={10}
                >
                  <View
                    touchable
                    onPress={() => {
                      onSelectOptions(item.id);
                    }}
                    flexDirection="row"
                    alignItems="flex-start"
                  >
                    <CheckBox
                      value={checkedItems.includes(item.id) ? true : false}
                      onValueChange={() => {
                        onSelectOptions(item.id);
                      }}
                      tintColors={'#000'}
                    />
                    <Separator vertical />
                    <Text style={{marginTop:6}} lineHeight={12}>{item.name}</Text>
                  </View>
                </View>
                <Separator size={16} />
              </React.Fragment>
            );
          })
        : null
          // <View>
          //   <Placesearch
          //     apikey={config.placesAPIAuthKey} // required *
          //     SelectedAddress={(data) => onLocationChange({ data })} // required *
          //     onClose={(data) => console.log(data)}
          //     coordinate={true} //optional
          //     removeImg={true}
          //     country="IN"
          //     onlyCity
          //     placeHolder={"Search City"}
          //     // InputContainer={{ width: "100%", borderWidth: 1 }} //optional
          //     // MainContainer={{ width: "100%" }} //optional
          //     // StatusBarColor="red" //option *only for android
          //     // StatusBarStyle="" //option  default "dark-content" *only for android
          //     // ContainerBackgroundColor="red" // optional
          //     // ListStyle = {{'your style goes here'}} //optional
          //     // ListTextStyle = {{'your style goes here'}} //optional
          //     // ListIconStyle = {{'your style goes here'}} //optional
          //     // ImgStyle = {{'your style goes here'}} //optional
          //     // Img = {{'your style goes here'}} //optional
          //     // textInput = {{'your style goes here'}} //optional
          //   />
          // </View>
      }
    </>
  );
};

const Filter = ({
  filterData,
  filterOptionsData = [],
  onSelectFilter,
  onSelectOptions,
  isLoading,
  onSubmit,
  checkedItems = [],
  selectedFilterName,
  clearFilter,
  onLocationChange,
  selectedCity,
}) => {
  return (
    <View flex={1}>
      {/* Filter header */}
      <View flex={0} style={styles.filterHeaderView}>
        <View
          flexDirection="row"
          style={{ paddingVertical: R.units.scale(10) }}
        >
          <Icon
            name="close-outline"
            size={25}
            onPress={() => {
              navigationHelper.goBack();
            }}
          />
          <Text variant="subtitle2" font="medium">
            Filters
          </Text>
        </View>
        <View style={styles.clearFilter}>
          <Text
            color={R.colors.primary.link}
            onPress={() => {
              clearFilter();
            }}
          >
            Clear Filters
          </Text>
        </View>
      </View>
      {/* Filter Content */}
      <View flex={1} style={{ paddingBottom: R.units.scale(5) }}>
        <View flexDirection="row" flex={1}>
          <View backgroundColor={R.colors.white} width={"40%"}>
            {filterData.map((item, index) => {
              return (
                <View
                  key={`f_${index}`}
                  touchable
                  onPress={() => {
                    onSelectFilter(item.value);
                  }}
                  paddingHorizontal={10}
                  style={{
                    backgroundColor:
                      selectedFilterName === item.value
                        ? R.colors.background.chip
                        : "#fff",
                  }}
                >
                  <Separator size={10} />
                  <Text>{item.label}</Text>
                  <Separator size={7} />
                </View>
              );
            })}
          </View>
          <View
            backgroundColor={R.colors.background.logOut}
            width={"60%"}
            scrollable
            keyboardShouldPersistTaps={"always"}
          >
            <View>
              {isLoading ? (
                <View
                  style={{
                    justifyContent: "center",
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator
                    isLoading
                    color={R.colors.background}
                    size="large"
                  />
                </View>
              ) : (
                <View scrollable flex={1} keyboardShouldPersistTaps={"always"}>
                  <Separator size={12} />
                  <RenderFilter
                    selectedFilterName={selectedFilterName}
                    filterOptionsData={filterOptionsData}
                    onSelectOptions={onSelectOptions}
                    checkedItems={checkedItems}
                    onLocationChange={onLocationChange}
                    selectedCity={selectedCity}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
      {/* Filter Footer */}
      <View flex={0} style={{ justifyContent: "flex-end" }}>
        <Button
          style={styles.submitStyle}
          text="Apply Filter"
          onPress={() => onSubmit()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterHeaderView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: R.units.scale(4),
  },
  clearFilter: {},
  resetText: {
    color: R.colors.primary.link,
    textDecorationLine: "underline",
    fontSize: R.units.scale(13),
  },
  optionHeader: {
    color: R.colors.text.secondary,
    fontSize: R.units.scale(13),
  },
  activeOptionHeader: {
    color: R.colors.primary.link,
    fontSize: R.units.scale(13),
  },
  optionText: {
    color: R.colors.black,
    fontSize: R.units.scale(13),
  },
  searchSection: {},
  customInputStyle: {
    backgroundColor: R.colors.background.tab,
    padding: R.units.scale(10),
    textAlign: "left",
    marginVertical: R.units.scale(10),
    borderRadius: R.units.scale(5),
  },
  searchItemView: {
    paddingHorizontal: R.units.scale(10),
  },
  searchItem: {
    fontSize: R.units.scale(13),
    marginVertical: R.units.scale(5),
    color: R.colors.text.secondary,
  },
  submitStyle: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: R.units.scale(5),
    backgroundColor: R.colors.background.apply,
    alignItems: "center",
    marginBottom: R.units.scale(10),
    paddingVertical: R.units.scale(12),
    borderRadius: R.units.scale(3),
  },
});

export default Filter;
