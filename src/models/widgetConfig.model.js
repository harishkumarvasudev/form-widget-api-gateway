import { DateTime } from 'luxon';
import { db } from './db.js';
import { doc, setDoc } from 'firebase/firestore';

// TODO: Schema validation - You can add schema validation for the data being received

/**
 * Create a new widget.
 * @param {Object} data - The data for the widget.
 * @returns {Promise<void>} - A promise that resolves when the widget is created successfully.
 */
const createWidget = async (data) => {
    // To be implemented when the UI Dashboard for widget creation is in place.
    // For now, this function is left empty.
    // Example of how to write data to Firebase Realtime Database:
    // db.ref("forms").set(data, (error) => {
    //     if (error) {
    //         console.log("Failed with error: " + error);
    //     } else {
    //         console.log("Success");
    //     }
    // });
};

/**
 * Get the widget configuration by its ID.
 * @param {Object} id - The ID of the widget to retrieve.
 * @returns {Promise<Object>} - A promise that resolves with the widget configuration object.
 */
const getWidgetConfig = async ({ id }) => {
    const ref = db.ref('forms');

    // Use orderByChild and equalTo to get the widget with the specified formId
    let snapShot = await ref.orderByChild('formId').equalTo(parseInt(id)).once('value');

    // Return the value of the snapshot, which contains the widget configuration object
    return snapShot.val();
};

// Export the functions as an object
export default { createWidget, getWidgetConfig };