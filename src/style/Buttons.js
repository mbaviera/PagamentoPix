import { horizontalScale, verticalScale, moderateScale } from "../utils/Metrics";
import colors from "./Colors";

const buttons = {
  actionButton: {
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(7),
    paddingBottom: verticalScale(8),
    borderRadius: moderateScale(100),
    backgroundColor: colors.primary, // Exemplo: cor do botão de pagamento
  },
  buttonContainer: {
    width: horizontalScale(32),
    height: verticalScale(32),
    borderRadius: moderateScale(145),
    backgroundColor: colors.main100,
    alignItems: "center",
    justifyContent: "center",
  },
  unselectedButton: {
    width: 24,
    height: 24,
    backgroundColor: colors.white,
    margin: 5,
    borderRadius: 50,
  },
  selectedButton: {
    width: 24,
    height: 24,
    backgroundColor: colors.main700,
    margin: 5,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.white,
  },
  loadingIcon: {
    marginBottom: verticalScale(16),
  },
};

export default buttons;