import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type UserData = {
  name: string;
  school: string;
  age: string;
  email: string;
  location: string;
  dob: Date;
  password: string;
  confirmPassword: string;
};

type Question = {
  id: number;
  text: string;
  options: string[];
};

export default function RegisterScreen() {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    school: "",
    age: "",
    email: "",
    location: "",
    dob: new Date(2000, 0, 1),
    password: "",
    confirmPassword: "",
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter();

  const behavioralQuestions: Question[] = [
    {
      id: 1,
      text: "How do you prefer to study?",
      options: [
        "Alone in quiet places",
        "With a study group",
        "With background music",
        "In short bursts with breaks",
      ],
    },
    {
      id: 2,
      text: "When are you most productive?",
      options: ["Morning", "Afternoon", "Evening", "Night"],
    },
    {
      id: 3,
      text: "How do you handle difficult subjects?",
      options: [
        "Break them into smaller parts",
        "Seek help immediately",
        "Keep trying until I understand",
        "Put them aside for later",
      ],
    },
    {
      id: 4,
      text: "What motivates you to study?",
      options: [
        "Career goals",
        "Personal interest",
        "Grades/academic success",
        "Family expectations",
      ],
    },
    {
      id: 5,
      text: "How do you prefer to learn new concepts?",
      options: [
        "Visual aids (diagrams, charts)",
        "Reading textbooks",
        "Practical exercises",
        "Listening to explanations",
      ],
    },
  ];

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setUserData({ ...userData, dob: selectedDate });
    }
  };

  const formatDate = (date: Date) => {
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "/");
  };

  const handleUserDataChange = (field: keyof UserData, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    if (currentStep < behavioralQuestions.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSubmitRegistration = () => {
    console.log("User data:", userData);
    console.log("Behavioral answers:", answers);
    router.replace("/login");
  };

  return (
    <LinearGradient
      colors={["#68c7ff", "#4ab8f5", "#2da9e9"]}
      style={styles.gradientContainer}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.appName}>Create Account</Text>
          <View style={{ width: 24 }} /> {/* Spacer for alignment */}
        </View>

        {currentStep === 0 && (
          <View style={styles.formContainer}>
            <Text style={styles.welcomeText}>Tell us about yourself</Text>

            <View style={styles.inputContainer}>
              <MaterialIcons
                name="badge"
                size={24}
                color="#2da9e9"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#aaa"
                value={userData.name}
                onChangeText={(text) => handleUserDataChange("name", text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons
                name="school"
                size={24}
                color="#2da9e9"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="School/University"
                placeholderTextColor="#aaa"
                value={userData.school}
                onChangeText={(text) => handleUserDataChange("school", text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons
                name="cake"
                size={24}
                color="#2da9e9"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Age"
                placeholderTextColor="#aaa"
                value={userData.age}
                onChangeText={(text) => handleUserDataChange("age", text)}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons
                name="email"
                size={24}
                color="#2da9e9"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                value={userData.email}
                onChangeText={(text) => handleUserDataChange("email", text)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons
                name="location-on"
                size={24}
                color="#2da9e9"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Location"
                placeholderTextColor="#aaa"
                value={userData.location}
                onChangeText={(text) => handleUserDataChange("location", text)}
              />
            </View>

            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => setShowDatePicker(true)}
            >
              <MaterialIcons
                name="event"
                size={24}
                color="#2da9e9"
                style={styles.inputIcon}
              />
              <Text style={[styles.input, { color: "#333" }]}>
                {formatDate(userData.dob)}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={userData.dob}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleDateChange}
                maximumDate={new Date()}
              />
            )}
            <View style={styles.inputContainer}>
              <MaterialIcons
                name="lock"
                size={24}
                color="#2da9e9"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#aaa"
                value={userData.password}
                onChangeText={(text) => handleUserDataChange("password", text)}
                secureTextEntry={true}
              />
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons
                name="lock-outline"
                size={24}
                color="#2da9e9"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#aaa"
                value={userData.confirmPassword}
                onChangeText={(text) =>
                  handleUserDataChange("confirmPassword", text)
                }
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => setCurrentStep(1)}
              disabled={
                !userData.name ||
                !userData.email ||
                !userData.password ||
                !userData.confirmPassword ||
                userData.password !== userData.confirmPassword
              }
            >
              <Text style={styles.nextButtonText}>Continue</Text>
              <MaterialIcons name="arrow-forward" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        )}

        {currentStep > 0 && currentStep <= behavioralQuestions.length && (
          <View style={styles.formContainer}>
            <Text style={styles.questionProgress}>
              Question {currentStep} of {behavioralQuestions.length}
            </Text>
            <Text style={styles.questionText}>
              {behavioralQuestions[currentStep - 1].text}
            </Text>

            {behavioralQuestions[currentStep - 1].options.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  answers[behavioralQuestions[currentStep - 1].id] === option &&
                    styles.selectedOption,
                ]}
                onPress={() =>
                  handleAnswerSelect(
                    behavioralQuestions[currentStep - 1].id,
                    option
                  )
                }
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}

            <View style={styles.navigationButtons}>
              {currentStep > 1 && (
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => setCurrentStep((prev) => prev - 1)}
                >
                  <MaterialIcons name="arrow-back" size={24} color="#2da9e9" />
                  <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
              )}

              {currentStep < behavioralQuestions.length ? (
                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={() => setCurrentStep((prev) => prev + 1)}
                  disabled={!answers[behavioralQuestions[currentStep - 1].id]}
                >
                  <Text style={styles.nextButtonText}>Next</Text>
                  <MaterialIcons name="arrow-forward" size={24} color="#fff" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmitRegistration}
                >
                  <Text style={styles.submitButtonText}>
                    Complete Registration
                  </Text>
                  <MaterialIcons name="check-circle" size={24} color="#fff" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2da9e9",
    marginBottom: 10,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    height: "100%",
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2da9e9",
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  questionProgress: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 5,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  optionButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedOption: {
    backgroundColor: "#e1f5fe",
    borderColor: "#2da9e9",
  },
  optionText: {
    fontSize: 15,
    color: "#333",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  backButtonText: {
    color: "#2da9e9",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    padding: 15,
    flex: 1,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  errorText: {
    color: "#ff4444",
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
});
