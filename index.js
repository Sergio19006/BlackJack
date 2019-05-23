var deck = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K'];

function BlackJack() {

    var crupier = [];
    var player = [];
    player = asignCard(player);
    player = asignCard(player);
    crupier = asignCard(crupier);
    crupier = asignCard(crupier);

    var playerScore = 0;
    player.forEach(element => {
        playerScore += calculateScore(element);
    });

    var crupierScore = 0;
    crupier.forEach(element => {
        crupierScore += calculateScore(element);
    });

    var end = false;
    while (1) {
        if (playerScore <= 16) {
            player = asignCard(player);
            playerScore += calculateScore(player[player.length - 1]);
            while (playerScore < 16) {
                asignCard(player);
                playerScore += calculateScore(player[player.length - 1]);
            }
        }
        if (playerScore >= 17 && playerScore < 21) {
            end = compareScore(playerScore, crupierScore);
            crupier = asignCard(crupier);
            crupierScore += calculateScore(crupier[crupier.length - 1]);
            while (crupierScore < 16) {
                asignCard(crupier);
                crupierScore += calculateScore(crupier[crupier.length - 1]);
            }
            end = compareScore(playerScore, crupierScore);
        }
        if (end) {
            console.log("Ganaste");
            showResult(player,crupier,playerScore,crupierScore);
            break;
        }

        if (compareScore(playerScore, crupierScore)) {
            end = true;
            console.log("Ganaste");
            showResult(player,crupier,playerScore,crupierScore);
            break;
        }
        else {
            console.log("Perdiste");
            showResult(player,crupier,playerScore,crupierScore);
            break;
        }
    }
}

function compareScore(playerScore, crupierScore) {

    if (crupierScore > 21) {
        return true;
    }

    if (playerScore == 21)
        return true;

    if (crupierScore == 21) {
        return false;
    }
    if (playerScore > crupierScore && playerScore <= 21)
        return true;

    if (playerScore > 21)
        return false;

}

function asignCard(user) {
    user.push(gerenateCard(user));
    return user;
}

function gerenateCard(score) {
    var deck = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K'];
    var index = Math.floor(Math.random() * 12);
    var card = deck[index];
    return card;
}

function calculateScore(card) {
    let score = 0;
    switch (card) {
        case ("A"):
            if (score > 11)
                score++;
            else
                score += 11;
            break;
        case ("J"):
            score += 10;
            break;
        case ("Q"):
            score += 10;
            break;
        case ("K"):
            score += 10;
            break;
        default:
            score += parseInt(card);
    }
    return score;
}

function showResult(player,crupier,playerScore,crupierScore) {
    console.log("Cartas del Player", player);
    console.log("Cartas del Crupier", crupier);
    console.log("Puntiación player:", playerScore);
    console.log("Puntiación Crupier", crupierScore);
}