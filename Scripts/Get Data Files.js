const fs = import('fs');
const path = import('path');

// Function to read all JSON files in a folder
function readJSONFilesInFolder(folderPath) {
    let jsonContents = [];

    // Get all files and directories in the folder
    const items = fs.readdirSync(folderPath);

    items.forEach(item => {
        const itemPath = path.join(folderPath, item);
        const stats = fs.statSync(itemPath);

        if (stats.isDirectory()) {
            // Recursively read JSON files in subdirectory
            jsonContents = jsonContents.concat(readJSONFilesInFolder(itemPath));
        } else if (stats.isFile() && path.extname(item).toLowerCase() === '.json') {
            // Read contents of JSON file
            const fileContent = fs.readFileSync(itemPath, 'utf8');
            jsonContents.push(JSON.parse(fileContent));
        }
    });
    return jsonContents;
}

// Example usage
const folderPath = './Data'; // Path to the folder containing JSON files
const jsonData = readJSONFilesInFolder(folderPath);
module.exports = jsonData;