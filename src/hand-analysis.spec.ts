/**
 * class should be tested against hands of size 3, 4 and 5 cards at least (more as larger hands added)
 * methods should return same results regardless of order of cards in most cases so all combinations are tested against where necessary
 * these tests do not cover every eventuality; HOWEVER, each concrete hand also has extensive tests to further confirm accuracy
 */

import * as EXPECT from '@brendangooch/jest-expect';
import { everyCombination } from '@brendangooch/every-combination';
import { HandAnalysis } from './hand-analysis.js';
import { PlayingCard, type tPlayingCardType } from '@brendangooch/playing-card';

let hand: HandAnalysis;
beforeEach(() => {
    hand = new HandAnalysis();
})

testAll();
function testAll(): void {
    describe('HandAnalysis', () => {

        testGetUnordered();
        testGetOrdered();
        testGetNumJokers();
        testGetNonJokers();
        testGetHighCard();
        testGetHighCardPlusOne();
        testGetLowCard();
        testGetSize();
        testCardAt();
        testContainsRank();
        testContainsRanks();
        testSameRank();
        testSameSuit();
        testValueBetween();
        testAllSameRank();
        testAllSameSuit();
        testNoSameRanks();

    });
}

// public get unordered(): PlayingCard[]
function testGetUnordered(): void {
    describe('get unordered()', () => {

        // 5 cards
        test('returns cards as entered (5 cards)', () => {
            const original: tPlayingCardType[] = [1, 2, 3, 4, 5];
            const everyCombo = everyCombination(original);
            everyCombo.forEach(types => {
                hand.updateTypes(<tPlayingCardType[]>types);
                const unordered = hand.unordered.map(card => card.type);
                EXPECT.truthy(sameArray<tPlayingCardType>(<tPlayingCardType[]>types, unordered));
            });
        });

        // 4 cards
        test('returns cards as entered (4 cards)', () => {
            const original: tPlayingCardType[] = [1, 2, 3, 4];
            const everyCombo = everyCombination(original);
            everyCombo.forEach(types => {
                hand.updateTypes(<tPlayingCardType[]>types);
                const unordered = hand.unordered.map(card => card.type);
                EXPECT.truthy(sameArray<tPlayingCardType>(<tPlayingCardType[]>types, unordered));
            });
        });

        // 3 cards
        test('returns cards as entered (3 cards)', () => {
            const original: tPlayingCardType[] = [1, 2, 3];
            const everyCombo = everyCombination(original);
            everyCombo.forEach(types => {
                hand.updateTypes(<tPlayingCardType[]>types);
                const unordered = hand.unordered.map(card => card.type);
                EXPECT.truthy(sameArray<tPlayingCardType>(<tPlayingCardType[]>types, unordered));
            });
        });


    });
}

// public get ordered(): PlayingCard[]
function testGetOrdered(): void {
    describe('get ordered()', () => {

        describe('5 cards', () => {

            test('joker is always on the RHS', () => {
                const correctOrder: tPlayingCardType[] = [1, 2, 3, 4, 0];
                const combos = everyCombination(correctOrder);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    const ordered = hand.ordered.map(card => card.type);
                    EXPECT.truthy(sameArray<tPlayingCardType>(correctOrder, ordered));
                });
            });

            test('ace is always on the LHS', () => {
                const correctOrder: tPlayingCardType[] = [40, 15, 16, 17, 18];
                const combos = everyCombination(correctOrder);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    const ordered = hand.ordered.map(card => card.type);
                    EXPECT.truthy(sameArray<tPlayingCardType>(correctOrder, ordered));
                });
            });

            test('cards ordered by rank', () => {
                const correctOrder: tPlayingCardType[] = [28, 29, 30, 31, 32];
                const combos = everyCombination(correctOrder);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    const ordered = hand.ordered.map(card => card.type);
                    EXPECT.truthy(sameArray<tPlayingCardType>(correctOrder, ordered));
                });
            });

            test('cards ordered by suit if rank is the same', () => {
                const correctOrder: tPlayingCardType[] = [48, 10, 23, 36, 49];
                const combos = everyCombination(correctOrder);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    const ordered = hand.ordered.map(card => card.type);
                    EXPECT.truthy(sameArray<tPlayingCardType>(correctOrder, ordered));
                });
            });

        });

        describe('4 cards', () => {

            test('joker is always on the RHS', () => {
                const correctOrder: tPlayingCardType[] = [1, 2, 3, 0];
                const combos = everyCombination(correctOrder);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    const ordered = hand.ordered.map(card => card.type);
                    EXPECT.truthy(sameArray<tPlayingCardType>(correctOrder, ordered));
                });
            });

            test('ace is always on the LHS', () => {
                const correctOrder: tPlayingCardType[] = [40, 15, 16, 17];
                const combos = everyCombination(correctOrder);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    const ordered = hand.ordered.map(card => card.type);
                    EXPECT.truthy(sameArray<tPlayingCardType>(correctOrder, ordered));
                });
            });

            test('cards ordered by rank', () => {
                const correctOrder: tPlayingCardType[] = [29, 30, 31, 32];
                const combos = everyCombination(correctOrder);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    const ordered = hand.ordered.map(card => card.type);
                    EXPECT.truthy(sameArray<tPlayingCardType>(correctOrder, ordered));
                });
            });

            test('cards ordered by suit if rank is the same', () => {
                const correctOrder: tPlayingCardType[] = [10, 23, 36, 49];
                const combos = everyCombination(correctOrder);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    const ordered = hand.ordered.map(card => card.type);
                    EXPECT.truthy(sameArray<tPlayingCardType>(correctOrder, ordered));
                });
            });

        });

        describe('3 cards', () => {

            test('joker is always on the RHS', () => {
                const correctOrder: tPlayingCardType[] = [27, 28, 0];
                const combos = everyCombination(correctOrder);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    const ordered = hand.ordered.map(card => card.type);
                    EXPECT.truthy(sameArray<tPlayingCardType>(correctOrder, ordered));
                });
            });

            test('ace is always on the LHS', () => {
                const correctOrder: tPlayingCardType[] = [40, 15, 16];
                const combos = everyCombination(correctOrder);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    const ordered = hand.ordered.map(card => card.type);
                    EXPECT.truthy(sameArray<tPlayingCardType>(correctOrder, ordered));
                });
            });

            test('cards ordered by rank', () => {
                const correctOrder: tPlayingCardType[] = [29, 30, 31];
                const combos = everyCombination(correctOrder);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    const ordered = hand.ordered.map(card => card.type);
                    EXPECT.truthy(sameArray<tPlayingCardType>(correctOrder, ordered));
                });
            });

            test('cards ordered by suit if rank is the same', () => {
                const correctOrder: tPlayingCardType[] = [23, 36, 49];
                const combos = everyCombination(correctOrder);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    const ordered = hand.ordered.map(card => card.type);
                    EXPECT.truthy(sameArray<tPlayingCardType>(correctOrder, ordered));
                });
            });

        });

    });
}

