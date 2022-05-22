const express = require('express')
const { sort_csv, group } = require('../methods/EXERCISES')
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
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`)
        })
    }



}

module.exports = Server