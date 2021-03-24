import React, { useState } from "react";
import {
  View,
  StyleProp,
  Image,
  LayoutChangeEvent,
  ViewStyle,
} from "react-native";
import { staticMapUrl } from "../utils/StaticMap";

interface Props {
  polyline: string;
  style?: StyleProp<ViewStyle>;
}

interface Dimensions {
  height: number;
  width: number;
}

export default function SegmentStaticMap({ polyline, style }: Props) {
  const [dimensions, setDimensions] = useState<Dimensions | undefined>(
    undefined,
  );

  function onLayout(event: LayoutChangeEvent) {
    if (dimensions) return; // layout was already called

    const { width, height } = event.nativeEvent.layout;
    setDimensions({
      height,
      width,
    });
  }

  let url;

  if (dimensions) {
    url = staticMapUrl(polyline, {
      height: dimensions.width,
      width: dimensions.width,
      showPins: true,
    });
  }

  return (
    <View style={style} onLayout={onLayout}>
      {dimensions && (
        <Image
          style={{ height: dimensions.width, width: dimensions.width }}
          source={{ uri: url }}
        />
      )}
    </View>
  );
}
