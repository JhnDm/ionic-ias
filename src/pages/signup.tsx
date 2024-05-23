import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonItem, IonLabel, IonButton, IonAlert } from '@ionic/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import { auth, db } from './firebase';
import './styles.css'; // Import the consolidated CSS file

const Signup: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const history = useHistory();

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        name: name,
        email: user.email,
      });

      setAlertMessage(`Account created successfully!`);
      setShowAlert(true);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setAlertMessage('User already exists');
      } else {
        setAlertMessage('Sorry, can\'t sign up');
      }
      setError(error.message);
      setShowAlert(true);
    }
  };

  const handleAlertDismiss = () => {
    setShowAlert(false);
    if (alertMessage === 'Account created successfully. Welcome ' + name) {
      history.push('/home');
    }
  };

  const handleLogin = () => {
    history.push('/login');
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <br />
        <br />
        <br />
        <br />
        <div className="container">
          <h1 className="welcome-text">Sign Up</h1>
          <IonItem>
            <IonLabel position="stacked">Name</IonLabel>
            <br />
            <IonInput
              value={name}
              type="text"
              onIonChange={(e) => setName(e.detail.value!)}
              className="ion-input"
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <br />
            <IonInput
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
              value={password}
              type="password"
              onIonChange={(e) => setPassword(e.detail.value!)}
              className="ion-input"
            />
          </IonItem>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="button-group">
            <IonButton className="button" onClick={handleSignUp}>Sign Up</IonButton>
          </div>
          <div className="text">
            Already have an account? <span onClick={handleLogin}>Login</span>
          </div>
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={handleAlertDismiss}
            header={'Alert'}
            message={alertMessage}
            buttons={['OK']}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
