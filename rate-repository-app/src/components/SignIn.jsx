import Text from "./Text";
import { Pressable, View, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import * as yup from "yup";
import theme from "../theme";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
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

const SignIn = () => {
  const handleSubmit = () => console.log("Form submit");
  const initialValues = {
    username: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SigninForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SigninForm = ({ onSubmit }) => {
  return (
    <View style={styles.formContainer}>
      <FormikTextInput
        style={styles.formStyle}
        name="username"
        placeholder="username"
      />
      <FormikTextInput
        style={styles.formStyle}
        name="password"
        placeholder="password"
        secureTextEntry
      />
      <Pressable style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
