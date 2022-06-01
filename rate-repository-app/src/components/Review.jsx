import Text from "./Text";
import { Pressable, View, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import * as yup from "yup";
import theme from "../theme";
import useReview from "../hooks/useReview";

const validationSchema = yup.object().shape({
  repositoryOwner: yup.string().required("Repository owner is required"),
  repositoryName: yup.string().required("Repository's name is required"),
  rating: yup.number().min(0).max(100).required("Rating is required"),
});

const styles = StyleSheet.create({
  formContainer: {
    margin: 20,
  },
  formStyle: {
    padding: 20,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    color: "black",
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    height: 50,
    borderRadius: 5,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

const Review = () => {
  const [createReview] = useReview();

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      await createReview(values);
    } catch (error) {
      console.log(error);
    }
  };
  const initialValues = {
    repositoryOwner: "",
    repositoryName: "",
    text: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.formContainer}>
      <FormikTextInput
        style={styles.formStyle}
        name="repositoryOwner"
        placeholder="repository owner"
      />
      <FormikTextInput
        style={styles.formStyle}
        name="repositoryName"
        placeholder="repository's name"
      />
      <FormikTextInput
        style={styles.formStyle}
        name="rating"
        placeholder="rating between 0 and 100"
      />
      <FormikTextInput
        style={styles.formStyle}
        name="text"
        placeholder="review"
      />
      <Pressable style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.buttonText}>Send</Text>
      </Pressable>
    </View>
  );
};

export default Review;
