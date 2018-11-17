// @flow 

export const CardsRemaining = (props) => {
  return (
    <h3 class="cardsleft">{`${props.cardsLeft} cards in deck`}</h3>
  )
}