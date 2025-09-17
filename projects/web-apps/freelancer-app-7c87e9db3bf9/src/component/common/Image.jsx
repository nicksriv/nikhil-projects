import React from "react";
import { StyleSheet, Animated } from "react-native";
import { R } from "../../res";

import View from "./View";
import Text from "./Text";
import Separator from "./Separator";

const Image = ({
    source,
    height = 100,
    width = 100,
    resizeMode = "contain",
    resizeMethod = "scale",
    FailedComponent = DefaultFailedComponent,
    LoaderComponent = DefaultLoaderComponent,
    backgroundColor = 'transparent',
    style = {},
    viewProps,
    ...props
}) => {
    const [loading, setLoading] = React.useState(false);
    const [loadingFailed, setLoadingFailed] = React.useState(false);

    const onLoadStart = () => {
        setLoading(true);
        setLoadingFailed(false);
        props.onLoadStart && props.onLoadStart();
    };
    const onLoadSuccess = () => {
        setLoading(false);
        setLoadingFailed(false);
        props.onLoadSuccess && props.onLoadSuccess();
    };
    const onLoadError = () => {
        setLoading(false);
        setLoadingFailed(true);
        props.onLoadError && props.onLoadError();
    };

    return (
        <View
            style={[
                styles.root,
                {
                    backgroundColor,
                    height: R.units.scale(height),
                    width: R.units.scale(width),
                },
                style.root ? style.root : {},
            ]}
            {...viewProps}
        >
            {loadingFailed ? (
                <FailedComponent height={height} width={width} style={style} />
            ) : (
                <Animated.Image
                    source={source}
                    resizeMode={resizeMode}
                    resizeMethod={resizeMethod}
                    onLoadStart={onLoadStart}
                    onLoad={onLoadSuccess}
                    onError={onLoadError}
                    style={[
                        styles.image,
                        {
                            height: R.units.scale(height),
                            width: R.units.scale(width),
                        },
                        style.image ? style.image : {},
                    ]}
                />
            )}

            {loading && (
                <Animated.View style={[styles.loaderRoot]}>
                    <LoaderComponent
                        height={height}
                        width={width}
                        style={style}
                    />
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        position: "relative",
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "auto",
    },
    loaderRoot: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: R.colors._helper.hexToRGB(R.colors.white, 0.8),
    },
    error: {},
});

const DefaultFailedComponent = ({ width, height, style = {} }) => {
    const imageWidth = width < 100 ? width / 2 : width / 4;
    const imageHeight = (height / width) * imageWidth;
    return (
        <>
            <Animated.Image
                resizeMethod="auto"
                resizeMode="contain"
                source={R.images.tab.userProfie()}
                style={[
                    styles.error,
                    {
                        height: R.units.scale(imageHeight),
                        width: R.units.scale(imageWidth),
                    },
                    style.error ? style.error : {},
                ]}
            />
            {width >= 100 && (
                <>
                    <Separator size={4} />
                    <Text>Not Found</Text>
                </>
            )}
        </>
    );
};

const DefaultLoaderComponent = ({ width, height, style = {} }) => {
    const imageWidth = width < 100 ? width / 2 : width / 4;
    const imageHeight = (height / width) * imageWidth;
    return (
        <Animated.Image
            resizeMethod="auto"
            resizeMode="contain"
            source={R.images.action.whatsapp()}
            style={[
                {
                    height: R.units.scale(imageHeight),
                    width: R.units.scale(imageWidth),
                },
                style.loader ? style.loader : {},
            ]}
        />
    );
};

export default React.memo(Image);
