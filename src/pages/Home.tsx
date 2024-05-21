import React, { useState, useEffect } from 'react';
import {IonApp,IonHeader,IonToolbar,IonTitle,IonContent,IonList,IonItem,IonLabel,IonCheckbox,IonInput,IonButton,IonBackButton,IonButtons,} from '@ionic/react';
import { collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import { useHistory } from 'react-router-dom';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoListApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Todo)));
    });

    return () => unsubscribe();
  }, []);

  const addTodo = async () => {
    if (newTodo.trim() !== '') {
      const docRef = await addDoc(collection(db, 'todos'), { text: newTodo, completed: false });
      setNewTodo('');
    }
  };

  const toggleTodo = async (id: string) => {
    const todoRef = doc(db, 'todos', id);
    await updateDoc(todoRef, { completed: !todos.find(todo => todo.id === id)?.completed });
  };

  const deleteTodo = async (id: string) => {
    const todoRef = doc(db, 'todos', id);
    await deleteDoc(todoRef);
  };

  const handleBack = () => {
    history.push('/home');
  };

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot='start'>
              <IonBackButton defaultHref='/home'/>
           </IonButtons>
          <IonTitle>To-Do List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <br />
        <br />
        <br />
        <IonItem>
          <IonInput
            placeholder="Enter a new todo"
            value={newTodo}
            onIonChange={(e) => setNewTodo(e.detail.value!)}
          />
          <IonButton slot="end" onClick={addTodo}>Add</IonButton>
        </IonItem>
        <br />
        <IonList>
          {todos.map((todo) => (
            <IonItem key={todo.id}>
              <IonCheckbox
                slot="start"
                checked={todo.completed}
                onIonChange={() => toggleTodo(todo.id)}
              />
              <IonLabel style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
              </IonLabel>
              <IonButton slot="end" onClick={() => deleteTodo(todo.id)}>Delete</IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonApp>
  );
};

export default TodoListApp;