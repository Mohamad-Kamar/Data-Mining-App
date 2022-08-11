import { firestore } from "./../firebase-config";

const ref = firestore.collection("Entries");

export const getAllEntries = async () => {
    const entryDocs = await ref.get()
    const entries = entryDocs.docs.map((doc) => ({ ...doc.data(), entryID: doc.id }));
    return entries;
}

export const getEntry = async (entryId) => {
    const entryDoc = await ref.doc(entryId).get();
    return entryDoc.data();

}

export const addEntry = async (entryData) => {
    const createdDoc = await ref.doc().set(entryData);
    return createdDoc;
}

export const deletEntry = async (entryId) => {
    const deletedDoc = await ref.doc(entryId).delete();
    return deletedDoc;
}

export const editEntry = async (entryData, entryId) => {
    entryData.id = entryId;
    const modifiedDoc = await ref.doc(entryData.id).update(entryData);
    return modifiedDoc;
}

