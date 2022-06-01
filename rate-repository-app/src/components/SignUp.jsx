import Text from "./Text";
import { Pressable, View, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import * as yup from "yup";
import theme from "../theme";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

const validationSchema = yup.object().shape({
  username: yup.string().min(1).max(30).required("Username is required"),
  password: yup.string().min(5).max(50).required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Password confirmation must match password"
    )
    .required("Password confirmation is required"),
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

export const SignUpContainer = ({ signUp, signIn, navigate }) => {
  const handleSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signUp({ username, password });
      await signIn({ username, password });
      navigate("/");
    } catch (error) {
      console.log("Eror:", error);
    }
  };

  const initialValues = {
    username: "",
    password: "",
    passwordConfirmation: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  return (
    <SignUpContainer signUp={signUp} signIn={signIn} navigate={navigate} />
  );
};

const SignUpForm = ({ onSubmit }) => {
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
      <FormikTextInput
        style={styles.formStyle}
        name="passwordConfirmation"
        placeholder="confirm password"
        secureTextEntry
      />
      <Pressable style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignUp;
