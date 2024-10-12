import { Image } from "react-native";

export default function Home() {
  return (
    <Image
      source={require("../assets/images/react-logo.png")}
      style={{ alignSelf: "center" }}
    />
  );
}