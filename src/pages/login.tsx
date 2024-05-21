import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonAlert,
} from "@ionic/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useHistory } from "react-router-dom";
import "./login.css"; // Import the CSS file


const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [welcomeMessage, setWelcomeMessage] = useState<string | null>(null); // State for welcome message
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Check if user exists in Firestore
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // User exists, navigate to home page
        const userData = docSnap.data();
        setWelcomeMessage(`Welcome ${userData.name}`);
        setShowAlert(true);
        // Redirect to home page after showing the alert
        setTimeout(() => {
          history.push("/home");
        }, 3000); // Redirect after 3 seconds
      } else {
        // User does not exist, show alert
        setShowAlert(true);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSignup = () => {
    history.push("/signup");
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="welcome-container">
          <h1 className="welcome-text">Welcome!</h1>
        </div>
        <div className="centered-content">
          <IonItem>
            <IonInput
              placeholder="Email"
              value={email}
              type="email"
              onIonChange={(e) => setEmail(e.detail.value!)}
              className="outlined-input"
            />
          </IonItem>
          <IonItem>
            <IonInput
              placeholder="Password"
              value={password}
              type="password"
              onIonChange={(e) => setPassword(e.detail.value!)}
              className="outlined-input"
            />
          </IonItem>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="button-group">
            <IonButton className="login-button" onClick={handleLogin}>
              Login
            </IonButton>
          </div>
          <div className="signup-text">
            Don't have an account? <span onClick={handleSignup}>Sign Up</span>
          </div>
        </div>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={"Alert"}
          message={welcomeMessage || "User does not exist"} 
          buttons={["OK"]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;