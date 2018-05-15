const express = require('express');
const randomItem = require('random-item');
const choice = require('./choice.json');
const app = express();

function getWinner(userChoice, computerChoice) {
    if (userChoice.winOver.includes(computerChoice.id)) {
        return userChoice;
    }

    if (computerChoice.winOver.includes(userChoice.id)) {
        return computerChoice;
    }

    return null;
}

app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { choice });
});

app.get('/play/:choice', (req, res) => {
    const userChoice = choice.find((choice) => {
        return choice.id === req.params.choice;
    });
    const computerChoice = randomItem(choice);
    const winner = getWinner(userChoice, computerChoice);

    let winnerName;
    if (winner === userChoice) {
        winnerName = 'user';
    } else if (winner === computerChoice) {
        winnerName = 'computer';
    }

    res.render('play', { userChoice, computerChoice, winner, winnerName });
});

app.listen(3000);