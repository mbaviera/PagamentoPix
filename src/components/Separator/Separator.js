import { StyleSheet, View } from "react-native";
import { verticalScale } from "../../utils/Metrics";
import colors from "../../style/Colors";

const Separator = () => <View style={styles.separator} />;

export default Separator;

const styles = StyleSheet.create({
  separator: {
    height: verticalScale(0.5),
    borderTopWidth: verticalScale(0.5),
    width: "100%",
    alignSelf: "center",
    marginTop: verticalScale(6),
    marginBottom: verticalScale(4),
    borderColor: colors.grey700,
  },
});
