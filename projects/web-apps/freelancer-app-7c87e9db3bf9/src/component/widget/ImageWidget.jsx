import React from "react";
import { R } from "../../res";

import Image from "../common/Image";
import View from "../common/View";
import Text from "../common/Text";
import Separator from "../common/Separator";

const ImageWidget = ({ globalStyles }) => {
    return (
        <>
            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: source (required)
                </Text>
                <Text size="10" font="medium">
                    Values: ImageSource prop of react-native image
                </Text>
                <Text size="10">
                    Description: is used to provide source to image component
                </Text>
                <Separator />
                <Image source={R.images.action.whatsapp()} />
                <Separator />

                <Image
                    source={{
                        uri: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg",
                    }}
                />
            </View>
            <Separator />

            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: resizeMode
                </Text>
                <Text size="10" font="medium">
                    Values: contain (default) | cover | stretch | repeat |
                    center
                </Text>
                <Text size="10">
                    Description: is used to provide source to image component
                </Text>
                <Separator />

                <Text size="10">resizeMode = contain</Text>
                <Image
                    source={{
                        uri: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg",
                    }}
                />
                <Separator />

                <Text size="10">resizeMode = cover</Text>
                <Image
                    resizeMode="cover"
                    source={{
                        uri: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg",
                    }}
                />
                <Separator />

                <Text size="10">resizeMode = stretch</Text>
                <Image
                    resizeMode="stretch"
                    source={{
                        uri: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg",
                    }}
                />
                <Separator />

                <Text size="10">resizeMode = repeat</Text>
                <Image
                    resizeMode="repeat"
                    source={{
                        uri: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg",
                    }}
                />
                <Separator />

                <Text size="10">resizeMode = center</Text>
                <Image
                    resizeMode="center"
                    source={{
                        uri: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg",
                    }}
                />
                <Separator />
            </View>
            <Separator />

            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: height/width
                </Text>
                <Text size="10" font="medium">
                    Values: numeric value (default = 100/100)
                </Text>
                <Text size="10">
                    Description: is used to set height and width for image
                </Text>
                <Separator />

                <Text size="10">height = 64 width = 64</Text>
                <Image
                    height={64}
                    width={64}
                    source={R.images.action.whatsapp()}
                />
                <Separator />

                <Text size="10">height = 160 width = 280</Text>
                <Image
                    height={160}
                    width={280}
                    source={{
                        uri: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg",
                    }}
                />
            </View>
            <Separator />

            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: backgroundColor
                </Text>
                <Text size="10" font="medium">
                    Values: color code (default = R.colors.background.disabled)
                </Text>
                <Text size="10">
                    Description: is used set background color for image
                </Text>
                <Separator />

                <Text size="10">
                    backgroundColor = R.colors.background.disabled (default)
                </Text>
                <Image source={R.images.tab.homeActive()} />
                <Separator />

                <Text size="10">backgroundColor = R.colors.success.main</Text>
                <Image
                    backgroundColor={R.colors.success.main}
                    source={R.images.tab.homeActive()}
                />
                <Separator />

                <Text size="10">backgroundColor = transparent</Text>
                <Image
                    backgroundColor="transparent"
                    source={R.images.tab.homeActive()}
                />
                <Separator />
            </View>
            <Separator />

            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: viewProps
                </Text>
                <Text size="10" font="medium">
                    Values: (default = default props of View component)
                </Text>
                <Text size="10">
                    Description: used to provide props for wrapper View
                    component
                </Text>
                <Separator />

                <Text size="10">
                    viewProps=&#123; pressable: true, onPress: () =&gt;
                    alert("onPress") &#125;
                </Text>
                <Image
                    viewProps={{
                        pressable: true,
                        onPress: () => alert("onPress"),
                    }}
                    source={R.images.tab.homeActive()}
                />
                <Separator />

                <Text size="10">viewProps=&#123; disabled: true &#125;</Text>
                <Image
                    viewProps={{
                        disabled: true,
                    }}
                    source={R.images.tab.homeActive()}
                />
                <Separator />
            </View>
            <Separator />
        </>
    );
};

export default React.memo(ImageWidget);
