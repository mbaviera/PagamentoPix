import { StyleSheet, Text, View } from "react-native";
import colors from "../../style/Colors";
import { moderateScale, verticalScale } from "../../utils/Metrics";

const InfoRow = ({ title, subtitle }) => (
  <View style={styles.checkRow}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </View>
);

export default InfoRow;

const styles = StyleSheet.create({
  checkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: colors.grey700,
    fontSize: moderateScale(14),
    fontFamily: "Montserrat-Regular",
    lineHeight: verticalScale(18),
    marginVertical: verticalScale(3)
  },
  subtitle: {
    color: colors.grey700,
    fontSize: moderateScale(14),
    fontFamily: "Montserrat-SemiBold",
    lineHeight: verticalScale(18),
    marginVertical: verticalScale(3)
  },
});
