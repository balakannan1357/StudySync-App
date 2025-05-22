import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Button,
  Easing,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface PickerItem {
  label: string;
  value: string | number;
}

interface CustomPickerProps {
  items: PickerItem[];
  initialItem?: PickerItem | null;
  onItemChange?: (item: PickerItem) => void;
  label?: string;
  hideLabel?: boolean;
  placeholder?: string;
}

const Select = ({
  items = [],
  initialItem = null,
  onItemChange = () => {},
  label = "Select an option",
  hideLabel = false,
  placeholder = "Select...",
}: CustomPickerProps) => {
  const [selectedItem, setSelectedItem] = useState(initialItem);
  const [modalVisible, setModalVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    setSelectedItem(initialItem);
  }, [initialItem]);

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };

  const onChange = (value: string | number) => {
    const item = items.find((i) => i.value === value);
    if (!item) return;

    setSelectedItem(item);
    onItemChange(item);
  };

  const picker = (
    <Picker
      selectedValue={selectedItem?.value ?? ""}
      onValueChange={onChange}
      style={styles.picker}
      itemStyle={{ color: "black", fontSize: 18 }}
    >
      {items.map(({ label, value }) => (
        <Picker.Item key={value} label={label} value={value} />
      ))}
    </Picker>
  );

  return (
    <View style={styles.container}>
      {!hideLabel && <Text style={styles.label}>{label}</Text>}

      {Platform.OS === "android" ? (
        picker
      ) : (
        <>
          <Button
            title={selectedItem ? `${selectedItem.label}` : placeholder}
            onPress={openModal}
            color="#333"
          />
          <Modal
            visible={modalVisible}
            transparent
            animationType="none"
            onRequestClose={closeModal}
          >
            <TouchableWithoutFeedback onPress={closeModal}>
              <Animated.View
                style={[styles.modalBackground, { opacity: fadeAnim }]}
              >
                <TouchableWithoutFeedback onPress={() => {}}>
                  <Animated.View
                    style={[
                      styles.modalContent,
                      {
                        opacity: fadeAnim,
                        transform: [
                          {
                            translateY: fadeAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [300, 0],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    {picker}
                    <Button title="Done" onPress={closeModal} />
                  </Animated.View>
                </TouchableWithoutFeedback>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    marginBottom: 6,
    fontSize: 16,
  },
  picker: {
    width: "100%",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    paddingBottom: 20,
    paddingTop: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
  },
});

export default Select;