// public get numJokers(): number
function testGetNumJokers(): void {
    describe('get numJokers()', () => {

        describe('5 cards', () => {

            test('5 jokers', () => {
                hand.updateTypes([0, 0, 0, 0, 0]);
                EXPECT.toBe(hand.numJokers, 5);
            });

            test('4 jokers', () => {
                const original = [0, 0, 0, 0, 1];
                const allCombos = everyCombination(original);
                allCombos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    EXPECT.toBe(hand.numJokers, 4);
                });
            });

            test('3 jokers', () => {
                const original = [0, 0, 0, 2, 1];
                const allCombos = everyCombination(original);
                allCombos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    EXPECT.toBe(hand.numJokers, 3);
                });
            });

            test('2 jokers', () => {
                const original = [0, 0, 3, 2, 1];
                const allCombos = everyCombination(original);
                allCombos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    EXPECT.toBe(hand.numJokers, 2);
                });
            });

            test('1 joker', () => {
                const original = [0, 4, 3, 2, 1];
                const allCombos = everyCombination(original);
                allCombos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    EXPECT.toBe(hand.numJokers, 1);
                });
            });

            test('0 jokers', () => {
                const original = [5, 4, 3, 2, 1];
                const allCombos = everyCombination(original);
                allCombos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    EXPECT.toBe(hand.numJokers, 0);
                });
            });

        });

        describe('4 cards', () => {

            test('4 jokers', () => {
                hand.updateTypes([0, 0, 0, 0]);
                EXPECT.toBe(hand.numJokers, 4);
            });

            test('3 jokers', () => {
                const original = [0, 0, 0, 1];
                const allCombos = everyCombination(original);
                allCombos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    EXPECT.toBe(hand.numJokers, 3);
                });
            });

            test('2 jokers', () => {
                const original = [0, 0, 2, 1];
                const allCombos = everyCombination(original);
                allCombos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    EXPECT.toBe(hand.numJokers, 2);
                });
            });

            test('1 joker', () => {
                const original = [0, 3, 2, 1];
                const allCombos = everyCombination(original);
                allCombos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    EXPECT.toBe(hand.numJokers, 1);
                });
            });

            test('0 jokers', () => {
                const original = [4, 3, 2, 1];
                const allCombos = everyCombination(original);
                allCombos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    EXPECT.toBe(hand.numJokers, 0);
                });
            });

        });

        describe('3 cards', () => {

            test('3 jokers', () => {
                hand.updateTypes([0, 0, 0]);
                EXPECT.toBe(hand.numJokers, 3);
            });

            test('2 jokers', () => {
                const original = [0, 0, 1];
                const allCombos = everyCombination(original);
                allCombos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    EXPECT.toBe(hand.numJokers, 2);
                });
            });

            test('1 joker', () => {
                const original = [0, 2, 1];
                const allCombos = everyCombination(original);
                allCombos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    EXPECT.toBe(hand.numJokers, 1);
                });
            });

            test('0 jokers', () => {
                const original = [3, 2, 1];
                const allCombos = everyCombination(original);
                allCombos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    EXPECT.toBe(hand.numJokers, 0);
                });
            });

        });

    });
}

