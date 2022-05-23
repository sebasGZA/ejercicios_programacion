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
        return console.log('You must enter 4 teams')
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
const arrayOrdered = (arrData) => {
    const list = arrData.reduce((accArr, valor) => {
        if (accArr.indexOf(valor) < 0) {
            accArr.push(valor);
        }
        return accArr;
    }, []);

    const ordered = list.sort((a, b) => {
        if (a < b) {
            return -1
        } else {
            return 1
        }
    })

    console.log('=========================')
    console.log('EXERCISE 3')
    console.log('=========================')
    console.log(ordered)
    console.log('=========================')
}

//EXERCISE 4
const periodicNumber = (number) => {
    let init = number
    let periodic = false
    let infoPeriodic
    console.log('========================')
    console.log('EXERCISE4')
    console.log('========================')
    do {
        let binary = number.toString(2)
        console.log(number, 'in binary: ', binary)

        for (let j = 1; j <= binary.length; j++) {

            const subs = binary.substring(0, j)
            const arr = binary.split(subs)
            let newString = ''
            arr.forEach(a => {
                newString = newString + a
            })
            if (newString == '' && (arr.length - 1) > 1) {
                periodic = true
                infoPeriodic = {
                    init,
                    times: arr.length - 1,
                    periodic,
                    number,
                    subs
                }
                console.log(number, 'is periodic')
                break
            }
        }
        number = number + 1
    } while (!periodic)

    console.log(infoPeriodic)
}

//EXERCISE 5
const areaOut = (x1, y1, x2, y2, x3, y3, x4, y4) => {

    console.log('========================')
    console.log('EXERCISE 5')
    console.log('========================')
    const rect1 = {
        left: x1,
        right: x2,
        top: y1,
        bottom: y2,
    }
    const rect2 = {
        left: x3,
        right: x4,
        top: y3,
        bottom: y4,
    }

    x_overlap = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left));
    y_overlap = Math.max(10, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top));
    overlapArea = x_overlap * y_overlap;

    console.table({
        x_overlap,
        y_overlap,
        overlapArea
    })

    console.log('========================')
    console.log('overlapArea: ', overlapArea)
}

//EXERCISE 6
const superPrimeNumber = (number) => {
    let count = 2
    let superPrimerCount = 0
    while (count <= number) {
        let numberString = count.toString()
        let arrNumberLength = numberString.length
        if (!isPrime(count)) {
            count++
            continue
        }

        if (arrNumberLength <= 1) {
            superPrimerCount++
            count++
            continue
        }

        if (isSuperPrime(numberString, arrNumberLength)) {
            superPrimerCount++
        }

        count++
    }

    console.log('=========================')
    console.log('EXERCISE 6')
    console.log('=========================')
    console.log('Total:', superPrimerCount)
}

const isSuperPrime = (numberString, arrNumberLength) => {
    for (let i = 0; i < arrNumberLength; i++) {
        const lastOne = numberString[numberString.length - 1]
        numberString = numberString.substring(0, numberString.length - 1)
        numberString = lastOne + numberString
        const newNumer = parseInt(numberString)
        if (!isPrime(newNumer)) {
            return false
        }

    }

    return true
}

const isPrime = (number) => {
    if (number == 4) return false
    for (let x = 2; x < number / 2; x++) {
        if (number % x == 0) {
            return false
        }
    }
    return true
}

module.exports = {
    sort_csv,
    group,
    arrayOrdered,
    periodicNumber,
    areaOut,
    superPrimeNumber
}