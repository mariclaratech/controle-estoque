import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        firestoreId: doc.id,
        ...doc.data(),
      }));

      setProducts(data);
    });

    return () => unsub();
  }, []);

  const addProduct = async (product) => {
    return addDoc(collection(db, "products"), product);
  };

  const updateProduct = async (id, product) => {
    return updateDoc(doc(db, "products", id), product);
  };

  const deleteProduct = async (id) => {
    return deleteDoc(doc(db, "products", id));
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}
