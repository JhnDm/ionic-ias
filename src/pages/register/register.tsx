import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonLoading, IonTitle } from '@ionic/react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import { useIonRouter } from '@ionic/react';

import '../register/register.css';

const firebaseConfig = {
  apiKey: "AIzaSyAfME1q9QAVkcb7E8KJ4qMiKjDtN7HDwjw",
  authDomain: "loginform-domo.firebaseapp.com",
  projectId: "loginform-domo",
  storageBucket: "loginform-domo.appspot.com",
  messagingSenderId: "555716568828",
  appId: "1:555716568828:web:fae15f857d28ecf3ad1979",
  measurementId: "G-BBE14VL2N0"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const Register = () => {
  const router = useIonRouter(); // Initialize useIonRouter hook
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const goToLogin = () => {
    router.push('/login'); // Navigate to the login page
  };

  return (
    <IonPage>
      <IonContent>
        <div className="register-container">
          <IonTitle className="register-title">Sign Up</IonTitle>
          <IonInput
            type="text"
            placeholder="Name"
            value={name}
            onIonChange={(e) => setName(e.detail.value!)}
            className="register-input"
          />
          <IonInput
            type="email"
            placeholder="Email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
            className="register-input"
          />
          <IonInput
            type="password"
            placeholder="Password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
            className="register-input"
          />
          <IonButton onClick={handleRegister} className="register-button">SIGN UP</IonButton>
          <IonButton onClick={goToLogin} className="login-button" fill="clear">
          <br />
          <br />
          <br />
          <br />
          <br />
            Already have an account? Log in
          </IonButton>
          <IonLoading isOpen={loading} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;