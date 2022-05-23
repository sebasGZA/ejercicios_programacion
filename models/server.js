const express = require('express')
const { sort_csv,
    group,
    arrayOrdered,
    periodicNumber,
    areaOut
} = require('../methods/EXERCISES')
class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.listen()
        //PART1
        //EXERCISE1
        sort_csv(`../files/data.csv`, 1)
        setTimeout(() => {
            //EXERCISE2
            const teams = ['Liverpool', 'MU', 'MC', 'Chelsea']
            group(teams)
        }, 1000);

        //PART2
        //EXERCISE 3
        setTimeout(() => {
            let infoIn = [1, 2, 10, 3, 4, 9, 5, 6, 8, 7, 8, 9, 10]
            arrayOrdered(infoIn)
        }, 1000)

        //EXERCISE 4
        setTimeout(() => {
            const input = 680
            periodicNumber(input)
        }, 1000)

        //EXERCISE 5
        setTimeout(() => {
            areaOut(0, 0, 30, 30, 10, 10, 20, 20)
        }, 1500)

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`)
        })
    }

}

module.exports = Server