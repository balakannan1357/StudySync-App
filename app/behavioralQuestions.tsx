import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Question = {
  id: number;
  text: string;
  options: string[];
};

export default function SleepPreferenceScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const router = useRouter();

  const sleepQuestions: Question[] = [
    {
      id: 1,
      text: "Are you...",
      options: ["Night owl", "Early bird"],
    },
    {
      id: 2,
      text: "What's your typical sleep schedule?",
      options: ["More than 8 hours", "6-8 hours", "Less than 6 hours"],
    },
  ];

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    if (currentStep < sleepQuestions.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    console.log("Sleep preferences:", answers);
    router.replace("/(tabs)");
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
          <Text style={styles.appName}>Sleep Preferences</Text>
          <View style={{ width: 24 }} /> {/* Spacer for alignment */}
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>Tell us about your sleep habits</Text>

          {currentStep < sleepQuestions.length && (
            <>
              <Text style={styles.questionProgress}>
                Question {currentStep + 1} of {sleepQuestions.length}
              </Text>
              <Text style={styles.questionText}>
                {sleepQuestions[currentStep].text}
              </Text>

              {sleepQuestions[currentStep].options.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    answers[sleepQuestions[currentStep].id] === option &&
                      styles.selectedOption,
                  ]}
                  onPress={() =>
                    handleAnswerSelect(sleepQuestions[currentStep].id, option)
                  }
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}

          {currentStep === sleepQuestions.length && (
            <View style={styles.completionContainer}>
              <MaterialIcons
                name="check-circle"
                size={60}
                color="#4CAF50"
                style={styles.completionIcon}
              />
              <Text style={styles.completionText}>
                Thank you for sharing your sleep preferences!
              </Text>
              <Text style={styles.completionSubtext}>
                We'll use this information to personalize your experience.
              </Text>
            </View>
          )}

          <View style={styles.navigationButtons}>
            {currentStep > 0 && currentStep < sleepQuestions.length && (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setCurrentStep((prev) => prev - 1)}
              >
                <MaterialIcons name="arrow-back" size={24} color="#2da9e9" />
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
            )}

            {currentStep < sleepQuestions.length ? (
              <TouchableOpacity
                style={[
                  styles.nextButton,
                  !answers[sleepQuestions[currentStep].id] &&
                    styles.disabledButton,
                ]}
                onPress={() => setCurrentStep((prev) => prev + 1)}
                disabled={!answers[sleepQuestions[currentStep].id]}
              >
                <Text style={styles.nextButtonText}>
                  {currentStep === sleepQuestions.length - 1
                    ? "Submit"
                    : "Next"}
                </Text>
                <MaterialIcons
                  name={
                    currentStep === sleepQuestions.length - 1
                      ? "check"
                      : "arrow-forward"
                  }
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>Continue to App</Text>
                <MaterialIcons name="arrow-forward" size={24} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        </View>
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
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2da9e9",
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    flex: 1,
    marginLeft: 10,
  },
  disabledButton: {
    backgroundColor: "#aaa",
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
    backgroundColor: "#2da9e9",
    borderRadius: 10,
    padding: 15,
    width: "100%",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  completionContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  completionIcon: {
    marginBottom: 20,
  },
  completionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  completionSubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});