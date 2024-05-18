// GoogleAuthComponent.js

import React from 'react';
import { IonButton } from '@ionic/react';
import { useFirebaseApp, useUser } from 'reactfire';

const GoogleAuthComponent = () => {
  const firebaseApp = useFirebaseApp();
  const user = useUser();

  const handleGoogleSignIn = async () => {
    const provider = new firebaseApp.auth.GoogleAuthProvider();
    try {
      await firebaseApp.auth().signInWithPopup(provider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseApp.auth().signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {user ? (
        <IonButton onClick={handleSignOut}>Sign Out</IonButton>
      ) : (
        <IonButton onClick={handleGoogleSignIn}>Sign in with Google</IonButton>
      )}
    </div>
  );
};

export default GoogleAuthComponent;
