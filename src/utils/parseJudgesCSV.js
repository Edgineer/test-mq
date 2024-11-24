/**
 * Converts an array of judge objects into a Map of years to judges available that year.
 * @param {Array<Object>} dataArray - The array of judge objects from the CSV.
 * @returns {Map<number, Array<Object>>} - A Map with the year as the key and an array of judges as values.
 */
export function parseJudgesToMap(dataArray) {
    const judgeMap = new Map();

    // Iterate through each judge to populate the map by years
    dataArray.forEach(row => {
        const startYear = parseInt(row.Start, 10); // Convert Start to a number
        const endYear = row.End ? parseInt(row.End, 10) : 2023; // Default End to 2023 if null or empty

        if (!isNaN(startYear)) {
            for (let year = startYear; year <= endYear; year++) {
                if (!judgeMap.has(year)) {
                    judgeMap.set(year, []);
                }
                judgeMap.get(year).push({
                    name: row.Name.trim(),
                    url: row.Picture.trim(),
                    startYear,
                    endYear,
                });
            }
        }
    });
    return judgeMap;
}
