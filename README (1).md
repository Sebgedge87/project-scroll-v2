# 🧙‍♂️ Project Scroll – TTRPG Campaign Manager

Project Scroll is a focused, multi-user campaign manager for tabletop RPGs like D&D 5e. This app is built both as a real-world tool and a learning experience for full-stack web development.

## Purpose

- Real-time collaboration using Firebase Auth & Firestore  
- Manage campaigns, sessions, player notes, and shared resources  
- Modular, feature-based React architecture with Tailwind CSS

## Tech Stack

- React (Vite)  
- Tailwind CSS (dark UI)  
- Firebase Auth & Firestore  
- React Router v6  

---

## Firestore Security Rules

```rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /games/{gameId} {
      allow create: if request.auth != null;
      allow get, list: if request.auth != null
        && (
          resource.data.gmId == request.auth.uid
          || request.auth.uid in resource.data.memberUids
        );
      allow update, delete: if request.auth != null
        && resource.data.gmId == request.auth.uid;

      match /sessions/{sessionId} {
        allow create, get, list, update, delete: if request.auth != null
          && resource.parent.data.gmId == request.auth.uid;
      }

      match /members/{memberId} {
        allow create, get: if request.auth != null
          && request.auth.uid == memberId;
        allow delete: if request.auth != null
          && resource.parent.data.gmId == request.auth.uid;
      }

      match /notes/{noteId} {
        allow create, get, list, update, delete: if request.auth != null
          && request.auth.uid == resource.data.userId;
      }
    }
  }
}
```

> **Note**: your `games` documents must include a `memberUids` array field. Denormalise membership by pushing UIDs into this array on join, and use `arrayRemove()` when removing members.

## DashboardPage.jsx Update

Import and use `updateDoc` and `arrayUnion` to maintain `memberUids`:

```js
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';

// In handleCreateGame():
await addDoc(collection(db, 'games'), {
  /* ... */
  memberUids: [currentUser.uid],
});

// In handleJoinGame():
const gameRef = doc(db, 'games', code);
await updateDoc(gameRef, {
  memberUids: arrayUnion(currentUser.uid)
});
```

## Roadmap & Cleanup

- Remove or stash out-of-scope pages (`SignUp.jsx`, `Login.jsx`, `NotesPage.jsx`)  
- Confirm `DashboardPage`, `GamePage`, and `SessionsPage` routes render correctly  
- Migrate existing games: backfill `memberUids` arrays via script or Firebase Function  
- Next: implement Inventory and rich text Notes in Week Three

---

*Copy this `README.md` into your project root to apply these updates.*