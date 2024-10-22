import { Text, View, StyleSheet, Image, FlatList, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

import { useFocusEffect } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import AnimatedButton from "../components/AnimatedButton";
import { playSound } from "../components/soundUtils";
import { imageMapCard, imageMapCategory } from "../components/imageMaps";

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

const NewNoteSelect = [
  {
    id: 1,
    name: "New Note I",
  },
  {
    id: 2,
    name: "New Note II",
  },
  {
    id: 3,
    name: "New Note III",
  },
  {
    id: 4,
    name: "New Note IV",
  },
  {
    id: 5,
    name: "New Note V",
  },
  {
    id: 6,
    name: "New Note VI",
  },
  {
    id: 7,
    name: "New Note VII",
  },
  {
    id: 8,
    name: "New Note VIII",
  },
  {
    id: 9,
    name: "New Note IX",
  },
  {
    id: 10,
    name: "New Note X",
  },
  {
    id: 11,
    name: "New Note XI",
  },
  {
    id: 12,
    name: "New Note XII",
  },
  {
    id: 13,
    name: "New Note XIII",
  },
  {
    id: 14,
    name: "New Note XIV",
  },
  {
    id: 15,
    name: "New Note XV",
  },
  {
    id: 16,
    name: "New Note XVI",
  },
  {
    id: 17,
    name: "New Note XVII",
  },
  {
    id: 18,
    name: "New Note XVIII",
  },
  {
    id: 19,
    name: "New Note XIX",
  },
  {
    id: 20,
    name: "New Note XX",
  },
];

const getCategoryNameById = (categoryId) => {
  const category = Categories.find((cat) => cat.id === categoryId);
  return category ? category.name : "Unknown Category";
};

export { getCategoryNameById };

export default function Home() {
  const { name, personId } = useLocalSearchParams();
  const fadeopacity = useSharedValue(1);
  const [selectedCategory, setSelectedCategory] = useState(11);
  const [filteredCards, setFilteredCards] = useState([]);
  const [cards, setCards] = useState([]);
  const opacity = useSharedValue(0);

  const Item = ({
    id,
    name,
    categoryId,
    priority,
    favorite,
    originalIndex,
  }) => {
    return (
      <View style={homestyles.itemContainer}>
        <Text
          style={homestyles.textitle}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {name}
        </Text>
        <Image
          source={require("../assets/images/Home/FavNoteNotch.png")}
          style={homestyles.cardnotch}
        />
        <Text style={homestyles.textcat} ellipsizeMode="tail" numberOfLines={1}>
          {getCategoryNameById(categoryId)}
        </Text>
        <Image
          source={imageMapCategory[categoryId]}
          style={homestyles.notecat}
        />
        <AnimatedButton
          onPress={() =>
            handleCardPress(
              id,
              name,
              categoryId,
              priority,
              favorite,
              originalIndex
            )
          }
          source={imageMapCard[id]}
          pressStyle={homestyles.cardpressable}
          style={homestyles.card}
        />
        {favorite && (
          <Image
            source={require("../assets/images/Home/isFav.png")}
            style={homestyles.isfav}
          />
        )}
      </View>
    );
  };

  const Category = ({ id, name }) => (
    <View style={homestyles.catItemContainer}>
      <Text
        style={[
          homestyles.catTextitle,
          selectedCategory === id && homestyles.selectedCatTextitle,
        ]}
        ellipsizeMode="tail"
        numberOfLines={1}
      >
        {name}
      </Text>
      <Image
        source={require("../assets/images/Home/CategoryNotch.png")}
        style={[
          homestyles.catNotch,
          selectedCategory === id && homestyles.selectedCatNotch,
        ]}
      />
      <AnimatedButton
        onPress={() => handleCategoryPress(id)}
        source={imageMapCategory[id]}
        pressStyle={homestyles.catPressable}
        style={[
          homestyles.cat,
          selectedCategory === id && homestyles.selectedCat,
        ]}
      />
    </View>
  );

  const handleCardPress = async (
    id,
    name,
    categoryId,
    priority,
    favorite,
    originalIndex
  ) => {
    await playSound(require("../assets/images/SFX/Battle UI.wav"));
    router.push({
      pathname: "/note",
      params: {
        personId,
        categoryId,
        favorite,
        originalIndex,
      },
    });
  };

  const handleCategoryPress = async (id) => {
    console.log("Category Pressed: " + id);
    await playSound(require("../assets/images/SFX/Category Select.wav"));
    setSelectedCategory(id);

    if (id === 11) {
      setFilteredCards(cards);
    } else if (id === 10) {
      const favoriteNotes = cards.filter((card) => card.favorite === true);
      setFilteredCards(favoriteNotes);
    } else {
      const newFilteredCards = cards.filter((card) => card.categoryId === id);
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
    const fetchNotes = async () => {
      try {
        const response = await fetch(
          `https://backend-notes-moviles.onrender.com/getNotes/${personId}`
        );
        const notes = await response.json();
        const formattedCards = notes.map((note, index) => ({
          id: index + 1,
          originalIndex: note._id,
          name: note.title,
          categoryId: parseInt(note.category, 10),
          favorite: note.favorite,
          priority: note.priority,
        }));
        setCards(formattedCards);
        setFilteredCards(formattedCards);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [personId]);

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

    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              const response = await fetch(
                "https://backend-notes-moviles.onrender.com/deleteUser",
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    email_user: "padcitoallain@gmail.com",
                  }), // Ajusta el email según tu lógica
                }
              );

              if (response.ok) {
                console.log("Account deleted successfully");
              } else {
                console.log("Failed to delete account");
              }
            } catch (error) {
              console.error("Error connecting to the server:", error.message);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleNewNotePress = async () => {
    console.log("New Note Pressed");
    await playSound(require("../assets/images/SFX/Select.wav"));
    fadeopacity.value = withTiming(1, { duration: 500 }, () => {
      fadeopacity.value = 1;
    });
    setTimeout(() => {
      router.push({
      pathname: "/note",
      params: {
        personId,
        categoryId,
      },
    });;
  });
}
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
                priority={item.priority}
                favorite={item.favorite}
                originalIndex={item.originalIndex}
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

const homestyles = StyleSheet.create({
  isfav: {
    position: "relative",
    width: 45,
    height: 45,
    bottom: 60,
    left: -60,
    zIndex: 9,
  },
  welcome: {
    fontFamily: "P5-Font",
    fontSize: 22,
    color: "#000",
    textAlign: "center",
    zIndex: 7,
    width: 400,
    top: 55,
    left: -5,
  },
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
  selectedCat: {
    top: -30,
    left: -7,
    width: 78,
    height: 78,
  },
  selectedCatNotch: {
    top: -17,
    width: 100,
    height: 55,
  },
  selectedCatTextitle: {
    top: 22,
    fontSize: 16,
  },
  listContainer: {
    flex: 1,
    marginTop: -45,
    marginBottom: 0,
  },
  itemContainer: {
    flex: 1,
    marginTop: 18,
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