// return array containing index position of each card that is not a joker
// public get nonJokers(): number[]
function testGetNonJokers(): void {
    describe('get nonJokers()', () => {

        describe('5 cards', () => {

            test('0 non-jokers', () => {
                hand.updateTypes([0, 0, 0, 0, 0]);
                EXPECT.toBe(hand.nonJokers.length, 0);
            });

            test('1 non-joker', () => {
                hand.updateTypes([1, 0, 0, 0, 0]);
                EXPECT.toBe(hand.nonJokers.length, 1);
                EXPECT.truthy(sameArray(hand.nonJokers, [0]));
                hand.updateTypes([0, 0, 0, 0, 1]);
                EXPECT.toBe(hand.nonJokers.length, 1);
                EXPECT.truthy(sameArray(hand.nonJokers, [4]));
            });

            test('2 non-jokers', () => {
                hand.updateTypes([1, 2, 0, 0, 0]);
                EXPECT.toBe(hand.nonJokers.length, 2);
                EXPECT.truthy(sameArray(hand.nonJokers, [0, 1]));
                hand.updateTypes([0, 0, 0, 1, 2]);
                EXPECT.toBe(hand.nonJokers.length, 2);
                EXPECT.truthy(sameArray(hand.nonJokers, [3, 4]));
            });

            test('3 non-jokers', () => {
                hand.updateTypes([1, 2, 3, 0, 0]);
                EXPECT.toBe(hand.nonJokers.length, 3);
                EXPECT.truthy(sameArray(hand.nonJokers, [0, 1, 2]));
                hand.updateTypes([0, 0, 1, 2, 3]);
                EXPECT.toBe(hand.nonJokers.length, 3);
                EXPECT.truthy(sameArray(hand.nonJokers, [2, 3, 4]));
            });

            test('4 non-jokers', () => {
                hand.updateTypes([1, 2, 3, 4, 0]);
                EXPECT.toBe(hand.nonJokers.length, 4);
                EXPECT.truthy(sameArray(hand.nonJokers, [0, 1, 2, 3]));
                hand.updateTypes([0, 1, 2, 3, 4]);
                EXPECT.toBe(hand.nonJokers.length, 4);
                EXPECT.truthy(sameArray(hand.nonJokers, [1, 2, 3, 4]));
            });

            test('5 non-jokers', () => {
                hand.updateTypes([1, 2, 3, 4, 5]);
                EXPECT.toBe(hand.nonJokers.length, 5);
                EXPECT.truthy(sameArray(hand.nonJokers, [0, 1, 2, 3, 4]));
            });

        });

        describe('4 cards', () => {

            test('0 non-jokers', () => {
                hand.updateTypes([0, 0, 0, 0]);
                EXPECT.toBe(hand.nonJokers.length, 0);
            });

            test('1 non-joker', () => {
                hand.updateTypes([1, 0, 0, 0]);
                EXPECT.toBe(hand.nonJokers.length, 1);
                EXPECT.truthy(sameArray(hand.nonJokers, [0]));
                hand.updateTypes([0, 0, 0, 1]);
                EXPECT.toBe(hand.nonJokers.length, 1);
                EXPECT.truthy(sameArray(hand.nonJokers, [3]));
            });

            test('2 non-jokers', () => {
                hand.updateTypes([1, 2, 0, 0]);
                EXPECT.toBe(hand.nonJokers.length, 2);
                EXPECT.truthy(sameArray(hand.nonJokers, [0, 1]));
                hand.updateTypes([0, 0, 1, 2]);
                EXPECT.toBe(hand.nonJokers.length, 2);
                EXPECT.truthy(sameArray(hand.nonJokers, [2, 3]));
            });

            test('3 non-jokers', () => {
                hand.updateTypes([1, 2, 3, 0]);
                EXPECT.toBe(hand.nonJokers.length, 3);
                EXPECT.truthy(sameArray(hand.nonJokers, [0, 1, 2]));
                hand.updateTypes([0, 1, 2, 3]);
                EXPECT.toBe(hand.nonJokers.length, 3);
                EXPECT.truthy(sameArray(hand.nonJokers, [1, 2, 3]));
            });

            test('4 non-jokers', () => {
                hand.updateTypes([1, 2, 3, 4]);
                EXPECT.toBe(hand.nonJokers.length, 4);
                EXPECT.truthy(sameArray(hand.nonJokers, [0, 1, 2, 3]));
            });

        });

        describe('3 cards', () => {

            test('0 non-jokers', () => {
                hand.updateTypes([0, 0, 0]);
                EXPECT.toBe(hand.nonJokers.length, 0);
            });

            test('1 non-joker', () => {
                hand.updateTypes([1, 0, 0]);
                EXPECT.toBe(hand.nonJokers.length, 1);
                EXPECT.truthy(sameArray(hand.nonJokers, [0]));
                hand.updateTypes([0, 0, 1]);
                EXPECT.toBe(hand.nonJokers.length, 1);
                EXPECT.truthy(sameArray(hand.nonJokers, [2]));
            });

            test('2 non-jokers', () => {
                hand.updateTypes([1, 2, 0]);
                EXPECT.toBe(hand.nonJokers.length, 2);
                EXPECT.truthy(sameArray(hand.nonJokers, [0, 1]));
                hand.updateTypes([0, 1, 2]);
                EXPECT.toBe(hand.nonJokers.length, 2);
                EXPECT.truthy(sameArray(hand.nonJokers, [1, 2]));
            });

            test('3 non-jokers', () => {
                hand.updateTypes([1, 2, 3]);
                EXPECT.toBe(hand.nonJokers.length, 3);
                EXPECT.truthy(sameArray(hand.nonJokers, [0, 1, 2]));
            });

        });

    });
}

// return a new card with the same rank as the card in the hand with the highest rank
// public get highCard(): { index: number; card: PlayingCard } {
function testGetHighCard(): void {
    describe('get highCard()', () => {

        describe('5 cards', () => {

            test('identifies highest rank number in hand', () => {
                for (let final = 44; final <= 52; final++) {
                    const original: tPlayingCardType[] = [40, 41, 42, 43, <tPlayingCardType>final];
                    const combos = everyCombination(original);
                    combos.forEach(types => {
                        hand.updateTypes(<tPlayingCardType[]>types);
                        const highCard = new PlayingCard(<tPlayingCardType>final);
                        EXPECT.truthy(hand.highCard.card.hasSameRankAs(highCard));
                    });
                }
            });

            describe('identifies correct index of card with highest rank number', () => {

                test('highest rank at index 0', () => {
                    const types: tPlayingCardType[] = [39, 35, 36, 37, 38];
                    hand.updateTypes(types);
                    EXPECT.toBe(hand.highCard.index, 0);
                });

                test('highest rank at index 1', () => {
                    const types: tPlayingCardType[] = [35, 39, 36, 37, 38];
                    hand.updateTypes(types);
                    EXPECT.toBe(hand.highCard.index, 1);
                });

                test('highest rank at index 2', () => {
                    const types: tPlayingCardType[] = [35, 36, 39, 37, 38];
                    hand.updateTypes(types);
                    EXPECT.toBe(hand.highCard.index, 2);
                });

                test('highest rank at index 3', () => {
                    const types: tPlayingCardType[] = [35, 36, 37, 39, 38];
                    hand.updateTypes(types);
                    EXPECT.toBe(hand.highCard.index, 3);
                });

                test('highest rank at index 4', () => {
                    const types: tPlayingCardType[] = [35, 36, 37, 38, 39];
                    hand.updateTypes(types);
                    EXPECT.toBe(hand.highCard.index, 4);
                });

            });

        });

        describe('4 cards', () => {

            test('identifies highest rank number in hand', () => {
                for (let final = 43; final <= 52; final++) {
                    const original: tPlayingCardType[] = [40, 41, 42, <tPlayingCardType>final];
                    const combos = everyCombination(original);
                    combos.forEach(types => {
                        hand.updateTypes(<tPlayingCardType[]>types);
                        const highCard = new PlayingCard(<tPlayingCardType>final);
                        EXPECT.truthy(hand.highCard.card.hasSameRankAs(highCard));
                    });
                }
            });

            describe('identifies correct index of card with highest rank number', () => {

                test('highest rank at index 0', () => {
                    const types: tPlayingCardType[] = [38, 35, 36, 37];
                    hand.updateTypes(types);
                    EXPECT.toBe(hand.highCard.index, 0);
                });

                test('highest rank at index 1', () => {
                    const types: tPlayingCardType[] = [35, 38, 36, 37];
                    hand.updateTypes(types);
                    EXPECT.toBe(hand.highCard.index, 1);
                });

                test('highest rank at index 2', () => {
                    const types: tPlayingCardType[] = [35, 36, 38, 37];
                    hand.updateTypes(types);
                    EXPECT.toBe(hand.highCard.index, 2);
                });

                test('highest rank at index 3', () => {
                    const types: tPlayingCardType[] = [35, 36, 37, 38];
                    hand.updateTypes(types);
                    EXPECT.toBe(hand.highCard.index, 3);
                });

            });

        });

        describe('3 cards', () => {

            test('identifies highest rank number in hand', () => {
                for (let final = 42; final <= 52; final++) {
                    const original: tPlayingCardType[] = [40, 41, <tPlayingCardType>final];
                    const combos = everyCombination(original);
                    combos.forEach(types => {
                        hand.updateTypes(<tPlayingCardType[]>types);
                        const highCard = new PlayingCard(<tPlayingCardType>final);
                        EXPECT.truthy(hand.highCard.card.hasSameRankAs(highCard));
                    });
                }
            });

            describe('identifies correct index of card with highest rank number', () => {

                test('highest rank at index 0', () => {
                    const types: tPlayingCardType[] = [37, 35, 36];
                    hand.updateTypes(types);
                    EXPECT.toBe(hand.highCard.index, 0);
                });

                test('highest rank at index 1', () => {
                    const types: tPlayingCardType[] = [35, 37, 36];
                    hand.updateTypes(types);
                    EXPECT.toBe(hand.highCard.index, 1);
                });

                test('highest rank at index 2', () => {
                    const types: tPlayingCardType[] = [35, 36, 37];
                    hand.updateTypes(types);
                    EXPECT.toBe(hand.highCard.index, 2);
                });

            });

        });

    });

}

