const fs = require('fs')
const path = require('path')

//Ejercicio 1
const sort_csv = (filePath, column) => {
    const pathFile = path.join(__dirname, filePath)
    fs.readFile(pathFile, 'utf-8', (err, data) => {

        let dataArray = data.split(/\r?\n/);
        let newdata = []
        let aux
        dataArray.forEach((d) => {
            const arr = d.split(',')
            const value = arr[column]
            if (column == 1 || column == 2) {
                if (!aux || value < aux) {
                    aux = value
                    newdata.unshift(d)
                } else {
                    newdata.push(d)
                }
            } else {
                newdata.push(d)
            }
        });

        console.log('========================')
        console.log('EXERCISE1')
        console.log('========================')
        newdata.forEach(d => console.log(d))
        console.log('========================')
    })
}

module.exports = {
    sort_csv
}