// App.js

import React from 'react';
import { IonApp, IonContent } from '@ionic/react';
import { FirebaseAppProvider } from 'reactfire';
import GoogleAuthComponent from './GoogleAuthComponent';

const firebaseConfig = {
  // Your Firebase config object
};

const App = () => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <IonApp>
        <IonContent>
          <GoogleAuthComponent />
        </IonContent>
      </IonApp>
    </FirebaseAppProvider>
  );
};

export default App;