// return a new card 1 rank higher than the card in the hand with the highest rank
// public get highCardPlusOne(): PlayingCard
function testGetHighCardPlusOne(): void {
    describe('get highCardPlusOne()', () => {
        test('5 cards', () => {
            hand.updateTypes([1, 2, 3, 4, 5]);
            EXPECT.toBe(hand.highCardPlusOne.rank.number, 6);
        });
        test('4 cards', () => {
            hand.updateTypes([1, 2, 3, 4]);
            EXPECT.toBe(hand.highCardPlusOne.rank.number, 5);
        });
        test('3 cards', () => {
            hand.updateTypes([1, 2, 3]);
            EXPECT.toBe(hand.highCardPlusOne.rank.number, 4);
        });
    });
}

// return a new card with the same rank as the card in the hand with the lowest rank
// public get lowCard(): { index: number; card: PlayingCard }
function testGetLowCard(): void {
    describe('get lowCard)', () => {

        describe('5 cards', () => {

            test('identifies lowest rank number in hand', () => {
                const original: tPlayingCardType[] = [40, 41, 42, 43, 44];
                const combos = everyCombination(original);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    const lowCard = new PlayingCard(<tPlayingCardType>40);
                    EXPECT.truthy(hand.lowCard.card.hasSameRankAs(lowCard));
                });
            });

            describe('identifies correct index of card with lowest rank number', () => {

                test('lowest rank at index 0', () => {
                    const types: tPlayingCardType[] = [35, 36, 37, 38, 39];
                    hand.updateTypes(types);
                    EXPECT.toBe(hand.lowCard.index, 0);
                });

                test('lowest rank at index 1', () => {
                    const types: tPlayingCardType[] = [36, 35, 37, 38, 39];
                    hand.updateTypes(types);
                    EXPECT.toBe(hand.lowCard.index, 1);
                });

                test('lowest rank at index 2', () => {
                    const types: tPlayingCardType[] = [36, 37, 35, 38, 39];
                    hand.updateTypes(types);
                    EXPECT.toBe(hand.lowCard.index, 2);
                });

                test('lowest rank at index 3', () => {
                    const types: tPlayingCardType[] = [36, 37, 38, 35, 39];
                    hand.updateTypes(types);
                    EXPECT.toBe(hand.lowCard.index, 3);
                });

                test('lowest rank at index 4', () => {
                    const types: tPlayingCardType[] = [36, 37, 38, 39, 35];
                    hand.updateTypes(types);
                    EXPECT.toBe(hand.lowCard.index, 4);
                });

            });

        });

        describe('4 cards', () => {

            test('identifies lowest rank number in hand', () => {
                const original: tPlayingCardType[] = [40, 41, 42, 43];
                const combos = everyCombination(original);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    const lowCard = new PlayingCard(<tPlayingCardType>40);
                    EXPECT.truthy(hand.lowCard.card.hasSameRankAs(lowCard));
                });
            });

            describe('identifies correct index of card with lowest rank number', () => {

                test('lowest rank at index 0', () => {
                    const types: tPlayingCardType[] = [35, 36, 37, 38];
                    hand.updateTypes(types);
                    EXPECT.toBe(hand.lowCard.index, 0);
                });

                test('lowest rank at index 1', () => {
                    const types: tPlayingCardType[] = [36, 35, 36, 37];
                    hand.updateTypes(types);
                    EXPECT.toBe(hand.lowCard.index, 1);
                });

                test('lowest rank at index 2', () => {
                    const types: tPlayingCardType[] = [36, 37, 35, 38];
                    hand.updateTypes(types);
                    EXPECT.toBe(hand.lowCard.index, 2);
                });

                test('lowest rank at index 3', () => {
                    const types: tPlayingCardType[] = [36, 37, 38, 35];
                    hand.updateTypes(types);
                    EXPECT.toBe(hand.lowCard.index, 3);
                });

            });

        });

        describe('3 cards', () => {

            test('identifies lowest rank number in hand', () => {
                const original: tPlayingCardType[] = [40, 41, 42];
                const combos = everyCombination(original);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    const lowCard = new PlayingCard(<tPlayingCardType>40);
                    EXPECT.truthy(hand.lowCard.card.hasSameRankAs(lowCard));
                });
            });

            describe('identifies correct index of card with lowest rank number', () => {

                test('lowest rank at index 0', () => {
                    const types: tPlayingCardType[] = [35, 36, 37];
                    hand.updateTypes(types);
                    EXPECT.toBe(hand.lowCard.index, 0);
                });

                test('lowest rank at index 1', () => {
                    const types: tPlayingCardType[] = [36, 35, 37];
                    hand.updateTypes(types);
                    EXPECT.toBe(hand.lowCard.index, 1);
                });

                test('lowest rank at index 2', () => {
                    const types: tPlayingCardType[] = [36, 37, 35];
                    hand.updateTypes(types);
                    EXPECT.toBe(hand.lowCard.index, 2);
                });

            });

        });

    });
}

