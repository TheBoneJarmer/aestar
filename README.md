# Aestar

Aestar is an A* pathfinding algorithm library for TypeScript which uses async calls to calculate the path and supports dynamic updating of grids. Unlike most A* star pathfinding libraries Aestar does not use a multidimensional array but a class instead. This allows for easier access to grid nodes and dynamically updating those nodes.

## Installation
```
npm install aestar
```

## Usage
```ts
import {Grid, Pathfinder} from "aestar";

const grid: Grid = new Grid(30, 20);
const pathfinder: Pathfinder = new Pathfinder();

// Let's block some nodes first on the grid
for (let x=0; x<30; x++) {
    for (let y=0; y<30; y++) {
        const blocked = Math.random() > 0.5;
        const node = grid.getNode(x, y);
        node.blocked = blocked;
    
        // Optional way to access the node is by calculating the index and modifying it from there
        grid.nodes[x * grid.height + y].blocked = blocked;
    }
}

// Now find a path
const nodeStart = grid.getNode(3, 3);
const nodeEnd = grid.getNode(20, 20);
const path = await pathfinder.findPath(grid, nodeStart, nodeEnd);

// If the path is null it means no path was found
if (path == null) {
    console.log("No path found");
    return;
}

// Otherwise log it
for (let node of path) {
    console.log(node);
}
```

## Contribution
Pull requests are welcome. But if you want to make changes, please do so on the **develop** branch. Thanks!

## License
[MIT](./LICENSE)