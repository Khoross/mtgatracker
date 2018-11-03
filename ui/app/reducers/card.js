import {ADD_CARD, ADD_CARD_BATCH} from '../actions'

export default function cardReducer(state: CardList = {}, action: Action) {
    switch(action.type) {
        case ADD_CARD_BATCH:
            let newCards = ((Object.values(action.payload): any): Array<Card>).filter(card=>!(card.mtga_id in state))
            if(newCards.length === 0) {
                return state
            }
            newCards = newCards.reduce((acc, cur) => {
                let tempCard = Object.assign({}, cur)
                delete tempCard.count_in_deck
                acc[cur.mtga_id] = tempCard
                return acc
            }, {})
            return Object.assign({}, state, newCards)
        case ADD_CARD:
            if(action.card.mtga_id in state) {
                return state
            }
            let newCard = Object.assign({}, action.card)
            delete newCard.count_in_deck
            return Object.assign({}, state, {[action.card.mtga_id]: newCard})
        default:
            return state
    }
}

const msg = (props) => {
    return(
    <div>
        <span>
        {
            props.link ?
                <a href={props.link}>{props.message}</a> :
                props.message
        }
        </span>
        <span onClick={props.dismiss}>
        {
            props.important ? "!!" : "X"
        }
        </span>
        {
            props.count ?
                <span>{props.count}</span> :
                null
        }
    </div>
    )
}