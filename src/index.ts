interface TileCoderParams {
    dimensions: number;
    tiles: number;
    tilings: number;
    actions?: number;
}

export class TileCoder {
    private tilesPerTiling: number;
    private tileLength: number;
    private tilingDistance: number;

    constructor(private params: TileCoderParams) {
        // each dimension gets tiled together by default
        this.tilesPerTiling = Math.pow(params.tiles, params.dimensions);
        this.tileLength = params.tiles !== 1
            ? 1 / (params.tiles - 1)
            : 1;

        this.tilingDistance = params.tilings !== 1
            ? this.tileLength / (params.tilings - 1)
            : 0;
    }

    get_indices(pos: Record<number, number>, action?: number): number[] {
        const indices = times(this.params.tilings, () => 0);
        for (let ntl = 0; ntl < this.params.tilings; ++ntl) {
            let ind = 0;
            for (let d = 0; d < this.params.dimensions; ++d) {
                ind += relu(Math.round(((pos[d] - this.tilingDistance * ntl) + 1e-12) / this.tileLength) * Math.pow(this.params.tiles, d));
            }
            indices[ntl] = ind + this.tilesPerTiling * ntl;
        }

        if (!this.params.actions || !action) return indices;

        for (let i = 0; i < this.params.tilings; ++i) indices[i] += action * this.tilesPerTiling * this.params.tilings;
        return indices;
    }

}

function relu(x: number): number {
    return x < 0 ? 0 : x;
}

function times<T>(t: number, f: (x: number) => T): T[] {
    const ret = [] as T[];
    for (let i = 0; i < t; ++i) ret.push(f(i));

    return ret;
}
