import { dynamoDocClient } from "./../dynamodb-config";
import { uniqueID } from "../utils/global-utils"

let params = {
    TableName: "Entries"
};

export const getAllEntries = async () => {
    return new Promise((resolve, reject) => {
        dynamoDocClient.scan(params, (err, data) => {
            if (err) {
                console.log(err);
                reject(err)
            } else {
                resolve(data.Items.map((item) => ({ ...item, entryID: item.id })));
            }
        })
    })
}

export const getEntry = async (entryId) => {
    return new Promise((resolve, reject) => {
        let readEntryParams = { ...params, entryId };
        dynamoDocClient.scan(readEntryParams, (err, data) => {
            if (err) {
                console.log(err);
                reject(err)
            } else {
                resolve(data);
            }
        })
    })
}

export const addEntry = async (entryData) => {
    return new Promise((resolve, reject) => {
        const uniqueData = {...entryData, id: uniqueID()}
        let createEntryParams = { ...params, Item: uniqueData };
        dynamoDocClient.put(createEntryParams, (err, data) => {
            if (err) {
                console.log(err);
                reject(err)
            } else {
                resolve(data);
            }
        })
    })
}

export const deletEntry = async (entryId) => {
    return new Promise((resolve, reject) => {
        let deleteEntryParams = {
            ...params,
            Key: {
                id: entryId
            },
            ReturnValues: "ALL_OLD"
        };
        dynamoDocClient.delete(deleteEntryParams, (err, data) => {
            if (err) {
                console.log(err);
                reject(err)
            } else {
                resolve(data);
            }
        })
    })
}

export const editEntry = async (entryData, entryId) => {
    const {entryName, transTaxValues} = entryData;
    return new Promise((resolve, reject) => {
        let updateEntryParams = {
            Key: {
                id: entryId,
            },
            ...params,
            UpdateExpression: 'set entryName = :t, transTaxValues = :s',
            ExpressionAttributeValues: {
              ':t' : entryName,
              ':s' : transTaxValues
            }
        };
        dynamoDocClient.update(updateEntryParams, (err, data) => {
            if (err) {
                console.log(err);
                reject(err)
            } else {
                resolve(data);
            }
        })
    })
}

