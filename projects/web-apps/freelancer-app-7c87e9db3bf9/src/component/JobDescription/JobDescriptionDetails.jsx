import React from "react";
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';


import Text from "@app/component/common/Text";
import View from "@app/component/common/View";
import Separator from "@app/component/common/Separator";
import Chip from "@app/component/common/Chip";
import VectorIcon from "@app/component/common/VectorIcon";

import { R } from "@app/res";

const prepareAddress = ({ location, area, city, state, country, pinCode } = {}) => {
  let address = "";

  if (location) {
    address += `${location}, `;
  }

  if (area) {
    address += `${area}, `;
  }

  if (city) {
    address += `${city}, `;
  }

  if (state) {
    address += `${state}, `;
  }

  if (country) {
    address += `${country}, `;
  }

  if (pinCode) {
    address += `${pinCode}`;
  }

  return address;
}

const JobDescriptionDetails = (props) => {
  const {
    jobDetails: {
      jobDescription,
      highlights = [],
      jobTitle,
      skills = [],
      address = {},
    }
  } = props;
  
  const jobLocation = prepareAddress({ ...address });
  const source = {
    html:jobDescription.replace("<p>", "<p style='color:black;font-size:14px;'>")
  };  const { width } = useWindowDimensions();



  return (
    <>
      <View>
        <Text variant="subtitle2" font="semibold">
          {jobTitle}
        </Text>
        <RenderHtml  contentWidth={width} source={source} />
      </View>

      {highlights.length ? (
        <View>
          <Separator />
          <Text font="semibold">Highlights:</Text>
          <Separator size={4} />
          <View flexDirection="row" flexWrap="wrap">
            {highlights.map((h, index) => {
              return (
                <View
                  key={`highlights_${index}`}
                  flexDirection="row"
                  alignItems="center">
                  <VectorIcon
                    name="arrow-forward-circle-outline"
                    color={R.colors.primary.main}
                    size={16}
                  />
                  <Separator vertical size={4} />
                  <Text>{h}</Text>
                  <Separator vertical />
                </View>
              );
            })}
          </View>
        </View>
      ) : null}

      {skills.length ? (
        <View>
          <Separator />
          <Text font="semibold">Skills:</Text>
          <View flexDirection="row" flexWrap="wrap">
            {skills.map(s => (
              <View
                key={`skills_${s.id}`}
                paddingVertical={R.units.scale(2)}
                flexDirection="row"
                alignItems="center">
                <Chip
                  iconName="checkmark-circle-outline"
                  variant="contained"
                  label={s.name}
                  customViewStyle={{backgroundColor: R.colors.primary.lightest}}
                  customLabelStyle={{
                    fontSize: R.units.scale(10),
                    color: R.colors.text.main,
                  }}
                />
              </View>
            ))}
          </View>
        </View>
      ) : null}

      {jobLocation && (
        <View>
          <Separator />
          <Text font="semibold">Job Location:</Text>
          <Text>{jobLocation}</Text>
        </View>
      )}
    </>
  );
};

export default JobDescriptionDetails;
