import React from "react";
import { ImageStyle, StyleProp, Image } from "react-native";
import * as Polyline from "@mapbox/polyline";
import { createSpectrum, hexStringToRGB } from "../utils/ColorUtils";

interface Props {
  polyline: string;
  size: number;
  style?: StyleProp<ImageStyle>;
}

export default function SegmentStaticMap({ polyline, size, style }: Props) {
  const coords = Polyline.decode(polyline);
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

  const path = makePathWithGradient();
  const url = `https://api.mapbox.com/styles/v1/mapbox/light-v9/static/${encodeURIComponent(
    path,
  )}/auto/${size}x${size}@2x?access_token=${mapboxToken}`;

  return (
    <Image
      style={[style, { height: size, width: size }]}
      source={{ uri: url }}
    />
  );
}
