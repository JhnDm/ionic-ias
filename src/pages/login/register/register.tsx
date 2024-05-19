// Register.tsx

import React, { useState } from 'react';
import { IonButtons, IonContent, IonPage, IonInput, IonButton, IonLoading, IonHeader, IonToolbar, IonTitle, IonBackButton } from '@ionic/react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import './register.css'; // Import CSS file

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Handle successful registration (e.g., redirect to login or home page)
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="toolbar-skyblue">
        <IonButtons slot='start'>
              <IonBackButton defaultHref='/home'/>
           </IonButtons>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="register-container">
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
          <IonButton onClick={handleRegister} className="register-button">Register</IonButton>
          <IonLoading isOpen={loading} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
