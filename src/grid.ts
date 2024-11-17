import {Node} from "./node";

export class Grid {
    private _width: number = 0;
    private _height: number = 0;
    private _nodes: Node[] = [];

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    get nodes(): Node[] {
        return this._nodes;
    }

    public getNode(x: number, y: number): Node {
        if (x < 0 || y < 0 || x > this._width || y > this._height) {
            return null;
        }

        return this.nodes[x * this._height + y];
    }

    public setNode(x: number, y: number, node: Node) {
        if (x < 0 || y < 0 || x > this._width || y > this._height) {
            return;
        }

        this._nodes[x * this._height + y] = node;
    }

    public constructor(width: number, height: number) {
        this._width = width;
        this._height = height;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                this._nodes[x * height + y] = new Node(x, y);
            }
        }
    }
}