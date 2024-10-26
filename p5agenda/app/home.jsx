import { Text, View, Image, FlatList, Alert } from "react-native";
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
import {
  imageMapCard,
  imageMapCategory,
  imageMapPriority,
} from "../components/imageMaps";
import homestyles from "./homestyles";

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
    name: "New Note XVIIII",
  },
  {
    id: 20,
    name: "New Note XX",
  },
];

const PrioritySelect = [
  {
    id: 1,
    name: "No. 1 (Highest)",
  },
  {
    id: 2,
    name: "No. 2",
  },
  {
    id: 3,
    name: "No. 3",
  },
  {
    id: 4,
    name: "No. 4",
  },
  {
    id: 5,
    name: "No. 5",
  },
  {
    id: 6,
    name: "No. 6",
  },
  {
    id: 7,
    name: "No. 7",
  },
  {
    id: 8,
    name: "No. 8",
  },
  {
    id: 9,
    name: "No. 9",
  },
  {
    id: 10,
    name: "No. 10",
  },
  {
    id: 11,
    name: "No. 11",
  },
  {
    id: 12,
    name: "No. 12",
  },
  {
    id: 13,
    name: "No. 13",
  },
  {
    id: 14,
    name: "No. 14",
  },
  {
    id: 15,
    name: "No. 15",
  },
  {
    id: 16,
    name: "No. 16 (Lowest)",
  },
];

const getCategoryNameById = (categoryId) => {
  const category = Categories.find((cat) => cat.id === categoryId);
  return category ? category.name : "Unknown";
};

export { getCategoryNameById };