// number of cards in hand
// public get size(): number
function testGetSize(): void {
    describe('get size()', () => {
        test('5 cards', () => {
            hand.updateTypes([1, 2, 3, 4, 5]);
            EXPECT.toBe(hand.size, 5);
        });
        test('4 cards', () => {
            hand.updateTypes([1, 2, 3, 4]);
            EXPECT.toBe(hand.size, 4);
        });
        test('3 cards', () => {
            hand.updateTypes([1, 2, 3]);
            EXPECT.toBe(hand.size, 3);
        });
    });
}

// a clone of the card at index or null if no card at that index
// public cardAt(index: number): PlayingCard
function testCardAt(): void {
    describe('cardAt()', () => {

        test('returned card is a CLONE not the original card object', () => {
            const original = new PlayingCard(10);
            hand.update([original, new PlayingCard(0), new PlayingCard(0)]);
            EXPECT.falsy(original === hand.cardAt(0));
        });

        test('5 cards', () => {
            hand.updateTypes([14, 15, 16, 17, 18]);
            const card0 = hand.cardAt(0);
            if (card0) EXPECT.toBe(card0.type, 14);
            const card1 = hand.cardAt(1);
            if (card1) EXPECT.toBe(card1.type, 15);
            const card2 = hand.cardAt(2);
            if (card2) EXPECT.toBe(card2.type, 16);
            const card3 = hand.cardAt(3);
            if (card3) EXPECT.toBe(card3.type, 17);
            const card4 = hand.cardAt(4);
            if (card4) EXPECT.toBe(card4.type, 18);
            EXPECT.truthy(hand.cardAt(5) === null);
        });

        test('4 cards', () => {
            hand.updateTypes([14, 15, 16, 17]);
            const card0 = hand.cardAt(0);
            if (card0) EXPECT.toBe(card0.type, 14);
            const card1 = hand.cardAt(1);
            if (card1) EXPECT.toBe(card1.type, 15);
            const card2 = hand.cardAt(2);
            if (card2) EXPECT.toBe(card2.type, 16);
            const card3 = hand.cardAt(3);
            if (card3) EXPECT.toBe(card3.type, 17);
            EXPECT.truthy(hand.cardAt(4) === null);
        });

        test('3 cards', () => {
            hand.updateTypes([14, 15, 16]);
            const card0 = hand.cardAt(0);
            if (card0) EXPECT.toBe(card0.type, 14);
            const card1 = hand.cardAt(1);
            if (card1) EXPECT.toBe(card1.type, 15);
            const card2 = hand.cardAt(2);
            if (card2) EXPECT.toBe(card2.type, 16);
            EXPECT.truthy(hand.cardAt(3) === null);
        });

    });
}

// returns number of cards in hand with rank number
// public containsRank(rank: number): number
function testContainsRank(): void {
    describe('containsRank()', () => {

        describe('5 cards', () => {

            test('4 cards with rank', () => {
                const combos = everyCombination([1, 14, 27, 40, 41]);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    EXPECT.toBe(hand.containsRank(1), 4);
                });
            });

            test('3 cards with rank', () => {
                const combos = everyCombination([1, 14, 27, 42, 41]);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    EXPECT.toBe(hand.containsRank(1), 3);
                });
            });

            test('2 cards with rank', () => {
                const combos = everyCombination([1, 14, 43, 42, 41]);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    EXPECT.toBe(hand.containsRank(1), 2);
                });
            });

            test('1 card with rank', () => {
                const combos = everyCombination([1, 44, 43, 42, 41]);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    EXPECT.toBe(hand.containsRank(1), 1);
                });
            });

            test('no cards with rank', () => {
                const combos = everyCombination([45, 44, 43, 42, 41]);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    EXPECT.toBe(hand.containsRank(1), 0);
                });
            });

        });

        describe('4 cards', () => {

            test('4 cards with rank', () => {
                const combos = everyCombination([1, 14, 27, 40]);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    EXPECT.toBe(hand.containsRank(1), 4);
                });
            });

            test('3 cards with rank', () => {
                const combos = everyCombination([1, 14, 27, 41]);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    EXPECT.toBe(hand.containsRank(1), 3);
                });
            });

            test('2 cards with rank', () => {
                const combos = everyCombination([1, 14, 42, 41]);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    EXPECT.toBe(hand.containsRank(1), 2);
                });
            });

            test('1 card with rank', () => {
                const combos = everyCombination([1, 43, 42, 41]);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    EXPECT.toBe(hand.containsRank(1), 1);
                });
            });

            test('no cards with rank', () => {
                const combos = everyCombination([44, 43, 42, 41]);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    EXPECT.toBe(hand.containsRank(1), 0);
                });
            });

        });

        describe('3 cards', () => {

            test('3 cards with rank', () => {
                const combos = everyCombination([1, 14, 27]);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    EXPECT.toBe(hand.containsRank(1), 3);
                });
            });

            test('2 cards with rank', () => {
                const combos = everyCombination([1, 14, 41]);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    EXPECT.toBe(hand.containsRank(1), 2);
                });
            });

            test('1 card with rank', () => {
                const combos = everyCombination([1, 42, 41]);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    EXPECT.toBe(hand.containsRank(1), 1);
                });
            });

            test('no cards with rank', () => {
                const combos = everyCombination([43, 42, 41]);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    EXPECT.toBe(hand.containsRank(1), 0);
                });
            });

        });

    });
}

