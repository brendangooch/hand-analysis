/**
 * used by concrete hand classes to analyse an array of playing card objects of variable length
 */

import { type tPlayingCardType, PlayingCard } from '@brendangooch/playing-card';

export class HandAnalysis {

    private cards: PlayingCard[] = [];

    public update(cards: PlayingCard[]): void {
        this.cards = cards.map(card => card.clone());
    }

    public updateTypes(types: tPlayingCardType[]): void {
        this.cards = types.map(type => new PlayingCard(type));
    }

    public get unordered(): PlayingCard[] {
        return this.cards.map(card => card.clone());
    }

    public get ordered(): PlayingCard[] {
        return this.unordered.sort((a, b) => (a.isHigherThan(b) ? 1 : -1));
    }

    public get numJokers(): number {
        return this.cards.filter(card => card.isJoker).length;
    }

    // return array containing index position of each card that is not a joker
    public get nonJokers(): number[] {
        return this.cards.map((card, index) => (card.isJoker) ? -1 : index).filter(index => index !== -1);
    }

    // return a new card, and it's index position in the hand, with the same rank as the card in the hand with the highest rank
    public get highCard(): { index: number; card: PlayingCard } {
        return {
            index: this.highCardIndex,
            card: new PlayingCard(<tPlayingCardType>this.highCardRank)
        };
    }

    // return a new card 1 rank higher than the card in the hand with the highest rank
    public get highCardPlusOne(): PlayingCard {
        return new PlayingCard(<tPlayingCardType>(this.highCardRank + 1)); // ?? 
    }

    // return a new card with the same rank as the card in the hand with the lowest rank
    public get lowCard(): { index: number; card: PlayingCard } {
        return {
            index: this.lowCardIndex,
            card: new PlayingCard(<tPlayingCardType>this.lowCardRank)
        };
    }

    // number of cards in hand
    public get size(): number {
        return this.cards.length;
    }

    // a clone of the card at index or null if no card at that index
    public cardAt(index: number): PlayingCard | null {
        const card = this.cards[index];
        return (card) ? card.clone() : null;
    }

    // returns number of cards in hand with rank number
    public containsRank(rank: number): number {
        return this.cards.filter(card => card.isRankNumber(rank)).length;
    }

    // true if hand contains ALL of the rank numbers in ranks parameter
    public containsRanks(ranks: number[]): boolean {
        for (let i = 0; i < ranks.length; i++) {
            if (this.containsRank(ranks[i]) === 0) return false;
        }
        return true;
    }

    // true if cards at given indexes in hand have the same rank
    public sameRank(indexes: number[]): boolean {
        // return Array.from(new Set(this.ranks.filter((rank, index) => indexes.includes(index)))).length === 1;
        const card0 = this.cardAt(indexes[0]);
        if (!card0) return false;
        const rank = card0.rank.number;
        for (let i = 1; i < indexes.length; i++) {
            const card = this.cardAt(indexes[i]);
            if (!card || card.rank.number !== rank) return false;
        }
        return true;
    }

    // true if cards at given indexes in hand have the same suit
    public sameSuit(indexes: number[]): boolean {
        const card0 = this.cardAt(indexes[0]);
        if (!card0) return false;
        const suit = card0.suit.number;
        for (let i = 1; i < indexes.length; i++) {
            const card = this.cardAt(indexes[i]);
            if (!card || card.suit.number !== suit) return false;
        }
        return true;
    }

    // numeric value between cards at indexA and indexB or -1 if either card is a joker or an invalid index was entered
    public valueBetween(indexA: number, indexB: number): number {
        const cardA = this.cardAt(indexA);
        const cardB = this.cardAt(indexB);
        if (cardA && cardB) {
            return cardA.valueBetweenRanks(cardB);
        }
        return -1;
    }

    // all cards in the hand have the same rank
    public allSameRank(): boolean {
        // @ts-ignore
        return this.sameRank(this.cards.map((card, index) => index));
    }

    // all cards in the hand have the same suit
    public allSameSuit(): boolean {
        // @ts-ignore
        return this.sameSuit(this.cards.map((card, index) => index));
    }

    // NO cards in the hand have the same rank
    public noSameRanks(): boolean {
        // Set removes duplicates, if any ranks are removed, it means there are at least 2 cards with the same rank
        return Array.from(new Set(this.ranks)).length === this.cards.length;
    }

    private get ranks(): number[] {
        return this.cards.map(card => card.rank.number);
    }

    private get highCardRank(): number {
        return Math.max(...this.ranks);
    }

    private get highCardIndex(): number {
        return this.cards.map((card, index) => (card.isRankNumber(this.highCardRank)) ? index : -1).filter(index => index !== -1)[0];
    }

    // ignore JOKERS (0 matches lowest rank otherwise)
    private get lowCardRank(): number {
        return Math.min(...this.ranks.filter(rank => rank !== 0));
    }

    private get lowCardIndex(): number {
        return this.cards.map((card, index) => (card.isRankNumber(this.lowCardRank)) ? index : -1).filter(index => index !== -1)[0];
    }

}