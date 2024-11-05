/**
 * provides various methods to help concrete hand types determine whether a hand is valid and to order it correctly
 */

import PlayingCard from "@brendangooch/playing-card";

// ACE IS LOW (1)

export default class HandAnalyser {

    private cards: PlayingCard[] = [];

    public update(types: tPlayingCardType[]): void {
        this.cards = types.map(type => new PlayingCard(type));
    }

    public get size(): number {
        return this.cards.length;
    }

    public get numJokers(): number {
        return this.cards.filter(card => card.isJoker()).length;
    }

    public get unordered(): tPlayingCardType[] {
        return this.cards.map(card => card.type);
    }

    // joker ranks highest, ordered by rank then suit
    public get ordered(): tPlayingCardType[] {
        const cards = this.cards.map(card => card.clone());
        cards.sort((a: PlayingCard, b: PlayingCard) => (a.isHigherThan(b) ? 1 : -1));
        return cards.map(card => card.type);
    }

    // returns the index of the jokers in the hand
    public get jokers(): number[] {
        const indexes: number[] = [];
        this.cards.forEach((card, index) => {
            if (card.isJoker()) indexes.push(index);
        });
        return indexes;
    }

    // returns the index of the non-jokers in the hand
    public get nonJokers(): number[] {
        const indexes: number[] = [];
        this.cards.forEach((card, index) => {
            if (!card.isJoker()) indexes.push(index);
        });
        return indexes;
    }

    // the highest rank in the hand
    public get highestRank(): tRankNumeric {
        return <tRankNumeric>Math.max(...this.ranks);
    }

    // the lowest rank in the hand (excluding jokers)
    public get lowestRank(): tRankNumeric {
        return <tRankNumeric>Math.min(...this.ranks);
    }

    // does the hand contain a card with rank
    public containsRank(rank: tRankNumeric): boolean {
        return this.cards.filter(card => card.isRank(rank)).length > 0;
    }

    // does the hand contain ALL of the following ranks
    public containsRanks(ranks: tRankNumeric[]): boolean {
        for (let i = 0; i < ranks.length; i++) {
            if (!this.containsRank(ranks[i])) return false;
        }
        return true;
    }

    // do the cards at given indexes have the same rank?
    public haveSameRank(indexes: number[]): boolean {
        // validate each index > -1 && < this.cards.length
        const firstRank = this.cards[indexes[0]].rank.number;
        for (let i = 1; i < indexes.length; i++) {
            const nextCard = this.cards[indexes[i]];
            if (!nextCard) return false;
            if (!nextCard.isRank(firstRank)) return false;
        }
        return true;
    }

    // do the cards at given indexes have the same suit?
    public haveSameSuit(indexes: number[]): boolean {
        // validate each index > -1 && < this.cards.length
        const firstSuit = this.cards[indexes[0]].suit.number;
        for (let i = 1; i < indexes.length; i++) {
            const nextCard = this.cards[indexes[i]];
            if (!nextCard) return false;
            if (!nextCard.isSuit(firstSuit)) return false;
        }
        return true;
    }

    // cards converted to their rank number
    private get ranks(): tRankNumeric[] {
        return this.cards.map(card => <tRankNumeric>card.rank.number);
    }

    // cards converted to their suit number
    private get suits(): tSuitNumeric[] {
        return this.cards.map(card => <tSuitNumeric>card.suit.number);
    }

}