// true if hand contains ALL of the rank numbers in ranks parameter
// public containsRanks(ranks: number[]): boolean {
function testContainsRanks(): void {
    describe('containsRanks()', () => {

        describe('5 cards', () => {
            test('identifies that hand does or does NOT contain given ranks', () => {
                const original = [27, 28, 29, 30, 31]; // 1,2,3,4,5
                const combos = everyCombination(original);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    EXPECT.truthy(hand.containsRanks([1, 2, 3, 4, 5]));
                    EXPECT.truthy(hand.containsRanks([1, 2, 3, 4]));
                    EXPECT.truthy(hand.containsRanks([1, 2, 3]));
                    EXPECT.truthy(hand.containsRanks([1, 2]));
                    EXPECT.truthy(hand.containsRanks([1]));
                    EXPECT.falsy(hand.containsRanks([6, 2, 3, 4, 5]));
                    EXPECT.falsy(hand.containsRanks([6, 2, 3, 4]));
                    EXPECT.falsy(hand.containsRanks([6, 2, 3]));
                    EXPECT.falsy(hand.containsRanks([6, 2]));
                    EXPECT.falsy(hand.containsRanks([6]));
                });
            });
        });

        describe('4 cards', () => {
            test('identifies that hand does or does NOT contain given ranks', () => {
                const original = [27, 28, 29, 30]; // 1,2,3,4
                const combos = everyCombination(original);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    EXPECT.truthy(hand.containsRanks([1, 2, 3, 4]));
                    EXPECT.truthy(hand.containsRanks([1, 2, 3]));
                    EXPECT.truthy(hand.containsRanks([1, 2]));
                    EXPECT.truthy(hand.containsRanks([1]));
                    EXPECT.falsy(hand.containsRanks([6, 2, 3, 4]));
                    EXPECT.falsy(hand.containsRanks([6, 2, 3]));
                    EXPECT.falsy(hand.containsRanks([6, 2]));
                    EXPECT.falsy(hand.containsRanks([6]));
                });
            });
        });

        describe('3 cards', () => {
            test('identifies that hand does or does NOT contain given ranks', () => {
                const original = [27, 28, 29]; // 1,2,3
                const combos = everyCombination(original);
                combos.forEach(types => {
                    hand.updateTypes(<tPlayingCardType[]>types);
                    EXPECT.truthy(hand.containsRanks([1, 2, 3]));
                    EXPECT.truthy(hand.containsRanks([1, 2]));
                    EXPECT.truthy(hand.containsRanks([1]));
                    EXPECT.falsy(hand.containsRanks([6, 2, 3]));
                    EXPECT.falsy(hand.containsRanks([6, 2]));
                    EXPECT.falsy(hand.containsRanks([6]));
                });
            });
        });

    });
}

// true if cards at given indexes in hand have the same rank
// public sameRank(indexes: number[]): boolean {
function testSameRank(): void {
    describe('sameRank()', () => {

        describe('5 cards', () => {

            test('4 cards same rank', () => {
                hand.updateTypes([1, 14, 27, 40, 2]);
                EXPECT.truthy(hand.sameRank([0, 1, 2, 3]));
                EXPECT.falsy(hand.sameRank([1, 2, 3, 4]));
            });

            test('3 cards same rank', () => {
                hand.updateTypes([1, 14, 27, 3, 2]);
                EXPECT.truthy(hand.sameRank([0, 1, 2]));
                EXPECT.falsy(hand.sameRank([1, 2, 3]));
                EXPECT.falsy(hand.sameRank([2, 3, 4]));

            });

            test('2 cards same rank', () => {
                hand.updateTypes([1, 14, 4, 3, 2]);
                EXPECT.truthy(hand.sameRank([0, 1]));
                EXPECT.falsy(hand.sameRank([1, 2]));
                EXPECT.falsy(hand.sameRank([2, 3]));
                EXPECT.falsy(hand.sameRank([3, 4]));
            });

            test('no cards same rank', () => {
                hand.updateTypes([1, 5, 4, 3, 2]);
                EXPECT.falsy(hand.sameRank([0, 1, 2, 3, 4]));
                EXPECT.falsy(hand.sameRank([0, 1, 2, 3]));
                EXPECT.falsy(hand.sameRank([0, 1, 2]));
                EXPECT.falsy(hand.sameRank([0, 1]));
                EXPECT.falsy(hand.sameRank([0, 2]));
                EXPECT.falsy(hand.sameRank([0, 3]));
                EXPECT.falsy(hand.sameRank([0, 4]));
                EXPECT.falsy(hand.sameRank([1, 2]));
                EXPECT.falsy(hand.sameRank([1, 3]));
                EXPECT.falsy(hand.sameRank([1, 4]));
            });

        });

        describe('4 cards', () => {

            test('4 cards same rank', () => {
                hand.updateTypes([1, 14, 27, 40]);
                EXPECT.truthy(hand.sameRank([0, 1, 2, 3]));
            });

            test('3 cards same rank', () => {
                hand.updateTypes([1, 14, 27, 2]);
                EXPECT.truthy(hand.sameRank([0, 1, 2]));
                EXPECT.falsy(hand.sameRank([1, 2, 3]));
                EXPECT.falsy(hand.sameRank([2, 3, 4]));

            });

            test('2 cards same rank', () => {
                hand.updateTypes([1, 14, 3, 2]);
                EXPECT.truthy(hand.sameRank([0, 1]));
                EXPECT.falsy(hand.sameRank([1, 2]));
                EXPECT.falsy(hand.sameRank([2, 3]));
                EXPECT.falsy(hand.sameRank([3, 4]));
            });

            test('no cards same rank', () => {
                hand.updateTypes([1, 2, 3, 4]);
                EXPECT.falsy(hand.sameRank([0, 1, 2, 3]));
                EXPECT.falsy(hand.sameRank([0, 1, 2]));
                EXPECT.falsy(hand.sameRank([0, 1]));
                EXPECT.falsy(hand.sameRank([0, 2]));
                EXPECT.falsy(hand.sameRank([0, 3]));
                EXPECT.falsy(hand.sameRank([0, 4]));
                EXPECT.falsy(hand.sameRank([1, 2]));
                EXPECT.falsy(hand.sameRank([1, 3]));
                EXPECT.falsy(hand.sameRank([1, 4]));
            });

        });

        describe('3 cards', () => {

            test('3 cards same rank', () => {
                hand.updateTypes([1, 14, 27]);
                EXPECT.truthy(hand.sameRank([0, 1, 2]));
            });

            test('2 cards same rank', () => {
                hand.updateTypes([1, 14, 2]);
                EXPECT.truthy(hand.sameRank([0, 1]));
                EXPECT.falsy(hand.sameRank([1, 2]));
                EXPECT.falsy(hand.sameRank([2, 3]));
                EXPECT.falsy(hand.sameRank([3, 4]));
            });

            test('no cards same rank', () => {
                hand.updateTypes([1, 2, 3]);
                EXPECT.falsy(hand.sameRank([0, 1, 2]));
                EXPECT.falsy(hand.sameRank([0, 1]));
                EXPECT.falsy(hand.sameRank([0, 2]));
                EXPECT.falsy(hand.sameRank([1, 2]));
            });

        });

    });
}

