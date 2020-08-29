import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyAyS-_FxuT6l7HtaoJHYGFXXedXvlW7oNE",
        authDomain: "messenger-clone-bb3ff.firebaseapp.com",
        databaseURL: "https://messenger-clone-bb3ff.firebaseio.com",
        projectId: "messenger-clone-bb3ff",
        storageBucket: "messenger-clone-bb3ff.appspot.com",
        messagingSenderId: "904805058862",
        appId: "1:904805058862:web:9a9dcd67b49c5cd2edd2bf",
        measurementId: "G-Q6VX0W8R7J"
})

const db = firebaseApp.firestore()

export {db};
