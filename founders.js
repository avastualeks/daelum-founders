const fs = require('fs');
const readLine = require('readline');

const FILE_NAME = 'founders.txt';

// read file
const nameFoundInFile = async (fileName, name) => {
    const fStream = fs.createReadStream(fileName);

    const reader = readLine.createInterface({
        input: fStream,
    });

    for await (const line of reader) {
        if (line === name) return true;
    }

    return false;
};

// parse result
const getResult = async (fileName, name) => {
    if (!name) throw new Error('Missing name parameter');

    const nameInFile = await nameFoundInFile(fileName, name);

    if (nameInFile) console.log(`${name} found in file`);
    else console.log(`${name} NOT found in file`);
}

// get name env variable, ignore the rest
const [ _node, _file, name, ..._ ] = process.argv;

getResult(FILE_NAME, name);
