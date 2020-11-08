import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navigateON: {
    flexDirection: "row",
  },
  nav: {
    width: 8,
    marginLeft: 5,
    height: 4,
    borderRadius: 20,
    backgroundColor: "#BECFD8",
  },
  active: {
    backgroundColor: "#FFD152",
    width: 16,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D1EDF2",
  },
});
