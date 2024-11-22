import { Text, View } from "react-native";
import styles from "../../style";

const ResultRow = ({ title, subtitle }) => (
  <View style={styles.resultRowContainer}>
    <Text style={styles.resultRowTitle}>{title}</Text>
    <Text style={styles.resultRowSubtitle}>{subtitle}</Text>
  </View>
);

export default ResultRow;