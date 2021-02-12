import React from "react";
import { View, ImageStyle, StyleProp, Image } from "react-native";
import * as Polyline from "@mapbox/polyline";
import {
  createSpectrum,
  hexStringToRGB,
  rgbToHexString,
} from "../utils/ColorUtils";

interface Props {
  polyline: string;
  size: number;
  style?: StyleProp<ImageStyle>;
}

function decodePolyline(polyline: string) {
  const coords = Polyline.decode(polyline);

  // easy sampling to reduce to 100
  if (coords.length > 100) {
    const x = Math.ceil(coords.length / 100);
    return coords.filter((_, idx) => idx % x === 0);
  }

  return coords;
}

export default function SegmentStaticMap({ polyline, size, style }: Props) {
  const imgSize = Math.floor(size);
  const coords = decodePolyline(polyline);

  const startColor = "#FF512F";
  const endColor = "#F09819";
  const strokeWidth = 4;
  const mapboxToken =
    "pk.eyJ1IjoiZWRhbmNlciIsImEiOiJjamxnMmxlanYxM2RqM3FyMGphemd2cG13In0.mk7zVCMINEcJnxaHhCLJlQ"; // add your Mapbox token here

  const colorA = hexStringToRGB(startColor);
  const colorB = hexStringToRGB(endColor);
  const spectrumColors = createSpectrum(colorA, colorB, coords.length - 1);

  function makePathWithGradient() {
    const pathStrings = [];

    for (let i = 0; i < coords.length - 1; i++) {
      const path = Polyline.encode([coords[i], coords[i + 1]]);
      pathStrings.push(`path-${strokeWidth}+${spectrumColors[i]}(${path})`); // format from https://docs.mapbox.com/api/maps/#path
    }

    return pathStrings.join(",");
  }

  const firstCoord = coords[0];
  const lastCoord = coords[coords.length - 1];
  const startMarker = `pin-s-a+${rgbToHexString(colorA)}(${firstCoord[1]},${
    firstCoord[0]
  })`;
  const endMarker = `pin-s-b+${rgbToHexString(colorB)}(${lastCoord[1]},${
    lastCoord[0]
  })`;

  const path = makePathWithGradient() + "," + startMarker + "," + endMarker;
  const url = `https://api.mapbox.com/styles/v1/mapbox/light-v9/static/${encodeURIComponent(
    path,
  )}/auto/${imgSize}x${imgSize}@2x?access_token=${mapboxToken}`;

  return (
    <View>
      <Image
        style={[style, { height: size, width: size }]}
        source={{ uri: url }}
      />
    </View>
  );
}
