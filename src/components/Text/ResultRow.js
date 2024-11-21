import { StyleSheet, Text, View } from "react-native";
import colors from "../../style/Colors";
import { moderateScale, verticalScale } from "../../utils/Metrics";

const ResultRow = ({ title, subtitle }) => (
  <View style={styles.column}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </View>
);

export default ResultRow;

const styles = StyleSheet.create({
  title: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
    color: colors.grey700,
    marginBottom: verticalScale(2),
    textAlign: "center",
  },
  column: {
    alignItems: "center",
    flex: 1,
  },
  subtitle: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
    color: colors.grey800,
    marginTop: verticalScale(2),
  },
});
