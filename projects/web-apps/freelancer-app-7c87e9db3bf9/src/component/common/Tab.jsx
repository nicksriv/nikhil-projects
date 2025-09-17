import React from "react";
import { StyleSheet } from "react-native";

import { R } from "../../res";

import View from "./View";
import Text from "./Text";
import Separator from "./Separator";
import Divider from "./Divider";

const Tab = (props) => {
  const {
    tabs,
    labelKey = "label",
    valueKey = "value",
    Item = DefaultTabItem,
    scrollable = false,
    horizontal = true,
    value,
    onChange,
    style = {},
  } = props;
  const [activeTab, setActiveTab] = React.useState(null);

  React.useEffect(() => {
    if (value && value !== activeTab) {
      setActiveTab(value);
    }
    if (!value && !activeTab) {
      setActiveTab(tabs[0][valueKey]);
    }
  }, [value]);

  const handleOnPress = ({ value, item, tabs }) => {
    setActiveTab(value);
    onChange && onChange({ value, item, tabs });
  };
  // console.log("tabs", tabs);

  return (
    <View
      scrollable={scrollable}
      horizontal={horizontal}
      style={[styles.root, style.root || {}]}
    >
      {tabs.map((t, index) => (
        <Item
          key={`tab_${index}`}
          isActive={activeTab === t[valueKey]}
          item={{ ...t, index }}
          label={t[labelKey]}
          value={t[valueKey]}
          onPress={handleOnPress}
          tabs={tabs}
          style={style}
        />
      ))}
    </View>
  );
};

const DefaultTabItem = ({ tabs, ...props }) => {
  let { isActive, label, value, onPress, item, style } = props;

  return (
    <>
      <View
        pressable
        onPress={() => onPress({ value, item, tabs })}
        style={[
          styles.itemRoot,
          isActive ? styles.itemRootActive : {},
          style.itemRoot || {},
        ]}
      >
        <View style={[styles.item, isActive ? styles.itemActive : {}]}>
          <Separator />
          <Text
            variant="body1"
            align="center"
            font={isActive ? "medium" : "regular"}
            color={isActive ? R.colors.primary.main : "primary"}
          >
            {label}
          </Text>
          <Separator />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: R.colors.white,
  },
  itemRoot: {
    flexDirection: "row",
    flex: 1,
    paddingHorizontal: R.units.scale(10),
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: R.units.scale(2),
    borderColor: "transparent",
  },
  itemRootActive: {
    backgroundColor: R.colors.white,
    borderColor: R.colors.primary.main,
  },
  item: {
  },
  itemActive: {
    
  },
});

export default React.memo(Tab);
