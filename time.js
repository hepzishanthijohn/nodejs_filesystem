const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Define the folder where text files will be stored
const textFilesFolder = path.join(__dirname, 'text_files');

// Create the text files folder if it doesn't exist
if (!fs.existsSync(textFilesFolder)) {
    fs.mkdirSync(textFilesFolder);
}

// Endpoint to create a text file with current timestamp as content
app.get('/createFile', (req, res) => {
    const currentDate = new Date();
    const fileName = `${currentDate.toISOString().replace(/:/g, '-')}.txt`;
    const filePath = path.join(textFilesFolder, fileName);
    const fileContent = currentDate.toString();

    fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
            console.error('Error creating file:', err);
            res.status(500).send('Error creating file');
        } else {
            console.log('File created successfully:', fileName);
            res.status(200).send('File created successfully');
        }
    });
});

// Endpoint to retrieve all text files in the folder
app.get('/retrieveFiles', (req, res) => {
    fs.readdir(textFilesFolder, (err, files) => {
        if (err) {
            console.error('Error reading folder:', err);
            res.status(500).send('Error reading folder');
        } else {
            const textFiles = files.filter(file => file.endsWith('.txt'));
            res.status(200).json(textFiles);
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
