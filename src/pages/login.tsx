import React, { useState } from "react";
import {
  IonContent,
  IonPage,
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
import "./styles.css"; // Import the consolidated CSS file

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [welcomeMessage, setWelcomeMessage] = useState<string | null>(null);
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setWelcomeMessage(`Welcome!`);
        setShowAlert(true);
        setTimeout(() => {
          history.push("/home");
        }, 3000);
      } else {
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
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="container">
          <h1 className="welcome-text">Welcome!</h1>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <br />
            <IonInput
              placeholder=""
              value={email}
              type="email"
              onIonChange={(e) => setEmail(e.detail.value!)}
              className="ion-input"
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <br />
            <IonInput
              placeholder=""
              value={password}
              type="password"
              onIonChange={(e) => setPassword(e.detail.value!)}
              className="ion-input"
            />
          </IonItem>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="button-group">
            <IonButton className="block-button" onClick={handleLogin}>
              Login
            </IonButton>
          </div>
          <div className="text">
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
