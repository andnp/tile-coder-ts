import { TileCoder } from '../src';

test('Can encode a single variable with a single set of tilings', () => {
    const tc = new TileCoder({
        dimensions: 1,
        tiles: 10,
        tilings: 1,
        actions: 2,
    });

    for (let a = 0; a < 2; ++a) {
        for (let i = 0; i < 10; ++i) {
            const s = i / 9;
            const got = tc.get_indices([s], a);
            expect(got).toEqual([i + a * 10]);
        }
    }
});

test('Can encode two variables with a single set of tilings', () => {
    const tc = new TileCoder({
        dimensions: 2,
        tiles: 10,
        tilings: 1,
        actions: 2,
    });

    for (let a = 0; a < 2; ++a) {
        for (let i = 0; i < 10; ++i) {
            for (let j = 0; j < 10; ++j) {
                const s = [i / 9, j / 9];
                const got = tc.get_indices(s, a);
                expect(got).toEqual([i + j * 10 + a * 100]);
            }
        }
    }
});

test('Can encode one variable with multiple tilings', () => {
    const tc = new TileCoder({
        dimensions: 1,
        tiles: 7,
        tilings: 4,
        actions: 3,
    });

    for (let a = 0; a < 3; a++) {
        for (let i = 0; i < 7; ++i) {
            const s = [i / 6];
            const got = tc.get_indices(s, a);
            expect(got[0]).toEqual(i + a * 28);
            expect(got.length).toBe(4);
        }
    }
});
