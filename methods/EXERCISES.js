const fs = require('fs')
const path = require('path')
const Group = require('../models/group')

//EXERCISE 1
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

//EXERCISE 2
const group = (arrTeam) => {
    if (!arrTeam || arrTeam.length !== 4) {
        return console.log('Debe de ingresar 4 equipos')
    }

    const group = new Group(arrTeam)

    for (let i = 0; i < arrTeam.length; i++) {
        for (let j = 0; j < arrTeam.length; j++) {
            if (arrTeam[i] !== arrTeam[j]) {
                const score1 = Math.round(Math.random() * 10)
                const score2 = Math.round(Math.random() * 10)
                group.match(arrTeam[i], score1, arrTeam[j], score2)
            }
        }
    }
    group.result()
}

//EXERCISE 3

module.exports = {
    sort_csv,
    group,

}