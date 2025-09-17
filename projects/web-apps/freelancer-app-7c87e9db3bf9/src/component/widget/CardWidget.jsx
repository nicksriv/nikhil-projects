import React from "react";
import { StyleSheet, ScrollView, Image } from "react-native";
import { R } from "../../res";

import View from "../common/View";
import Text from "../common/Text";
import Separator from "../common/Separator";

const chipData = ['Leave and License','Furnished']

const CardWidget = ({ globalStyles, cardType, name, price, address, requirementsMatched, propertyCount }) => {
  
  if(cardType === "propertyCard"){
    return(
      <>
        <View style={{...globalStyles.card, width: "50%"}}>
          <Image
            source={R.images.card.propertiesListed()}
            resizeMode="contain"
            style={{ height: 48, width: 48 }}
          />
          <Text size={30}>{propertyCount ? propertyCount : 23}</Text>
          <Text color="#7C8D9A">{name ? name : "Properties Listed"}</Text>
        </View>
      </>
    )
  }

  return (
    <View style={globalStyles.card}>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        <Image resizeMode="cover" source={{uri: "https://source.unsplash.com/random/300×300"}} style={{width: 100, height: 100}} />
        <Image resizeMode="cover" source={{uri: "https://source.unsplash.com/random/300×300"}} style={{width: 100, height: 100}} />
        <Image resizeMode="cover" source={{uri: "https://source.unsplash.com/random/300×300"}} style={{width: 100, height: 100}} />
      </ScrollView>
      <View style={{ paddingVertical: 10 }}>
        <Text size={10} color="#00589D" transform="uppercase">{name ? name : "MITTAL COMMERCIA"}</Text>
        <View style={{paddingVertical: 8}}>
          <Text font="semiBold">{price ? price : "₹ 70,000 | 1120 sq. ft."}</Text>
          <Text font="bold">{address ? address : "Commercial - Office space in Marol"}</Text>
        </View>
        <View style={{width: "100%", flexDirection: "row"}}>
          {
            chipData.map((item,index) => (
              <React.Fragment key={index}>
                <View style={{ backgroundColor: "#EBEFF2", borderRadius: 20, padding: 10, marginRight: 5 }}>
                  <Text size={10} color="#00335B">{item}</Text>
                </View>
              </React.Fragment>
            ))
          }
        </View>
      </View>
      <Separator size={0.2} color="grey" />
      <View style={{paddingVertical: R.units.scale(10), flexDirection: "row", justifyContent: "space-between", width: "100%" , alignItems: "center"}}>
        <View style={{ backgroundColor: "#F5FBF4", borderRadius: 20, padding: 10, marginRight: 15 }}>
          <Text size={11} color="#35B425">{requirementsMatched ? requirementsMatched : "3 requirements matched"}</Text>
        </View>
          <Separator size={0.2} vertical color="grey" />
          <View pressable style={{paddingHorizontal: 10, justifyContent: "center", alignItems: "center"}}>
            <Image
              resizeMode="contain"
              style={{ height: 24, width: 24 }}
              source={R.images.action.share()}
            />
            <Text color="#7C8D9A">Share</Text>
          </View>
          <Separator size={0.2} vertical color="grey" />
          <View pressable style={{paddingHorizontal: 10, justifyContent: "center", alignItems: "center"}}>
            <Image
              resizeMode="contain"
              style={{ height: 24, width: 24 }}
              source={R.images.action.whatsapp()}
            />
            <Text color="#7C8D9A">Whatsapp</Text>
          </View>
      </View>
      <Separator size={0.2} color="grey" />
    </View>
  )
}

export default CardWidget