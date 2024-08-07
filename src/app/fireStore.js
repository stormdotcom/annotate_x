import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { app, auth, googleProvider, GitHubProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";


const fireStore = getFirestore(app);


const addUserToFirestore = async (user) => {
    const userDocRef = doc(fireStore, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
        await setDoc(userDocRef, {
            apiEndPoint: "",
            imagesAnnotated: 0,
            subscribed: {
                endDate: null,
                startDate: null,
                status: false
            }
        });

    }
};

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        await addUserToFirestore(user);
        localStorage.setItem("user", JSON.stringify(result.user));
        window.location.reload("/");
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error signing in with Google: ", error);
    }
};

export const signInWithGithub = async () => {
    try {
        const result = await signInWithPopup(auth, GitHubProvider);
        const user = result.user;
        await addUserToFirestore(user);
        localStorage.setItem("user", JSON.stringify(result.user));
        window.location.reload("/");
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error signing in with GitHub: ", error);
    }
};

