let arr = []
for(let i = 1; i < 10000; i++) {
    arr.push({
            explorerId: `explorerId${i}`,
            disordId: `discordId${i}`,
            email: `email${i}`,
            internName: `name${i}`,
            internSurname: `internSurname${i}`,
        })
}

module.exports = arr