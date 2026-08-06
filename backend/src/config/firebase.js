import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
export let db;
export function initializeFirebase(serviceAccount) {
  initializeApp({
    credential: cert(serviceAccount),
  });
  db = getFirestore();
  return db;
}
