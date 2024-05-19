// Login.tsx

import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonLoading, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Router, useHistory } from 'react-router-dom';
import { useIonRouter } from '@ionic/react';

import '../login/login.css';

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

const Login = () => {
  const router = useIonRouter(); // Initialize useIonRouter hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  const goToRegister = () => {
    router.push('/register'); // Navigate to the register page
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="toolbar-skyblue">
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="login-container">
          <IonInput
            type="email"
            placeholder="Email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
            className="login-input"
          />
          <IonInput
            type="password"
            placeholder="Password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
            className="login-input"
          />
          <IonButton onClick={handleLogin} className="login-button">LOGIN</IonButton>
          <IonButton onClick={goToRegister} className="register-button" fill="clear">
            Create Account
          </IonButton>
          <IonLoading isOpen={loading} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;