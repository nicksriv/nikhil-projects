import React, { useState } from "react";
import { Alert, StyleSheet, LayoutAnimation } from "react-native";
import { R } from "@app/res";

import Arrow from "react-native-vector-icons/Feather";
import Plus from "react-native-vector-icons/Feather";

import Text from "@app/component/common/Text";
import View from "@app/component/common/View";
import Divider from "@app/component/common/Divider";
import Seperator from "@app/component/common/Separator";

const Accordion = (props) => {
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(true);
  const [isSubCategoryExpanded, setIsSubCategoryExpanded] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const onCategorySelect = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsCategoryExpanded(!isCategoryExpanded);
  };
  const onSubCategorySelect = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveId(id);
    if (id === activeId) {
      setIsSubCategoryExpanded(!isSubCategoryExpanded);
    }
  };

  const RenderItem = ({ faqTitle, faqDescription, id }) => {
    return (
      <View
        flexDirection="row"
        alignItems="baseline"
        paddingHorizontal={10}
        display={isCategoryExpanded ? "flex" : "none"}
      >
        <Plus
          name={isSubCategoryExpanded && activeId === id ? "x" : "plus"}
          size={15}
          color={R.colors.text.secondary}
          onPress={() => onSubCategorySelect(id)}
        />
        <View
          onPress={() => onSubCategorySelect(id)}
          style={{
            flex: 1,
            paddingVertical: R.units.scale(10),
            paddingLeft: R.units.scale(5),
          }}
        >
          <Text
            style={styles.subCategoryHeader}
            onPress={() => onSubCategorySelect(id)}
          >
            {faqTitle}
          </Text>
          <Text
            style={
              isSubCategoryExpanded && activeId === id
                ? [styles.subCategoryAnswer]
                : [{ display: "none" }]
            }
          >
            {faqDescription}
          </Text>
        </View>
      </View>
    );
  };

  const { title = "", faqs = [] } = props;
  return (
    <View backgroundColor={R.colors.white} paddingHorizontal={10}>
      <View style={styles.caregoryView} onPress={onCategorySelect} touchable>
        <Text style={styles.categoryHeader} onPress={onCategorySelect}>
          {title}
        </Text>

        <Arrow
          name={isCategoryExpanded ? "chevron-down" : "chevron-right"}
          size={22}
          color={R.colors.chipBorder}
          onPress={onCategorySelect}
        />
      </View>

      {faqs.length &&
        faqs.map((data, idx) => {
          return (
            <RenderItem
              key={idx}
              id={data.id}
              faqTitle={data.faqTitle}
              faqDescription={data.faqDescription}
            />
          );
        })}
      <Divider size={2} color="#EAF7FF" />
    </View>
  );
};

const styles = StyleSheet.create({
  caregoryView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: R.units.scale(10),
    paddingHorizontal: R.units.scale(10),
  },
  categoryHeader: {
    fontSize: R.units.scale(16),
    fontWeight: "500",
    lineHeight: R.units.scale(21),
    
  },
  subCategoryHeader: {
    fontSize: R.units.scale(14),
    fontWeight: "500",
    lineHeight: R.units.scale(16),
    color: R.colors.text.secondary,

  },
  subCategoryAnswer: {
    fontSize: R.units.scale(12),
    fontWeight: "400",
    lineHeight: R.units.scale(14),
    color: R.colors.text.secondary,
    marginVertical: R.units.scale(5),
    marginRight: R.units.scale(15),
  },
});

export default Accordion;
