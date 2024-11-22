import { moderateScale, verticalScale } from "../utils/Metrics";
import colors from "./Colors";

const texts = {
  textActionButton: {
    textAlign: "center",
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  cardTitle: {
    color: colors.main700,
    fontSize: moderateScale(16),
    fontFamily: "Montserrat-SemiBold",
    lineHeight: verticalScale(20),
    backgroundColor: colors.white,
  },
  cardSubtitle: {
    color: colors.grey700,
    fontSize: moderateScale(12),
    fontFamily: "Montserrat-Regular",
    lineHeight: verticalScale(20),
    backgroundColor: colors.white,
    marginTop: verticalScale(6),
  },
  footerTitle: {
    marginBottom: verticalScale(2),
    fontFamily: "Montserrat-Regular",
    fontSize: moderateScale(14),
  },
  footerSubtitle: {
    marginTop: verticalScale(2),
    fontFamily: "Montserrat-Bold",
    fontSize: moderateScale(18),
  },
  headerTitle: {
    color: colors.grey800,
    fontSize: moderateScale(24),
    fontFamily: "Montserrat-Bold",
    lineHeight: verticalScale(24),
    backgroundColor: colors.grey100,
  },
  loadingText: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center",
  },
  modalTitle: {
    fontSize: moderateScale(24),
  },
  modalSubtitle: {
    fontSize: moderateScale(16),
  },
  infoRowTitle: {
    color: colors.grey700,
    fontSize: moderateScale(14),
    fontFamily: "Montserrat-Regular",
    lineHeight: verticalScale(18),
    marginVertical: verticalScale(3)
  },
  infoRowSubtitle: {
    color: colors.grey700,
    fontSize: moderateScale(14),
    fontFamily: "Montserrat-SemiBold",
    lineHeight: verticalScale(18),
    marginVertical: verticalScale(3)
  },
  resultRowTitle: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
    color: colors.grey700,
    marginBottom: verticalScale(2),
    textAlign: "center",
  },  
  resultRowSubtitle: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
    color: colors.grey800,
    marginTop: verticalScale(2),
  },
  //payment screen
  paymentSubtitle: {
    color: colors.black,
    fontSize: moderateScale(16),
    fontFamily: "Montserrat-SemiBold",
    lineHeight: verticalScale(20),
    backgroundColor: colors.grey100,
  },
  accountTitle: {
    color: colors.lightBlack,
    fontSize: moderateScale(16),
    fontFamily: "Montserrat-SemiBold",
    lineHeight: verticalScale(20),
    backgroundColor: colors.grey100,
    paddingVertical: verticalScale(12),
  },
  creditCardsTitle: {
    color: colors.lightBlack,
    fontSize: moderateScale(16),
    fontFamily: "Montserrat-SemiBold",
    lineHeight: verticalScale(20),
    backgroundColor: colors.grey100,
    paddingVertical: verticalScale(12),
    textAlign: "center",
  },
  chooseInsallmentsTitle: {
    color: colors.main700,
    fontSize: moderateScale(16),
    fontFamily: "Montserrat-SemiBold",
    lineHeight: verticalScale(20),
  },
  errorMessage: {
    color: colors.main700,
    fontSize: moderateScale(16),
    fontFamily: "Montserrat-SemiBold",
    textAlign: "center",
  },
  //success screen
  successScreenTitle: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    color: colors.grey700,
    marginTop: verticalScale(40),
    marginBottom: verticalScale(20),
    textAlign: "center",
  },
};

export default texts;
