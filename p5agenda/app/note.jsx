import { Image } from "react-native";

export default function Note() {
  return (
    <Image
      source={require("../assets/images/react-logo.png")}
      style={{ alignSelf: "center" }}
    />
  );
}