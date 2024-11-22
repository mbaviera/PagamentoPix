import { Text, View } from "react-native";
import styles from "../../style";

const InfoRow = ({ title, subtitle }) => (
  <View style={styles.infoRowContainer}>
    <Text style={styles.infoRowTitle}>{title}</Text>
    <Text style={styles.infoRowSubtitle}>{subtitle}</Text>
  </View>
);

export default InfoRow;