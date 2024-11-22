/**
 * Converts an array of objects into a Map with the year as the key.
 * @param {Array<Object>} dataArray - The array of objects from the CSV.
 * @returns {Map<number, Object>} - A Map with the year as the key and event objects as values.
 */
export function parseCSVToMap(dataArray) {
    const eventMap = new Map();

    // Iterate through the array to populate the Map
    dataArray.forEach(row => {
        const year = parseInt(row.Year, 10); // Convert year to an integer
        if (!isNaN(year)) {
            eventMap.set(year, {
                title: row.Title,
                description: row.Description,
                image: row.Image,
            });
        }
    });

    return eventMap;
}
