const fs = require('fs');

function writeFile(Data){
    const jsonData = JSON.stringify(Data, null, 2);

    fs.writeFile("./Data/"+Data.name+".json", jsonData, (err) => {
        if (err) {
            console.error('Error writing JSON file:', err);
        } else {
            console.log('JSON file created successfully!');
        }
    });
}

function writeCombinedFiles(DataArray){
    fs.mkdir("./Data/"+DataArray[0].name, (err) => {
        if(err) {
            return;
        }
    })
    for(var Data of DataArray){
        const jsonData = JSON.stringify(Data, null, 2);

        fs.writeFile("./Data/"+DataArray[0].name+"/"+Data.name+".json", jsonData, (err) => {
            if (err) {
                console.error('Couldnt Write Save:', err);
            } else {
                console.log('Saved Data');
            }
        });
    }
}
module.exports = { writeFile, writeCombinedFiles };