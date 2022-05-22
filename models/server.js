const express = require('express')
const { sort_csv } = require('../methods/sort_csv')
const Group = require('./group')

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
            this.group(teams)
        }, 1000);
        
        //PART2
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`)
        })
    }

    group(arrTeam) {
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

}

module.exports = Server