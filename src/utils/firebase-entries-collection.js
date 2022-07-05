import { app } from "./../firebase-config";

const ref = app.collection("Entries");

export const getAllEntries = async () => {
    const entryDoc = await ref.get()
    const entries = entryDoc.docs.map((doc) => doc.data());
    return entries;
}


export const addEntry = async (entryData) => {
    const createdDoc = await ref.doc().set(entryData);
    return createdDoc;
}

export const deletEntry = async (entryId) => {
    const deletedDoc = await ref.doc(entryId).delete();
    return deletedDoc;
}

export const editEntry = async (entryData) => {
    const modifiedDoc = await ref.doc(entryData.id).update(entryData);
    return modifiedDoc;
}

