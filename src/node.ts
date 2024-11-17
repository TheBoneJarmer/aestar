export class Node {
    private _x: number = 0;
    private _y: number = 0;
    private _g: number = 0;
    private _h: number = 0;
    private _blocked: boolean = false;
    private _connection: Node = null;

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    get g(): number {
        return this._g;
    }

    set g(value: number) {
        this._g = value;
    }

    get h(): number {
        return this._h;
    }

    set h(value: number) {
        this._h = value;
    }

    get blocked(): boolean {
        return this._blocked;
    }

    set blocked(value: boolean) {
        this._blocked = value;
    }

    get connection(): Node {
        return this._connection;
    }

    set connection(value: Node) {
        this._connection = value;
    }

    public get f(): number {
        return this._g + this._h;
    }

    public constructor(x: number, y:number) {
        this._x = x;
        this._y = y;
    }
}