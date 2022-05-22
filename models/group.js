class Group {
    matches = []
    newTable = []

    get getMatches() {
        return this.matches
    }

    constructor(arrTeams) {
        this.arrTeams = arrTeams
    }

    match(team1, score1, team2, score2) {
        if (!team1 || typeof team1 != 'string' || !team2 || typeof team2 != 'string') {
            return console.log('team1 and team2 must be string')
        }

        if (!this.arrTeams.includes(team1) || !this.arrTeams.includes(team2)) {
            return console.log('team1 or team2 do not exist in this group')
        }

        if (typeof score1 != 'number' || typeof score2 != 'number') {
            return console.log('score1 and score2 must be number')
        }

        const match = {
            team1,
            score1,
            team2,
            score2
        }

        if (this.matches.length === 0) {
            this.matches.push(match)
        } else {
            const existMatch = this.matches.find(m =>
                (m.team1 == match.team1 && m.team2 == match.team2)
                ||
                (m.team1 == match.team2 && m.team2 == match.team1)
            )

            if (!existMatch) {
                this.matches.push(match)
            }
        }


    }

    result() {
        for (let j = 0; j < this.matches.length; j++) {
            if (this.matches[j].score1 > this.matches[j].score2) {
                //win
                this.ruler(
                    this.matches[j].team1,
                    this.matches[j].score1,
                    this.matches[j].score2,
                    'win'
                )

                //lose
                this.ruler(
                    this.matches[j].team2,
                    this.matches[j].score2,
                    this.matches[j].score1,
                    'lose'
                )

            } else if (this.matches[j].score1 === this.matches[j].score2) {
                //draw
                this.ruler(
                    this.matches[j].team1,
                    this.matches[j].score1,
                    this.matches[j].score2,
                    'draw'
                )

                //draw
                this.ruler(
                    this.matches[j].team2,
                    this.matches[j].score2,
                    this.matches[j].score1,
                    'draw'
                )
            } else {
                //lose
                this.ruler(
                    this.matches[j].team1,
                    this.matches[j].score1,
                    this.matches[j].score2,
                    'lose'
                )

                //win
                this.ruler(
                    this.matches[j].team2,
                    this.matches[j].score2,
                    this.matches[j].score1,
                    'win'
                )
            }
        }

        this.orderResults()
    }

    ruler(team, myScore, score2, type) {
        const index = this.newTable.findIndex(t => t.team === team)
        switch (type) {
            case 'win':
                if (index == -1) {
                    this.newTable.push({
                        team: team,
                        win: 1,
                        draw: 0,
                        lose: 0,
                        GF: myScore,
                        GC: score2,
                        GD: myScore - score2,
                        points: 3
                    })
                } else {
                    const oldData = this.newTable[index]
                    const newData = {
                        ...oldData,
                        win: oldData.win + 1,
                        GF: oldData.GF + myScore,
                        GC: oldData.GC + score2,
                        GD: (oldData.GF + myScore) - (oldData.GC + score2),
                        points: oldData.points + 3
                    }
                    this.newTable[index] = newData
                }
                break;
            case 'draw':
                if (index == -1) {
                    this.newTable.push({
                        team: team,
                        win: 0,
                        draw: 1,
                        lose: 0,
                        GF: myScore,
                        GC: score2,
                        GD: myScore - score2,
                        points: 1
                    })
                } else {
                    const oldData = this.newTable[index]
                    const newData = {
                        ...oldData,
                        draw: oldData.draw + 1,
                        GF: oldData.GF + myScore,
                        GC: oldData.GC + score2,
                        GD: (oldData.GF + myScore) - (oldData.GC + score2),
                        points: oldData.points + 1

                    }
                    this.newTable[index] = newData
                }
                break;

            case 'lose':

                if (index == -1) {
                    this.newTable.push({
                        team: team,
                        win: 0,
                        draw: 0,
                        lose: 1,
                        GF: myScore,
                        GC: score2,
                        GD: myScore - score2,
                        points: 0
                    })
                } else {
                    const oldData = this.newTable[index]
                    const newData = {
                        ...oldData,
                        lose: oldData.lose + 1,
                        GF: oldData.GF + myScore,
                        GC: oldData.GC + score2,
                        GD: (oldData.GF + myScore) - (oldData.GC + score2),
                    }
                    this.newTable[index] = newData
                }
                break
        }

    }

    orderResults() {
        this.newTable = this.newTable.sort((m, a) => {
            if (m.points < a.points) {
                return 1;
            }
            if (m.points == a.points) {
                if (m.GD > a.GD) {
                    return -1;
                } else if (m.GD == a.GD) {
                    return m.GF >= a.GF ? -1 : 1
                } else {
                    return 1;
                }
            } else {

                return -1;
            }
        })

        console.log('=====================')
        console.log('EXERCISE2')
        console.log('=====================')
        console.table(this.newTable)
        console.log('=====================')
        console.log(this.newTable.map(m => m.team))
        console.log('=====================')
    }

}

module.exports = Group