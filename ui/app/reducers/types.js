// @flow 

import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';
import {ADD_CARD, ADD_CARD_BATCH, UPDATE_DECK, UPDATE_SETTINGS, HYDRATE_SETTINGS} from '../actions'


export type ColorCode = "R" | "W" | "B" | "U" | "G" | "C"
export type DualColorCode = "(W/U)" | "(W/B)" | "(U/B)" | "(U/R)" | "(B/R)" | "(B/G)" | "(R/G)" | "(R/W)" | "(G/W)" | "(G/B)"
export type Color = "Red" | "White" | "Black" | "Blue" | "Green" | "Colorless"
export type Cost = string | "Y" | "Z" | "X" | ColorCode | DualColorCode

export type Card = {
    name: string,
    set: string,
    colors: Array<?Color>,
    pretty_name: string,
    cost: Array<?Cost>,
    color_identity: Array<ColorCode>,
    card_type: string,
    subtypes: string,
    rarity: string,
    mtga_id: string
}

export type CardList = {
    [mtga_id: string]: Card
}

export type Deck = {
    deck_id: string,
    pool_name: string,
    cards: {
        [mtga_id: string]: {
            mtga_id: string,
            count: number
        }
    }
}

export type DeckList = {
    [deck_id: string]: Deck
}

export type Record = {
    win: {
        total: number,
        [deck_id: string]: number
    },
    loss: {
        total: number,
        [deck_id: string]: number
    },
}

export type counterStateType = {
  +counter: number
};

export type Action = {
    +type: typeof ADD_CARD,
    +card: Card
} | {
    +type: typeof ADD_CARD_BATCH,
    +payload: CardList
} | {
    +type: typeof UPDATE_DECK,
    +deck: Deck
} | {
    +type: typeof UPDATE_SETTINGS,
    +key: string,
    +value: any
} | {
    +type: typeof HYDRATE_SETTINGS,
    +payload: {}
}

export type GetState = () => counterStateType;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
