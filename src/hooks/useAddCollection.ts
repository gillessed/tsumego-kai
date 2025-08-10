import { setDoc } from "firebase/firestore";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { AppRoutes } from "../components/AppRoutes";
import { useAppContext } from "../context/AppContext";
import {
  Collection,
  collectionDoc,
  NewCollection,
} from "../database/Collections";

export const useAddCollection = () => {
  const navigate = useNavigate();
  const { db } = useAppContext();

  return useCallback(
    async (newCollection: NewCollection) => {
      const id = v4();
      const collection: Collection = { ...newCollection, id: id };
      const doc = collectionDoc(db, id);
      await setDoc(doc, collection);
      navigate(AppRoutes.collection(id));
    },
    [navigate, db]
  );
};
