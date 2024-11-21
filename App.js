import React, { useEffect } from "react";
import Navigation from "./src/navigation/Navigation";
import BootSplash from "react-native-bootsplash";
import { StatusBar } from "react-native";
import colors from "./src/constants/Colors";

export default function App() {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  }, []);

  return (
    <>
      <StatusBar backgroundColor={colors.main700} barStyle="default"/>
      <Navigation />
    </>
  );
}
