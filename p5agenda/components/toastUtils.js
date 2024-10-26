import Toast from "react-native-root-toast";

export const showToast = (message) => {
  const toast = Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });

  // Hide the toast after a delay
  setTimeout(() => {
    Toast.hide(toast);
  }, 6000);

  return toast;
};
