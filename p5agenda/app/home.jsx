import { Text, View, StyleSheet, Image, FlatList, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import AnimatedButton from "../components/AnimatedButton";
import { playSound } from "../components/soundUtils";
import { imageMapCard, imageMapCategory } from "../components/imageMaps";

const Cards = [
  {
    id: 1,
    name: "Hoy no se duerme",
    categoryId: 0,
  },
  {
    id: 2,
    name: "Hoy se celebra",
    categoryId: 2,
  },
  {
    id: 3,
    name: "Hoy se come",
    categoryId: 4,
  },
  {
    id: 4,
    name: "Voy por ti papadio",
    categoryId: 6,
  },
  {
    id: 5,
    name: "The Boy",
    categoryId: 8,
  },
];

const Categories = [
  {
    id: 10,
    name: "FAVS",
  },
  {
    id: 11,
    name: "ALL",
  },
  {
    id: 0,
    name: "NOTES",
  },
  {
    id: 1,
    name: "JOKER",
  },
  {
    id: 2,
    name: "SKULL",
  },
  {
    id: 3,
    name: "MONA",
  },
  {
    id: 4,
    name: "PANTHER",
  },
  {
    id: 5,
    name: "FOX",
  },
  {
    id: 6,
    name: "QUEEN",
  },
  {
    id: 7,
    name: "ORACLE",
  },
  {
    id: 8,
    name: "NOIR",
  },
  {
    id: 9,
    name: "CROW",
  },
];

const getCategoryNameById = (categoryId) => {
  const category = Categories.find((cat) => cat.id === categoryId);
  return category ? category.name : "Unknown Category";
};

export default function Home() {
  const { name, personId } = useLocalSearchParams(); // Cambia a useLocalSearchParams
  const fadeopacity = useSharedValue(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredCards, setFilteredCards] = useState(Cards);
  const opacity = useSharedValue(0);

  const Item = ({ id, name, categoryId }) => (
    <View style={homestyles.itemContainer}>
      <Text style={homestyles.textitle} ellipsizeMode="tail" numberOfLines={1}>
        {name}
      </Text>
      <Image
        source={require("../assets/images/Home/FavNoteNotch.png")}
        style={homestyles.cardnotch}
      />
      <Text style={homestyles.textcat} ellipsizeMode="tail" numberOfLines={1}>
        {getCategoryNameById(categoryId)}
      </Text>
      <Image source={imageMapCategory[categoryId]} style={homestyles.notecat} />
      <AnimatedButton
        onPress={() => handleCardPress(id)}
        source={imageMapCard[id]}
        pressStyle={homestyles.cardpressable}
        style={homestyles.card}
      />
    </View>
  );

  const Category = ({ id, name }) => (
    <View style={homestyles.catItemContainer}>
      <Text
        style={homestyles.catTextitle}
        ellipsizeMode="tail"
        numberOfLines={1}
      >
        {name}
      </Text>
      <Image
        source={require("../assets/images/Home/CategoryNotch.png")}
        style={homestyles.catNotch}
      />
      <AnimatedButton
        onPress={() => handleCategoryPress(id)}
        source={imageMapCategory[id]}
        pressStyle={homestyles.catPressable}
        style={homestyles.cat}
      />
    </View>
  );

  const handleCardPress = async (id) => {
    console.log("Card Pressed: " + id);
    await playSound(require("../assets/images/SFX/Battle UI.wav"));
    router.push("/note");
  };

  const handleCategoryPress = async (id) => {
    console.log("Category Pressed: " + id);
    await playSound(require("../assets/images/SFX/Category Select.wav"));
    setSelectedCategory(id);

    if (id === 11) {
      setFilteredCards(Cards);
    } else {
      const newFilteredCards = Cards.filter((card) => card.categoryId === id);
      setFilteredCards(newFilteredCards);
    }
    animateCards();
  };

  const animateCards = () => {
    opacity.value = 0;
    opacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
  };

  useEffect(() => {
    animateCards();
  }, [filteredCards]);

  useEffect(() => {
    console.log(`Welcome ${name}, your personId is ${personId}`);

    const fetchNotes = async () => {
      const url = `https://backend-notes-moviles.onrender.com/getNotes/${personId}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("Notes:", data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();

    setTimeout(() => {
      fadeopacity.value = withTiming(0, { duration: 500 });
    }, 500);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        fadeopacity.value = withTiming(0, { duration: 500 }, () => {
          fadeopacity.value = 0;
        });
      }, 500);
    }, [])
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const FadeOpacity = useAnimatedStyle(() => {
    return {
      opacity: fadeopacity.value,
    };
  });

  const handleLogoutPress = async () => {
    console.log("Logout Pressed");
    await playSound(require("../assets/images/SFX/Back.wav"));
    fadeopacity.value = withTiming(1, { duration: 500 }, () => {
      fadeopacity.value = 1;
    });
    setTimeout(() => {
      router.navigate("/");
    }, 500);
  };

  const handleEraseAccountPress = async () => {
    console.log("Erase Account Button Pressed");
    await playSound(require("../assets/images/SFX/Delete.wav"));
  };

  const handleNewNotePress = async () => {
    console.log("New Note Pressed");
    await playSound(require("../assets/images/SFX/Select.wav"));
    fadeopacity.value = withTiming(1, { duration: 500 }, () => {
      fadeopacity.value = 1;
    });
    setTimeout(() => {
      router.push("/note");
    }, 500);
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Animated.View
        style={[homestyles.blackfade, FadeOpacity]}
        pointerEvents={"none"}
      />
      <Image
        source={require("../assets/images/DarkStarsBGHD.png")}
        style={homestyles.bg}
      />
      <Image
        source={require("../assets/images/Home/Header.png")}
        style={homestyles.header}
      />
      <Image
        source={require("../assets/images/Home/CategoriesHD.png")}
        style={homestyles.categoriesstrip}
      />
      <AnimatedButton
        onPress={handleLogoutPress}
        source={require("../assets/images/Home/LogOut.png")}
        pressStyle={homestyles.logoutpressable}
        style={homestyles.logout}
      />
      <AnimatedButton
        onPress={handleEraseAccountPress}
        source={require("../assets/images/Home/EraseAccount.png")}
        pressStyle={homestyles.delprofilepressable}
        style={homestyles.delprofile}
      />
      {selectedCategory !== 10 && selectedCategory !== 11 && (
        <AnimatedButton
          onPress={handleNewNotePress}
          source={require("../assets/images/Home/NewNote.png")}
          pressStyle={homestyles.newnotepressable}
          style={homestyles.newnote}
        />
      )}
      <View style={homestyles.catListContainer}>
        <FlatList
          data={Categories}
          renderItem={({ item }) => <Category id={item.id} name={item.name} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={homestyles.listContainer}>
        <Animated.View style={animatedStyle}>
          <FlatList
            data={filteredCards}
            renderItem={({ item }) => (
              <Item
                id={item.id}
                name={item.name}
                categoryId={item.categoryId}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={homestyles.row}
          />
        </Animated.View>
      </View>
    </View>
  );
}

homestyles = StyleSheet.create({
  notecat: {
    width: 19,
    height: 19,
    transform: [{ rotate: "-15deg" }],
    top: -63,
    left: -51,
    zIndex: 4,
  },
  textcat: {
    fontFamily: "P5-Font",
    fontSize: 7.5,
    color: "#000",
    textAlign: "center",
    transform: [{ rotate: "-9deg" }],
    zIndex: 6,
    width: 80,
    top: -50.3,
    left: -22.3,
  },
  catListContainer: {
    height: 200,
    marginTop: 112,
    marginLeft: -2,
    zIndex: 8,
    transform: [{ rotate: "4deg" }],
  },
  catItemContainer: {
    margin: 3,
    alignItems: "center",
  },
  catTextitle: {
    fontFamily: "P5-Font",
    fontSize: 13,
    color: "#000",
    textAlign: "center",
    transform: [{ rotate: "-10deg" }],
    zIndex: 6,
    width: 80,
    top: 41.5,
    left: -3.5,
  },
  catNotch: {
    width: 85,
    height: 45,
    top: 9,
    left: -6,
    zIndex: 5,
  },
  catPressable: {
    width: 70,
    height: 70,
  },
  cat: {
    width: 60,
    height: 60,
    zIndex: 4,
  },
  listContainer: {
    flex: 1,
    marginTop: -35,
  },
  itemContainer: {
    flex: 1,
    margin: 10,
    alignItems: "center",
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  textitle: {
    fontFamily: "P5-Font",
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    transform: [{ rotate: "-8deg" }],
    zIndex: 0,
    width: 125,
    top: 46,
    left: 2,
  },
  cardnotch: {
    width: 170,
    height: 68,
    top: 2,
    zIndex: -1,
  },
  cardpressable: {
    width: 126,
    height: 240,
  },
  card: {
    width: 126,
    height: 240,
    zIndex: 1,
    top: -29,
  },
  newnotepressable: {
    position: "absolute",
    left: 0,
    bottom: 0,
    zIndex: 3,
  },
  newnote: {
    position: "absolute",
    width: 125,
    height: 55,
    left: 18,
    bottom: 18,
    zIndex: 3,
  },
  delprofilepressable: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 3,
  },
  delprofile: {
    position: "absolute",
    width: 80,
    height: 85,
    right: 14,
    top: 45,
    zIndex: 3,
  },
  delcatpressable: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 3,
  },
  delcat: {
    position: "absolute",
    width: 80,
    height: 78,
    right: 158,
    top: 50,
    zIndex: 3,
    opacity: 0.5,
  },
  logoutpressable: {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 3,
  },
  logout: {
    position: "absolute",
    width: 80,
    height: 80,
    left: 15,
    top: 50,
    zIndex: 3,
  },
  categoriesstrip: {
    position: "absolute",
    width: 400,
    height: 125,
    left: 0,
    top: 140,
    zIndex: 2,
  },
  header: {
    position: "absolute",
    width: 400,
    height: 400,
    left: 0,
    top: -12,
    zIndex: 1,
  },
  bg: {
    position: "absolute",
    width: 400,
    height: 830,
    left: 0,
    top: 60,
    zIndex: -2,
  },
  blackfade: {
    position: "absolute",
    width: 450,
    height: 900,
    left: 0,
    top: 0,
    zIndex: 9,
    opacity: 0,
    backgroundColor: "black",
  },
});