// true if cards at given indexes in hand have the same suit
// public sameSuit(indexes: number[]): boolean {
function testSameSuit(): void {
    describe('sameSuit()', () => {


        describe('5 cards', () => {

            test('4 cards same suit', () => {
                hand.updateTypes([1, 3, 5, 7, 14]);
                EXPECT.truthy(hand.sameSuit([0, 1, 2, 3]));
                EXPECT.truthy(hand.sameSuit([0, 1, 2]));
                EXPECT.truthy(hand.sameSuit([0, 1]));
                EXPECT.truthy(hand.sameSuit([1, 2]));
                EXPECT.truthy(hand.sameSuit([2, 3]));
                EXPECT.falsy(hand.sameSuit([1, 2, 3, 4]));
            });

            test('3 cards same suit', () => {
                hand.updateTypes([1, 3, 5, 27, 14]);
                EXPECT.truthy(hand.sameSuit([0, 1, 2]));
                EXPECT.truthy(hand.sameSuit([0, 1]));
                EXPECT.truthy(hand.sameSuit([0, 2]));
                EXPECT.truthy(hand.sameSuit([1, 2]));
                EXPECT.falsy(hand.sameSuit([0, 1, 2, 3, 4]));
                EXPECT.falsy(hand.sameSuit([0, 1, 2, 3]));
                EXPECT.falsy(hand.sameSuit([1, 2, 3]));
                EXPECT.falsy(hand.sameSuit([1, 2, 3, 4]));
                EXPECT.falsy(hand.sameSuit([2, 3, 4]));
            });

            test('2 cards same suit', () => {
                hand.updateTypes([4, 5, 40, 27, 14]);
                EXPECT.truthy(hand.sameSuit([0, 1]));
                EXPECT.falsy(hand.sameSuit([1, 2, 3, 4]));
                EXPECT.falsy(hand.sameSuit([1, 2, 3]));
                EXPECT.falsy(hand.sameSuit([1, 2]));
                EXPECT.falsy(hand.sameSuit([2, 3, 4]));
                EXPECT.falsy(hand.sameSuit([3, 4]));
            });

        });

        describe('4 cards', () => {

            test('4 cards same suit', () => {
                hand.updateTypes([1, 3, 5, 7]);
                EXPECT.truthy(hand.sameSuit([0, 1, 2, 3]));
                EXPECT.truthy(hand.sameSuit([0, 1, 2]));
                EXPECT.truthy(hand.sameSuit([0, 1]));
                EXPECT.truthy(hand.sameSuit([1, 2, 3]));
                EXPECT.truthy(hand.sameSuit([1, 2]));
                EXPECT.truthy(hand.sameSuit([2, 3]));
                EXPECT.falsy(hand.sameSuit([1, 2, 3, 4]));
            });

            test('3 cards same suit', () => {
                hand.updateTypes([1, 3, 5, 14]);
                EXPECT.truthy(hand.sameSuit([0, 1, 2]));
                EXPECT.truthy(hand.sameSuit([0, 1]));
                EXPECT.truthy(hand.sameSuit([0, 2]));
                EXPECT.truthy(hand.sameSuit([1, 2]));
                EXPECT.falsy(hand.sameSuit([0, 1, 2, 3, 4]));
                EXPECT.falsy(hand.sameSuit([0, 1, 2, 3]));
                EXPECT.falsy(hand.sameSuit([1, 2, 3]));
                EXPECT.falsy(hand.sameSuit([1, 2, 3, 4]));
                EXPECT.falsy(hand.sameSuit([2, 3, 4]));
            });

            test('2 cards same suit', () => {
                hand.updateTypes([27, 14, 3, 4]);
                EXPECT.truthy(hand.sameSuit([2, 3]));
                EXPECT.falsy(hand.sameSuit([0, 1]));
                EXPECT.falsy(hand.sameSuit([0, 1, 2, 3]));
                EXPECT.falsy(hand.sameSuit([0, 1, 2]));
                EXPECT.falsy(hand.sameSuit([1, 2]));
                EXPECT.falsy(hand.sameSuit([2, 3, 4]));
                EXPECT.falsy(hand.sameSuit([3, 4]));
            });

            test('no cards same suit', () => {
                hand.updateTypes([1, 15, 29, 43]);
                EXPECT.falsy(hand.sameSuit([0, 1, 2, 3]));
                EXPECT.falsy(hand.sameSuit([0, 1, 2]));
                EXPECT.falsy(hand.sameSuit([0, 1]));
                EXPECT.falsy(hand.sameSuit([1, 2, 3]));
                EXPECT.falsy(hand.sameSuit([1, 2]));
                EXPECT.falsy(hand.sameSuit([3, 4]));
            });

        });

        describe('3 cards', () => {

            test('3 cards same suit', () => {
                hand.updateTypes([1, 3, 5]);
                EXPECT.truthy(hand.sameSuit([0, 1, 2]));
                EXPECT.truthy(hand.sameSuit([0, 1]));
                EXPECT.truthy(hand.sameSuit([0, 2]));
                EXPECT.truthy(hand.sameSuit([1, 2]));
            });

            test('2 cards same suit', () => {
                hand.updateTypes([14, 3, 4]);
                EXPECT.truthy(hand.sameSuit([1, 2]));
                EXPECT.falsy(hand.sameSuit([0, 1, 2]));
                EXPECT.falsy(hand.sameSuit([0, 1]));
                EXPECT.falsy(hand.sameSuit([0, 2]));
            });

            test('no cards same suit', () => {
                hand.updateTypes([1, 15, 29]);
                EXPECT.falsy(hand.sameSuit([0, 1, 2]));
                EXPECT.falsy(hand.sameSuit([0, 1]));
                EXPECT.falsy(hand.sameSuit([0, 2]));
                EXPECT.falsy(hand.sameSuit([1, 2]));
            });

        });

    });
}

