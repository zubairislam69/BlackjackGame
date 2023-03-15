import React, { useState } from 'react'

import "./Blackjack.css"

function Blackjack2() {


    //ISSUE: 
    // When stand is clicked, and dealer deals an Ace, it stops dealing

    const [player, setPlayer] = useState({
        cards: [],
        sum: 0
    })

    const [dealer, setDealer] = useState({
        cards: [],
        sum: 0
    })

    const [split, setSplit] = useState({
        hand1: [],
        sum1: 0,

        hand2: [],
        sum2: 0
    })


    const [buttons, setButtons] = useState({
        startBtn: false,
        standBtn: false,
        standSplitBtn: false,
        splitBtn: false,
        splitBtn2: true,
    })

    const [flippedCard, setFlippedCard] = useState(false)
    const [bet, setBet] = useState(0)

    const [balance, setBalance] = useState(1000)

    let newCard
    let winBet = false

    function getNewCard() {
        let allCards = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"]
        let randomNumber = (Math.floor(Math.random() * 13))
        // return 10
        return allCards[randomNumber]
    }

    function cardConditions(card, sum) {
        if (card === "J" || card === "Q" || card === "K") return 10

        else if (card === "A") {
            if (sum + 11 < 21) return 11

            else if (sum + 11 > 21) return 1

            else return 11
        }
        else return card
    }

    function startGame() {
        if (bet != 0) {
            let firstCard = getNewCard()
            let secondCard = getNewCard()
            let dealerCard = getNewCard()

            setButtons(prevState => ({
                ...prevState,
                startBtn: true
            }))

            setTimeout(function () {
                setPlayer(prevState => ({
                    cards: [...prevState.cards, firstCard],
                    sum: prevState.sum + cardConditions(firstCard, prevState.sum)
                }))
            }, 100)

            setTimeout(function () {
                setDealer(prevState => ({
                    cards: [...prevState.cards, dealerCard],
                    sum: prevState.sum + cardConditions(dealerCard, prevState.sum)
                }))
            }, 500)

            setTimeout(function () {
                setPlayer(prevState => ({
                    cards: [...prevState.cards, secondCard],
                    sum: prevState.sum + cardConditions(secondCard, prevState.sum)
                }))
            }, 1000)

            setTimeout(function () {
                setFlippedCard(true)
            }, 1500)

            setBalance(prevState => prevState - bet)

            setSplit(prevState => ({
                hand1: [...prevState.hand1, firstCard],
                sum1: prevState.sum1 + cardConditions(firstCard, prevState.sum1),

                hand2: [...prevState.hand2, secondCard],
                sum2: prevState.sum2 + cardConditions(secondCard, prevState.sum2)
            }))


        }
        else alert("Please place a bet")

    }

    // Figure out how to set up Ace as 1 or 11

    // if player sum + ace > 21, set ace = 1
    // else if player sum + ace < 21, set ace = 11



    function hitGame() {

        newCard = getNewCard()
        let newNew
        let newDealerCard = getNewCard()

        let trackPlayerSum = player.sum

        if (trackPlayerSum < 21) {

            setPlayer(prevState => ({
                cards: [...prevState.cards, newCard],
                sum: prevState.sum + cardConditions(newCard, prevState.sum)
                // sum: (prevState.sum + newCard > 21 &&
                //     prevState.cards.includes("A") ?

                //     prevState.sum + cardConditions(newCard, prevState.sum))

            }))


            trackPlayerSum += cardConditions(newCard, player.sum)

            if (trackPlayerSum >= 22) {
                setFlippedCard(false)

                setTimeout(function () {
                    setDealer(prevState => ({
                        cards: [...prevState.cards, newDealerCard],
                        sum: prevState.sum + cardConditions(newDealerCard, prevState.sum)
                    }))
                }, 300)
            }
        }
    }

    function hitSplitLeft() {
        let newCard = getNewCard()
        let trackSplitSum = split.sum1

        if (trackSplitSum < 21) {

            setSplit(prevState => ({
                ...prevState,
                hand1: [...prevState.hand1, newCard],
                sum1: prevState.sum1 + cardConditions(newCard, prevState.sum1)
            }))

            trackSplitSum += newCard

            if (trackSplitSum >= 21) {
                setButtons(prevState => ({
                    ...prevState,
                    standSplitBtn: true
                }))
            }
        }
    }

    function hitSplitRight() {

        let newCard = getNewCard()

        let trackSplitSum2 = split.sum2

        if (trackSplitSum2 < 21) {

            setSplit(prevState => ({
                ...prevState,
                hand2: [...prevState.hand2, newCard],
                sum2: prevState.sum2 + cardConditions(newCard, prevState.sum2)
            }))


            trackSplitSum2 += newCard
            if (trackSplitSum2 >= 21) {
                standGame()
            }
        }
    }

    // const playerWin = ((dealerSum > 21 && dealerSum > playerSum) ||
    //     (dealerSum >= 17 && playerSum > dealerSum && playerSum <= 21) ||
    //     (playerSum === 21))

    // const dealerWin = ((dealerSum >= 17 && dealerSum <= 21 && dealerSum > playerSum) ||
    //     (playerSum > 21))

    function standGame() {

        setButtons(prevState => ({
            ...prevState,
            splitBtn2: false,
            standBtn: true

        }))

        newCard = getNewCard()

        setFlippedCard(false)

        let trackDealerSum = dealer.sum

        for (let i = 0; i < 6; i++) {
            setTimeout(function () {
                if (trackDealerSum < 17) {
                    newCard = getNewCard()

                    setDealer(prevState => ({
                        cards: [...prevState.cards, newCard],
                        sum: prevState.sum + cardConditions(newCard, prevState.sum)
                    }))

                    trackDealerSum += cardConditions(newCard, trackDealerSum)

                }
                else return
            }, 500 * i)

        }
    }

    function splitCards() {

        setButtons(prevState => ({
            ...prevState,
            splitBtn: true,
            splitBtn2: false
        }))

        newCard = getNewCard()

        let newSplitCard = getNewCard()
        let newSplitCard2 = getNewCard()

        setTimeout(function () {

            setSplit(prevState => ({
                ...prevState,
                hand1: [...prevState.hand1, newSplitCard],
                sum1: prevState.sum1 + cardConditions(newSplitCard, prevState.sum1)
            }))

        }, 500)

        setTimeout(function () {

            setSplit(prevState => ({
                ...prevState,
                hand2: [...prevState.hand2, newSplitCard2],
                sum2: prevState.sum2 + cardConditions(newSplitCard2, prevState.sum2)
            }))

        }, 1000)
    }

    function restartGame() {

        if (winBet) {
            setBalance(prevState => prevState + (bet * 2))
        }

        winBet = false

        setPlayer({
            sum: 0,
            cards: []
        })

        setDealer({
            sum: 0,
            cards: []
        })


        setSplit({
            hand1: [],
            sum1: 0,

            hand2: [],
            sum2: 0
        })

        setFlippedCard(false)

        setButtons(prevState => ({
            ...prevState,
            standBtn: false,
            splitBtn: false,
            splitBtn2: true,
            standSplitBtn: false
        }))
        console.clear()

        startGame()
    }

    const showPlayerCards = player.cards.map(item => {
        return <p className="cards--dealed"> {item} </p>
    })

    const showSplitCards = split.hand1.map(item => {
        return <p className="cards--split"> {item} </p>
    })

    const showSplitCards2 = split.hand2.map(item => {
        return <p className="cards--split2"> {item} </p>
    })

    const showDealerCards = dealer.cards.map(item => {
        return <p className="cards--dealed"> {item} </p>
    })

    const showPlayAgainBtn = ((dealer.sum > 21 && dealer.sum > player.sum) ||
        (dealer.sum >= 17 && dealer.sum <= 21 && dealer.sum > player.sum) ||
        (dealer.sum >= 17 && player.sum > dealer.sum && player.sum <= 21) ||
        (player.sum > 21) || (dealer.sum >= 17 && dealer.sum === player.sum) ||
        (player.sum === 21))


    let messageWin = "You Win"
    let messageLose = "Dealer Wins"

    function rules(dealerSum, sum) {

        if (dealerSum > 21 && dealerSum > sum) {
            winBet = true
            return messageWin
        }
        else if (dealerSum >= 17 && sum > dealerSum && sum <= 21) {
            winBet = true
            return messageWin
        }
        else if (sum === 21) {
            winBet = true
            return messageWin
        }
        else if (dealerSum >= 17 && dealerSum <= 21 && dealerSum > sum) {
            return messageLose
        }
        else if (sum > 21) {
            return messageLose
        }
        else if (dealerSum >= 17 && dealerSum === sum) {
            return "Push"
        }
    }

    function playerRules() {

        if (dealer.sum > 21 && dealer.sum > player.sum) {
            return messageWin
        }

        else if (dealer.sum >= 17 && player.sum > dealer.sum && player.sum <= 21) {
            return messageWin
        }
        else if (player.sum === 21) {
            return messageWin
        }
    }

    function dealerRules() {
        if (dealer.sum >= 17 && dealer.sum <= 21 && dealer.sum > player.sum) {
            return messageLose
        }
        else if (player.sum > 21) {
            return messageLose
        }
    }

    const handleInput = event => {
        setBet(event.target.value)
    }

    const splitRules =
        (player.cards[0] === "J" && player.cards[1] === "Q") ||
        (player.cards[0] === "Q" && player.cards[1] === "J") ||
        (player.cards[0] === "J" && player.cards[1] === "K") ||
        (player.cards[0] === "K" && player.cards[1] === "J") ||
        (player.cards[0] === "J" && player.cards[1] === 10) ||
        (player.cards[0] === 10 && player.cards[1] === "J") ||
        (player.cards[0] === "Q" && player.cards[1] === 10) ||
        (player.cards[0] === 10 && player.cards[1] === "Q") ||
        (player.cards[0] === "K" && player.cards[1] === 10) ||
        (player.cards[0] === 10 && player.cards[1] === "K") ||
        (player.cards[0] === "Q" && player.cards[1] === "K") ||
        (player.cards[0] === "K" && player.cards[1] === "Q") ||
        (player.cards[0] === player.cards[1])

    return (
        <>
            <h3 className="game--name"> Blackjack </h3>
            <p> Balance:
                {
                    (buttons.standBtn && playerRules()) || player.sum === 21 ?
                        balance + (bet * 2) : balance
                }

                { // SET this up for split bets
                /* {
                    (standBtn && playerRules()) || playerSum === 21 ?
                        (balance + (bet * 2)) : balance
                } */}

            </p>

            {!buttons.startBtn &&
                <>
                    <label for="fname"> Place bet:  </label>
                    <input onChange={handleInput} type="text" id="fname" />
                </>
            }

            {buttons.startBtn &&
                <p className="dealer--cards">
                    Dealer {showDealerCards}
                </p>
            }

            {flippedCard &&
                <p className="dealer--card--flipped" > ? </p>
            }

            {buttons.startBtn &&
                <>
                    <p className="sum"> {dealer.sum}  </p>

                    <p className="player--cards">
                        {!buttons.splitBtn && "Player"} {!buttons.splitBtn && showPlayerCards}
                    </p>

                    <p className="split--cards">
                        {buttons.splitBtn && "Player"} {buttons.splitBtn && showSplitCards}
                    </p>

                    <p className="split--cards2">
                        {buttons.splitBtn && showSplitCards2}
                    </p>
                </>
            }

            {!buttons.splitBtn && buttons.startBtn &&
                <p className="sum"> {player.sum}  </p>
            }

            {buttons.splitBtn && buttons.startBtn &&
                <>
                    <p className="split--sum"> {split.sum1}  </p>
                    <p className="split--sum2"> {split.sum2}  </p>
                </>
            }

            {!buttons.startBtn &&
                <button onClick={startGame}> Start Game </button>
            }

            {!buttons.splitBtn && <p> {rules(dealer.sum, player.sum)} </p>}

            {buttons.splitBtn &&
                <>
                    <p className="split-rules"> {rules(dealer.sum, split.sum1)} </p>
                    <p className="split-rules2"> {rules(dealer.sum, split.sum2)} </p>
                </>
            }

            {!buttons.splitBtn && !showPlayAgainBtn && buttons.startBtn && !buttons.standBtn &&
                <>
                    <button
                        onClick={hitGame}
                        className="hit--button" > Hit
                    </button>

                    <button
                        onClick={standGame}
                        className="stand--button"> Stand
                    </button>
                </>
            }

            {!buttons.standSplitBtn && buttons.splitBtn && !showPlayAgainBtn && buttons.startBtn && !buttons.standBtn &&
                <>
                    <button
                        onClick={hitSplitLeft}
                        className="hit--button" > Hit
                    </button>

                    <button
                        onClick={() =>
                            setButtons(prevState => ({
                                ...prevState,
                                standSplitBtn: true
                            }))
                        }
                        className="stand--button"> Stand
                    </button>
                </>
            }

            {buttons.standSplitBtn && buttons.splitBtn && !showPlayAgainBtn && buttons.startBtn && !buttons.standBtn &&
                <>
                    <button
                        onClick={hitSplitRight}
                        className="hit--split--button" > Hit
                    </button>

                    <button
                        onClick={standGame}
                        className="stand--button"> Stand
                    </button>
                </>
            }

            {buttons.splitBtn2 && splitRules && buttons.startBtn &&
                <button onClick={splitCards}> Split </button>
            }

            {showPlayAgainBtn &&
                <button onClick={restartGame}> Play Again </button>
            }



        </>
    )
}

export default Blackjack2