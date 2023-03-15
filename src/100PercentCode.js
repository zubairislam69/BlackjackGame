import React, { useState } from 'react'

import "./Blackjack.css"

function Blackjack() {

    const [playerCards, setPlayerCards] = useState([])
    const [playerSum, setPlayerSum] = useState(0)

    const [dealerCards, setDealerCards] = useState([])
    const [dealerSum, setDealerSum] = useState(0)

    const [cardsSplit, setCardsSplit] = useState([])
    const [cardsSplit2, setCardsSplit2] = useState([])

    const [splitSum, setSplitSum] = useState(0)
    const [splitSum2, setSplitSum2] = useState(0)

    let winBet = false

    const [startBtn, setStartBtn] = useState(false)
    const [standBtn, setStandBtn] = useState(false)
    const [standSplitBtn, setStandSplitBtn] = useState(false)
    const [splitBtn, setSplitBtn] = useState(false)
    const [splitBtn2, setSplitBtn2] = useState(true)

    const [flippedCard, setFlippedCard] = useState(false)
    const [bet, setBet] = useState(0)

    const [balance, setBalance] = useState(1000)

    let newCard

    function getNewCard() {
        let allCards = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"]
        let randomNumber = (Math.floor(Math.random() * 13))
        // return 10
        return allCards[randomNumber]
    }

    function cardConditions(card, setFunc) {
        if (card === "J" || card === "Q" || card === "K") {
            setFunc(prevState => prevState += 10)
        }
        else if (card === "A") {
            setFunc(prevState => prevState += 11)
        }
        else setFunc(prevState => prevState += card)

    }

    function startGame() {

        if (bet != 0) {
            let firstCard = getNewCard()
            let secondCard = getNewCard()
            let dealerCard = getNewCard()

            setStartBtn(true)

            for (let i = 0; i < 1; i++) {
                setTimeout(function () {
                    setPlayerCards(prevState => [...prevState, firstCard])
                    cardConditions(firstCard, setPlayerSum)
                }, 100)

                setTimeout(function () {
                    setDealerCards(prevState => prevState.concat(dealerCard))
                    cardConditions(dealerCard, setDealerSum)
                }, 500)

                setTimeout(function () {
                    setPlayerCards(prevState => prevState.concat(secondCard))
                    cardConditions(secondCard, setPlayerSum)
                }, 1000)

                setTimeout(function () {
                    setFlippedCard(true)
                }, 1500)
            }

            setBalance(prevState => prevState - bet)

            setCardsSplit(prevState => [...prevState, firstCard])
            setCardsSplit2(prevState => [...prevState, secondCard])

            cardConditions(firstCard, setSplitSum)
            cardConditions(secondCard, setSplitSum2)

        }
        else alert("Please place a bet")

    }

    // Figure out how to set up Ace as 1 or 11

    // if player sum + ace > 21, set ace = 1
    // else if player sum + ace < 21, set ace = 11

    function hitGame() {

        newCard = getNewCard()
        let newDealerCard = getNewCard()

        let trackPlayerSum = playerSum

        if (trackPlayerSum < 21) {

            setPlayerCards(prevState => [...prevState, newCard])

            if (newCard === "J" || newCard === "Q" || newCard === "K") {
                setPlayerSum(prevState => prevState += 10)
                trackPlayerSum += 10
            }
            else if (newCard === "A") {
                setPlayerSum(prevState => prevState += 11)
                trackPlayerSum += 11
            }
            else {
                setPlayerSum(prevState => prevState += newCard)
                trackPlayerSum += newCard
            }

            if (trackPlayerSum >= 22) {
                setFlippedCard(false)

                setTimeout(function () {
                    setDealerCards(prevState => [...prevState, newDealerCard])
                    cardConditions(newDealerCard, setDealerSum)
                }, 300)
            }
        }
    }

    function hitSplit1() {
        let newSplitCard = getNewCard()
        let trackSplitSum = splitSum

        if (trackSplitSum < 21) {
            setCardsSplit(prevState => [...prevState, newSplitCard])
            cardConditions(newSplitCard, setSplitSum)
            trackSplitSum += newSplitCard

            if (trackSplitSum > 22) {
                setStandSplitBtn(true)
            }

            else if (trackSplitSum === 21) {
                setStandSplitBtn(true)
            }
        }
    }

    function hitSplit2() {

        let newSplitCard2 = getNewCard()

        let trackSplitSum2 = splitSum2

        if (trackSplitSum2 < 21) {
            setCardsSplit2(prevState => [...prevState, newSplitCard2])
            cardConditions(newSplitCard2, setSplitSum2)
            trackSplitSum2 += newSplitCard2
            if (trackSplitSum2 > 22 || trackSplitSum2 === 21) {
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

        newCard = getNewCard()

        setFlippedCard(false)
        setStandBtn(true)

        let trackDealerSum = dealerSum

        for (let i = 0; i < 6; i++) {
            setTimeout(function () {
                if (trackDealerSum < 17) {
                    newCard = getNewCard()
                    setDealerCards(prevState => [...prevState, newCard])

                    if (newCard === "J" || newCard === "Q" || newCard === "K") {
                        setDealerSum(prevState => prevState += 10)
                        trackDealerSum += 10
                    }
                    else if (newCard === "A") {
                        setDealerSum(prevState => prevState += 11)
                        trackDealerSum += 11
                    }
                    else {
                        setDealerSum(prevState => prevState += newCard)
                        trackDealerSum += newCard
                    }
                }
                else return
            }, 500 * i)
        }
    }

    function splitCards() {
        setSplitBtn(true)
        setSplitBtn2(false)

        newCard = getNewCard()

        let newSplitCard = getNewCard()
        let newSplitCard2 = getNewCard()

        setTimeout(function () {
            setCardsSplit(prevState => [...prevState, newSplitCard])
            cardConditions(newSplitCard, setSplitSum)
        }, 500)

        setTimeout(function () {
            setCardsSplit2(prevState => [...prevState, newSplitCard2])
            cardConditions(newSplitCard2, setSplitSum2)
        }, 1000)
    }

    function restartGame() {

        if (winBet) {
            setBalance(prevState => prevState + (bet * 2))
        }

        winBet = false

        setPlayerCards([])
        setPlayerSum(0)
        setDealerCards([])
        setDealerSum(0)

        setStandBtn(false)
        setFlippedCard(false)
        setCardsSplit([])
        setCardsSplit2([])
        setSplitSum(0)
        setSplitSum2(0)
        setSplitBtn(false)
        setSplitBtn2(true)

        setStandSplitBtn(false)

        startGame()
    }

    const showPlayerCards = playerCards.map(item => {
        return <p className="cards--dealed"> {item} </p>
    })

    const showSplitCards = cardsSplit.map(item => {
        return <p className="cards--split"> {item} </p>
    })

    const showSplitCards2 = cardsSplit2.map(item => {
        return <p className="cards--split2"> {item} </p>
    })

    const showDealerCards = dealerCards.map(item => {
        return <p className="cards--dealed"> {item} </p>
    })

    const showPlayAgainBtn = ((dealerSum > 21 && dealerSum > playerSum) ||
        (dealerSum >= 17 && dealerSum <= 21 && dealerSum > playerSum) ||
        (dealerSum >= 17 && playerSum > dealerSum && playerSum <= 21) ||
        (playerSum > 21) || (dealerSum >= 17 && dealerSum === playerSum) ||
        (playerSum === 21))

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

        if (dealerSum > 21 && dealerSum > playerSum) {
            return messageWin
        }

        else if (dealerSum >= 17 && playerSum > dealerSum && playerSum <= 21) {
            return messageWin
        }
        else if (playerSum === 21) {
            return messageWin
        }
    }

    function dealerRules() {
        if (dealerSum >= 17 && dealerSum <= 21 && dealerSum > playerSum) {
            return messageLose
        }
        else if (playerSum > 21) {
            return messageLose
        }
    }

    const handleInput = event => {
        setBet(event.target.value)
    }

    const splitRules =
        (playerCards[0] === "J" && playerCards[1] === "Q") ||
        (playerCards[0] === "Q" && playerCards[1] === "J") ||
        (playerCards[0] === "J" && playerCards[1] === "K") ||
        (playerCards[0] === "K" && playerCards[1] === "J") ||
        (playerCards[0] === "J" && playerCards[1] === 10) ||
        (playerCards[0] === 10 && playerCards[1] === "J") ||
        (playerCards[0] === "Q" && playerCards[1] === 10) ||
        (playerCards[0] === 10 && playerCards[1] === "Q") ||
        (playerCards[0] === "K" && playerCards[1] === 10) ||
        (playerCards[0] === 10 && playerCards[1] === "K") ||
        (playerCards[0] === "Q" && playerCards[1] === "K") ||
        (playerCards[0] === "K" && playerCards[1] === "Q") ||
        (playerCards[0] === playerCards[1])

    return (
        <>
            <h3 className="game--name"> Blackjack </h3>
            <p> Balance:
                {
                    (standBtn && playerRules()) || playerSum === 21 ?
                        balance + (bet * 2) : balance
                }

                { // SET this up for split bets
                /* {
                    (standBtn && playerRules()) || playerSum === 21 ?
                        (balance + (bet * 2)) : balance
                } */}

            </p>

            {!startBtn &&
                <>
                    <label for="fname"> Place bet:  </label>
                    <input onChange={handleInput} type="text" id="fname" />
                </>
            }

            {startBtn &&
                <p className="dealer--cards">
                    Dealer {showDealerCards}
                </p>
            }

            {flippedCard &&
                <p className="dealer--card--flipped" > ? </p>
            }

            {startBtn &&
                <>
                    <p className="sum"> {dealerSum}  </p>

                    <p className="player--cards">
                        {!splitBtn && "Player"} {!splitBtn && showPlayerCards}
                    </p>

                    <p className="split--cards">
                        {splitBtn && "Player"} {splitBtn && showSplitCards}
                    </p>

                    <p className="split--cards2">
                        {splitBtn && showSplitCards2}
                    </p>
                </>
            }

            {!splitBtn && startBtn &&
                <p className="sum"> {playerSum}  </p>
            }

            {splitBtn && startBtn &&
                <>
                    <p className="split--sum"> {splitSum}  </p>
                    <p className="split--sum2"> {splitSum2}  </p>
                </>
            }

            {!startBtn &&
                <button onClick={startGame}> Start Game </button>
            }

            {!splitBtn && <p> {rules(dealerSum, playerSum)} </p>}

            {splitBtn &&
                <>
                    <p className="split-rules"> {rules(dealerSum, splitSum)} </p>
                    <p className="split-rules2"> {rules(dealerSum, splitSum2)} </p>
                </>
            }

            {!splitBtn && !showPlayAgainBtn && startBtn && !standBtn &&
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

            {!standSplitBtn && splitBtn && !showPlayAgainBtn && startBtn && !standBtn &&
                <>
                    <button
                        onClick={hitSplit1}
                        className="hit--button" > Hit
                    </button>

                    <button
                        onClick={() => setStandSplitBtn(true)}
                        className="stand--button"> Stand
                    </button>
                </>
            }

            {standSplitBtn && splitBtn && !showPlayAgainBtn && startBtn && !standBtn &&
                <>
                    <button
                        onClick={hitSplit2}
                        className="hit--split--button" > Hit
                    </button>

                    <button
                        onClick={standGame}
                        className="stand--button"> Stand
                    </button>
                </>
            }

            {splitBtn2 && splitRules && startBtn &&
                <button onClick={splitCards}> Split </button>
            }

            {showPlayAgainBtn &&
                <button onClick={restartGame}> Play Again </button>
            }

        </>
    )
}

export default Blackjack