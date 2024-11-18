import React from "react";
import { StyleSheet, Text as TextRN } from "react-native";
import colors from "../../constants/Colors/Colors";

export default function Text({
  titulo,
  color,
  size,
  fontFamily,
  lineHeight,
  fontWeight,
  backgroundColor
}) {
  return (
    <TextRN
      style={{
        color: color,
        fontSize: size,
        fontFamily: fontFamily,
        lineHeight: lineHeight,
        fontWeight: fontWeight,        
        backgroundColor: backgroundColor       
      }}
    >
      {titulo}
    </TextRN>
  );
}