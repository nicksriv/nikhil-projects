import React from "react";
import { R } from "../../res";

import View from "../common/View";
import Text from "../common/Text";
import Button from "../form/Button";
import Separator from "../common/Separator";

const SeparatorWidget = ({ globalStyles }) => {
    const cards = [8, 12, 16, 20];
    return (
        <>
            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: size
                </Text>
                <Text size="10" font="medium">
                    Values: string | number (default=8)
                </Text>
                <Text size="10">
                    Description: is used to define the size of separator
                </Text>
                <Separator />
                <View style={{ width: "100%" }}>
                    {cards.map((c, i) => (
                        <React.Fragment key={`h_${c}`}>
                            <View
                                style={[
                                    globalStyles.card,
                                    {
                                        backgroundColor:
                                            R.colors.primary.lightest,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    },
                                ]}
                            >
                                <Text size="10">size={c}</Text>
                            </View>
                            {cards.length - 1 !== i && <Separator size={c} />}
                        </React.Fragment>
                    ))}
                </View>
                <Separator />

                <View style={{ flexDirection: "row" }}>
                    {cards.map((c, i) => (
                        <React.Fragment key={`v_${c}`}>
                            <View
                                style={[
                                    globalStyles.card,
                                    {
                                        backgroundColor:
                                            R.colors.primary.lightest,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    },
                                ]}
                            >
                                <Text size="10">size={c}</Text>
                            </View>
                            {cards.length - 1 !== i && (
                                <Separator size={c} vertical={true} />
                            )}
                        </React.Fragment>
                    ))}
                </View>
            </View>
            <Separator />

            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: color
                </Text>
                <Text size="10" font="medium">
                    Values: colorcode (default=transparent)
                </Text>
                <Text size="10">
                    Description: is used to define background color for
                    separator
                </Text>
                <Separator />
                <View style={{ width: "100%" }}>
                    {[9, 14].map((c, i) => (
                        <React.Fragment key={`hc_${c}`}>
                            <View
                                style={[
                                    globalStyles.card,
                                    {
                                        backgroundColor:
                                            R.colors.primary.lightest,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    },
                                ]}
                            >
                                <Text size="10">color=&#123;R.colors.black&#125;</Text>
                            </View>
                            {[9, 14].length - 1 !== i && (
                                <Separator
                                    size={c}
                                    color={R.colors.black}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </View>
                <Separator />

                <View style={{ flexDirection: "row" }}>
                    {[9, 14].map((c, i) => (
                        <React.Fragment key={`vc_${c}`}>
                            <View
                                style={[
                                    globalStyles.card,
                                    {
                                        backgroundColor:
                                        R.colors.primary.lightest,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    },
                                ]}
                            >
                                <Text size="10">color=&#123;R.colors.black&#125;</Text>
                            </View>
                            {[9, 14].length - 1 !== i && (
                                <Separator
                                    size={c}
                                    vertical={true}
                                    color={R.colors.black}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </View>
            </View>
            <Separator />

            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: vertical
                </Text>
                <Text size="10" font="medium">
                    Values: false (default) | true
                </Text>
                <Text size="10">
                    Description: is used to define orientation of separator based on flex direction of parent wrapper
                </Text>
                <Separator />
                <View style={{ width: "100%" }}>
                    {[9, 14].map((c, i) => (
                        <React.Fragment key={`hc_${c}`}>
                            <View
                                style={[
                                    globalStyles.card,
                                    {
                                        backgroundColor:
                                            R.colors.primary.lightest,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    },
                                ]}
                            >
                                <Text size="10">vertical=false</Text>
                            </View>
                            {[9, 14].length - 1 !== i && (
                                <Separator
                                    size={c}
                                    color={R.colors.background.disabled}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </View>
                <Separator />

                <View style={{ flexDirection: "row" }}>
                    {[9, 14].map((c, i) => (
                        <React.Fragment key={`vc_${c}`}>
                            <View
                                style={[
                                    globalStyles.card,
                                    {
                                        backgroundColor:
                                        R.colors.primary.lightest,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    },
                                ]}
                            >
                                <Text size="10">vertical=true</Text>
                            </View>
                            {[9, 14].length - 1 !== i && (
                                <Separator
                                    size={c}
                                    vertical={true}
                                    color={R.colors.background.disabled}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </View>
            </View>
            <Separator />
        </>
    );
};

export default SeparatorWidget;