export default function Home() {
  const { name, personId, category } = useLocalSearchParams();
  const calledCategory = parseInt(category, 10);
  const popupenter = useSharedValue(0);
  const popupenter2 = useSharedValue(0);
  const fadeopacity = useSharedValue(1);
  const [selectedCategory, setSelectedCategory] = useState(calledCategory);
  const [filteredCards, setFilteredCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [noNotes, setNoNotes] = useState(false);
  const [pointerEventsEnabled, setPointerEventsEnabled] = useState(false);
  const [selectedOriginalIndex, setSelectedOriginalIndex] = useState("");
  const opacity = useSharedValue(0);

  const PopupEnter = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: popupenter.value }],
    };
  });
  const PopupEnter2 = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: popupenter2.value }],
    };
  });

  const Item = ({
    id,
    card,
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
          source={imageMapCard[card]}
          pressStyle={homestyles.cardpressable}
          style={homestyles.card}
        />
        {selectedCategory === 10 ? (
          <AnimatedButton
            onPress={() => handlePriorityButtonPress(originalIndex, priority)}
            source={imageMapPriority[priority]}
            pressStyle={homestyles.prioritybuttonpressable}
            style={homestyles.prioritybutton}
            disabled={false}
          />
        ) : (
          <AnimatedButton
            onPress={() => {}}
            source={imageMapPriority[priority]}
            pressStyle={homestyles.prioritybuttonpressable}
            style={homestyles.hiddenpriority}
            disabled={true}
          />
        )}
        <Image
          source={require("../assets/images/Home/isFav.png")}
          style={[homestyles.isfav, !favorite && homestyles.hiddenFav]}
        />
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

  const NewNoteCards = ({ id, name }) => {
    return (
      <View style={homestyles.popupItemContainer}>
        <Text
          style={homestyles.popuptextitle}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {name}
        </Text>
        <Image
          source={require("../assets/images/Home/NoteNotch.png")}
          style={homestyles.popupcardnotch}
        />
        <AnimatedButton
          onPress={() => handleNewCardSelect(id, name)}
          source={imageMapCard[id]}
          pressStyle={homestyles.popupcardpressable}
          style={homestyles.popupcard}
        />
      </View>
    );
  };

  const PriorityCards = ({ id, name }) => {
    return (
      <View style={homestyles.popup2ItemContainer}>
        <Text
          style={homestyles.popup2textitle}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {name}
        </Text>
        <Image
          source={require("../assets/images/Home/NoteNotch.png")}
          style={homestyles.popup2cardnotch}
        />
        <AnimatedButton
          onPress={() => handleNewPrioritySelect(id)}
          source={imageMapPriority[id]}
          pressStyle={homestyles.popup2cardpressable}
          style={homestyles.popup2card}
        />
      </View>
    );
  };

  const handleCardPress = async (
    id,
    name,
    categoryId,
    priority,
    favorite,
    originalIndex
  ) => {
    await playSound(require("../assets/images/SFX/Battle UI.wav"));
    fadeopacity.value = withTiming(1, { duration: 500 });
    setTimeout(() => {
      router.push({
        pathname: "/note",
        params: {
          personId,
          categoryId,
          favorite,
          originalIndex,
        },
      });
    }, 500);
  };

  const handleCategoryPress = async (id) => {
    console.log("Category Pressed: " + id);
    await playSound(require("../assets/images/SFX/Category Select.wav"));
    setSelectedCategory(id);

    if (id === 11) {
      setFilteredCards(cards);
    } else if (id === 10) {
      const favoriteNotes = cards.filter((card) => card.favorite === true);
      // Sort by priority and then by updatedAt if priority is the same
      favoriteNotes.sort((a, b) => {
        if (a.priority === b.priority) {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        }
        return a.priority - b.priority;
      });
      setFilteredCards(favoriteNotes);
    } else {
      const newFilteredCards = cards.filter((card) => card.categoryId === id);
      setFilteredCards(newFilteredCards);
    }
  };

  const animateCards = () => {
    opacity.value = 0;
    opacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
  };

  useEffect(() => {
    console.log(`Welcome ${name}, your personId is ${personId}`);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchNotes = async () => {
        const url = `https://backend-notes-moviles.onrender.com/getNotes/${personId}`;
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const notes = await response.json();
          notes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
          console.log(notes);
          const formattedCards = notes.map((note, index) => ({
            id: index + 1,
            card: note.card,
            originalIndex: note._id,
            name: note.title,
            categoryId: parseInt(note.category, 10),
            favorite: note.favorite,
            priority: parseInt(note.priority, 10),
          }));

          // Pre-sort the favorite notes by priority and updatedAt
          if (selectedCategory === 10) {
            const favoriteNotes = formattedCards.filter(
              (card) => card.favorite === true
            );
            favoriteNotes.sort((a, b) => {
              if (a.priority === b.priority) {
                return new Date(b.updatedAt) - new Date(a.updatedAt);
              }
              return a.priority - b.priority;
            });
            setFilteredCards(favoriteNotes);
          } else if (selectedCategory === 11) {
            setFilteredCards(formattedCards);
          } else {
            const newFilteredCards = formattedCards.filter(
              (card) => card.categoryId === selectedCategory
            );
            setFilteredCards(newFilteredCards);
          }

          setCards(formattedCards);
          setNoNotes(formattedCards.length === 0);
        } catch (error) {
          console.error("Error fetching notes:", error);
        }
      };

      fetchNotes();

      setTimeout(() => {
        fadeopacity.value = withTiming(0, { duration: 500 }, () => {
          fadeopacity.value = 0;
        });
      }, 550);
      animateCards();
    }, [personId, selectedCategory])
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
                  }),
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
    console.log("New Note Button Pressed");
    setPointerEventsEnabled(true);
    await playSound(require("../assets/images/SFX/Select.wav"));
    popupenter.value = withTiming(
      -400,
      { duration: 1100, easing: Easing.bezier(0.5, -0.5, 0.25, 1) },
      () => {
        popupenter.value = -400;
      }
    );
    fadeopacity.value = withTiming(0.75, { duration: 1000 }, () => {
      fadeopacity.value = 0.75;
    });
  };

  const handleNewCardSelect = async (id, name) => {
    console.log("New Card Selected");
    await playSound(require("../assets/images/SFX/Select.wav"));
    setPointerEventsEnabled(false);
    console.log("Current Selected Category: " + selectedCategory);
    console.log("New Card Selected: " + id, name);

    // Define the data to be sent in the request
    const requestData = {
      title: name,
      description: "",
      user: personId, // Replace with the actual user ID
      category: selectedCategory, // Replace with the actual category ID
      priority: 1,
      favorite: false,
      card: id,
    };

    try {
      // Perform the fetch request
      const response = await fetch(
        "https://backend-notes-moviles.onrender.com/createNote",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      // Check if the response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the response data
      const responseData = await response.json();
      console.log("Note created successfully:", responseData);

      popupenter.value = withTiming(
        100,
        { duration: 500, easing: Easing.bezier(0.5, -0.5, 0.25, 1) },
        () => {
          popupenter.value = 0;
        }
      );

      fadeopacity.value = withTiming(1, { duration: 500 }, () => {
        fadeopacity.value = 1;
      });

      setTimeout(() => {
        router.navigate("/reload");
        setTimeout(() => {
          router.navigate({
            pathname: "/home",
            params: { personId },
          });
        }, 250);
      }, 150);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handlePopupBackPress = async () => {
    console.log("Popup Back Pressed");
    setPointerEventsEnabled(false);
    await playSound(require("../assets/images/SFX/Back.wav"));
    popupenter.value = withTiming(
      0,
      { duration: 1100, easing: Easing.bezier(0.5, -0.5, 0.25, 1) },
      () => {
        popupenter.value = 0;
      }
    );
    fadeopacity.value = withTiming(0, { duration: 1000 }, () => {
      fadeopacity.value = 0;
    });
  };

  const handlePriorityButtonPress = async (originalIndex, priority) => {
    console.log("New Note Button Pressed");
    console.log(
      "Priority Button Pressed for originalIndex:",
      originalIndex,
      "priority:",
      priority
    );
    setPointerEventsEnabled(true);
    await playSound(require("../assets/images/SFX/Select.wav"));
    popupenter2.value = withTiming(
      400,
      { duration: 1100, easing: Easing.bezier(0.5, -0.5, 0.25, 1) },
      () => {
        popupenter2.value = 400;
      }
    );
    fadeopacity.value = withTiming(0.75, { duration: 1000 }, () => {
      fadeopacity.value = 0.75;
    });
    setSelectedOriginalIndex(originalIndex);
  };

  const handleNewPrioritySelect = async (id) => {
    console.log("New Card Selected");
    await playSound(require("../assets/images/SFX/Select.wav"));
    setPointerEventsEnabled(false);

    try {
      const response = await fetch(
        `https://backend-notes-moviles.onrender.com/updateNote/${selectedOriginalIndex}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            priority: id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Note updated successfully:", data);

      popupenter2.value = withTiming(
        100,
        { duration: 500, easing: Easing.bezier(0.5, -0.5, 0.25, 1) },
        () => {
          popupenter2.value = 0;
        }
      );

      fadeopacity.value = withTiming(1, { duration: 500 }, () => {
        fadeopacity.value = 1;
      });

      setTimeout(() => {
        router.navigate("/reload");
        setTimeout(() => {
          router.navigate({
            pathname: "/home",
            params: { personId },
          });
        }, 150);
      }, 250);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handlePopupBackPress2 = async () => {
    console.log("Priority Popup Back Pressed");
    setPointerEventsEnabled(false);
    await playSound(require("../assets/images/SFX/Back.wav"));
    popupenter2.value = withTiming(
      0,
      { duration: 1100, easing: Easing.bezier(0.5, -0.5, 0.25, 1) },
      () => {
        popupenter2.value = 0;
      }
    );
    fadeopacity.value = withTiming(0, { duration: 1000 }, () => {
      fadeopacity.value = 0;
    });
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Animated.View
        style={[homestyles.blackfade, FadeOpacity]}
        pointerEvents={pointerEventsEnabled ? "auto" : "none"}
      />
      <Image
        source={require("../assets/images/DarkStarsBGHD.png")}
        style={homestyles.bg}
      />
      <Image
        source={require("../assets/images/Home/Header.png")}
        style={homestyles.header}
      />
      {selectedCategory === 11 && noNotes && (
        <View style={homestyles.welcomeContainer} pointerEvents="none">
          <Text style={homestyles.welcome}>Welcome!</Text>
          <Text style={homestyles.nonotes}>
            Ready to create your first note?
          </Text>
          <Text style={homestyles.nonotes2}>
            Just select one of the 10 categories above and press this button on
            the bottom left!
          </Text>
          <Image
            style={homestyles.nonotes3}
            source={require("../assets/images/Home/NewNote.png")}
          />
          <Text style={homestyles.nonotes4}>
            (This placeholder doesn't count.)
          </Text>
        </View>
      )}
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
                card={item.card}
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
      <Animated.View style={[homestyles.popupview, PopupEnter]}>
        <Text style={homestyles.popuptext}>
          Press the Arcana you'd like on your new Note!
        </Text>
        <AnimatedButton
          onPress={handlePopupBackPress}
          source={require("../assets/images/Note/Back.png")}
          pressStyle={homestyles.popupbackpressable}
          style={homestyles.popupback}
        />
        <Image
          source={require("../assets/images/Home/Popup.png")}
          style={homestyles.popup}
        />
        <View style={homestyles.popupListContainer}>
          <FlatList
            data={NewNoteSelect}
            renderItem={({ item }) => (
              <NewNoteCards id={item.id} name={item.name} />
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </Animated.View>

      <Animated.View style={[homestyles.popup2view, PopupEnter2]}>
        <Text style={homestyles.popup2text}>
          Press the new Priority you'd like for this card to have!
        </Text>
        <AnimatedButton
          onPress={handlePopupBackPress2}
          source={require("../assets/images/Note/Back.png")}
          pressStyle={homestyles.popup2backpressable}
          style={homestyles.popup2back}
        />
        <Image
          source={require("../assets/images/Home/Popup.png")}
          style={homestyles.popup2}
        />
        <View style={homestyles.popup2ListContainer}>
          <FlatList
            data={PrioritySelect}
            renderItem={({ item }) => (
              <PriorityCards id={item.id} name={item.name} />
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </Animated.View>
    </View>
  );
}