// numeric value between cards at indexA and indexB or -1 if either card is a joker or an invalid index was entered
// public valueBetween(indexA: number, indexB: number): number {
function testValueBetween(): void {
    describe('valueBetween()', () => {

        test('-1 if either card is a joker', () => {
            hand.updateTypes([0, 1, 2, 3, 0]);
            EXPECT.toBe(hand.valueBetween(0, 1), -1);
            EXPECT.toBe(hand.valueBetween(1, 4), -1);
        });

        test('-1 if invalid index', () => {
            hand.updateTypes([0, 1, 2, 3, 0]);
            EXPECT.toBe(hand.valueBetween(1, 5), -1);
        });

        test('returns correct values between card ranks', () => {
            hand.updateTypes([1, 2, 3, 4, 13]);
            EXPECT.toBe(hand.valueBetween(0, 1), 1);
            EXPECT.toBe(hand.valueBetween(1, 0), 1);
            EXPECT.toBe(hand.valueBetween(0, 2), 2);
            EXPECT.toBe(hand.valueBetween(2, 0), 2);
            EXPECT.toBe(hand.valueBetween(0, 3), 3);
            EXPECT.toBe(hand.valueBetween(3, 0), 3);
            EXPECT.toBe(hand.valueBetween(0, 4), 12);
            EXPECT.toBe(hand.valueBetween(4, 0), 12);
            EXPECT.toBe(hand.valueBetween(1, 2), 1);
            EXPECT.toBe(hand.valueBetween(1, 3), 2);
            EXPECT.toBe(hand.valueBetween(1, 4), 11);
            EXPECT.toBe(hand.valueBetween(2, 3), 1);
            EXPECT.toBe(hand.valueBetween(2, 4), 10);
            EXPECT.toBe(hand.valueBetween(3, 4), 9);
        });

    });
}

// all cards in the hand have the same rank
// public allSameRank(): boolean {
function testAllSameRank(): void {
    describe('allSameRank()', () => {

        test('4 cards all the same rank returns true', () => {
            hand.updateTypes([1, 14, 27, 40]);
            EXPECT.truthy(hand.allSameRank());
        });

        test('4 cards not the same rank returns false', () => {
            hand.updateTypes([1, 14, 27, 41]);
            EXPECT.falsy(hand.allSameRank());
        });

        test('3 cards all the same rank returns true', () => {
            hand.updateTypes([1, 14, 27]);
            EXPECT.truthy(hand.allSameRank());
        });

        test('3 cards not the same rank returns false', () => {
            hand.updateTypes([1, 14, 28]);
            EXPECT.falsy(hand.allSameRank());
        });

    });
}

// all cards in the hand have the same suit
// public allSameSuit(): boolean {
function testAllSameSuit(): void {
    describe('allSameSuit()', () => {

        test('5 cards all the same suit returns true', () => {
            hand.updateTypes([1, 3, 4, 5, 9]);
            EXPECT.truthy(hand.allSameSuit());
        });

        test('5 cards not the same suit returns false', () => {
            hand.updateTypes([1, 3, 4, 5, 19]);
            EXPECT.falsy(hand.allSameSuit());
        });

        test('4 cards all the same suit returns true', () => {
            hand.updateTypes([1, 3, 4, 5]);
            EXPECT.truthy(hand.allSameSuit());
        });

        test('4 cards not the same suit returns false', () => {
            hand.updateTypes([14, 3, 4, 5]);
            EXPECT.falsy(hand.allSameSuit());
        });

        test('3 cards all the same suit returns true', () => {
            hand.updateTypes([1, 4, 5]);
            EXPECT.truthy(hand.allSameSuit());
        });

        test('3 cards not the same suit returns false', () => {
            hand.updateTypes([1, 4, 18]);
            EXPECT.falsy(hand.allSameSuit());
        });

    });
}

// NO cards in the hand have the same rank
// public noSameRanks(): boolean {
function testNoSameRanks(): void {
    describe('noSameRanks()', () => {

        describe('5 cards', () => {

            test('5 cards the same rank', () => {
                hand.updateTypes([1, 1, 14, 27, 40]);
                EXPECT.falsy(hand.noSameRanks());
            });

            test('4 cards the same rank', () => {
                hand.updateTypes([2, 1, 14, 27, 40]);
                EXPECT.falsy(hand.noSameRanks());
            });

            test('3 cards the same rank', () => {
                hand.updateTypes([2, 3, 14, 27, 40]);
                EXPECT.falsy(hand.noSameRanks());
            });

            test('2 cards the same rank', () => {
                hand.updateTypes([2, 3, 4, 27, 40]);
                EXPECT.falsy(hand.noSameRanks());
            });

            test('no cards the same rank', () => {
                hand.updateTypes([2, 3, 4, 5, 40]);
                EXPECT.truthy(hand.noSameRanks());
            });

        });

        describe('4 cards', () => {

            test('4 cards the same rank', () => {
                hand.updateTypes([1, 14, 27, 40]);
                EXPECT.falsy(hand.noSameRanks());
            });

            test('3 cards the same rank', () => {
                hand.updateTypes([2, 14, 27, 40]);
                EXPECT.falsy(hand.noSameRanks());
            });

            test('2 cards the same rank', () => {
                hand.updateTypes([2, 3, 27, 40]);
                EXPECT.falsy(hand.noSameRanks());
            });

            test('no cards the same rank', () => {
                hand.updateTypes([2, 3, 4, 5]);
                EXPECT.truthy(hand.noSameRanks());
            });

        });

        describe('3 cards', () => {

            test('3 cards the same rank', () => {
                hand.updateTypes([14, 27, 40]);
                EXPECT.falsy(hand.noSameRanks());
            });

            test('2 cards the same rank', () => {
                hand.updateTypes([2, 27, 40]);
                EXPECT.falsy(hand.noSameRanks());
            });

            test('no cards the same rank', () => {
                hand.updateTypes([2, 3, 4]);
                EXPECT.truthy(hand.noSameRanks());
            });

        });

    });
}

/**
 * UTILITY FUNCTIONS
 */

function sameArray<t>(a: t[], b: t[]): boolean {
    return a.join() === b.join();
}