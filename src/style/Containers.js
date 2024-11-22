import { Platform } from "react-native";
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from "../utils/Metrics";
import colors from "./Colors";

const containers = {
  scrollView: {
    flexGrow: 1,
    paddingBottom: verticalScale(5),
  },
  cardContainer: {
    flexDirection: "row",
    paddingVertical: verticalScale(12),
    paddingLeft: horizontalScale(16),
    paddingRight: horizontalScale(8),
    backgroundColor: colors.white,
    borderRadius: moderateScale(6),
    elevation: moderateScale(6),
    marginTop: verticalScale(8),
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: colors.grey700,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: moderateScale(2),
      },
    }),
  },
  textContainer: {
    flexDirection: "column",
    marginLeft: horizontalScale(10),
  },
  rowContainer: {
    flexDirection: "row",
  },
  containerButton: {
    borderColor: colors.main700,
    borderRadius: moderateScale(50),
    borderWidth: 2,
    width: horizontalScale(28),
    height: verticalScale(28),
    justifyContent: "center",
    alignItems: "center",
  },
  footerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
    elevation: moderateScale(20),
    ...Platform.select({
      ios: {
        shadowColor: colors.grey700,
        shadowOffset: { width: horizontalScale(1), height: verticalScale(1) },
        shadowOpacity: 0.5,
        shadowRadius: moderateScale(1),
      },
    }),
  },
  headerContainer: {
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(16),
    backgroundColor: colors.grey100,
  },
  headerContentArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: verticalScale(32),
    marginBottom: verticalScale(24),
    backgroundColor: colors.grey100,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.greenSea200,
    justifyContent: "center",
    alignItems: "center",
  },
  safeModalContainer: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: verticalScale(80),
    elevation: moderateScale(5),
    borderTopLeftRadius: horizontalScale(12),
    borderTopRightRadius: horizontalScale(12),
  },
  headerModalContainer: {
    flexDirection: "row",
    paddingHorizontal: horizontalScale(16),
    justifyContent: "space-between",
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(16),
    marginTop: verticalScale(25),
  },
  subtitleModalContainer: {
    flexDirection: "row",
    paddingHorizontal: horizontalScale(16),
    justifyContent: "space-between",
    paddingBottom: verticalScale(16),
  },
  separatorContainer: {
    height: verticalScale(0.5),
    borderTopWidth: verticalScale(0.5),
    width: "100%",
    alignSelf: "center",
    marginTop: verticalScale(6),
    marginBottom: verticalScale(4),
    borderColor: colors.grey700,
  },
  infoRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  resultRowContainer: {
    flex: 1,
    alignItems: "center",    
  },

  //payment screen
  paymentContainer: {
    flex: 1,
    backgroundColor: colors.grey100,
  },
  paymentTextContainer: {
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(16),
    backgroundColor: colors.grey100,
  },
  paymentInstallmentsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(12),
    backgroundColor: colors.white,
    marginVertical: verticalScale(16),
    borderRadius: moderateScale(8),
  },
  paymentCheckContainer: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(12),
    backgroundColor: colors.white,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
  },
  //success screen
  successContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: horizontalScale(16),
    paddingTop: Platform.OS === 'ios' ? verticalScale(50) : verticalScale(10),
    alignItems: "center",
  },
  closeButtonContainer: {
    alignSelf: "flex-end",
    top: verticalScale(20),
    right: horizontalScale(16),
  },
  successIconContainer: {
    width: horizontalScale(100),
    height: verticalScale(100),
    borderRadius: moderateScale(50),
    backgroundColor: colors.main100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(20),
  },
  successInfoContainer: {
    width: "100%",
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(8),
    backgroundColor: colors.grey100,
    elevation: moderateScale(2),
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: colors.grey700,
        shadowOffset: { width: horizontalScale(0), height: verticalScale(2) },
        shadowOpacity: 0.5,
        shadowRadius: moderateScale(2),
      },
    }),
  },
  successRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBlock: 8,
  },
};

export default containers;
