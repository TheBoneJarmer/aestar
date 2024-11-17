import {Node} from "./node";
import {Grid} from "./grid";

export class Pathfinder {
    private getDistance(node1: Node, node2: Node): number {
        let x = node1.x - node2.x;
        let y = node1.y - node2.y;

        return Math.sqrt(x * x + y * y);
    }

    private getNeighbours(grid: Grid, node: Node): Node[] {
        let result: Node[] = [];
        result[0] = grid.getNode(node.x, node.y - 1);
        result[1] = grid.getNode(node.x + 1, node.y);
        result[2] = grid.getNode(node.x, node.y + 1);
        result[3] = grid.getNode(node.x - 1, node.y);

        return result;
    }

    public findPath(grid: Grid, x1: number, y1: number, x2: number, y2: number): Node[] {
        const start = grid.getNode(x1, y1);
        const end = grid.getNode(x2, y2);

        if (start == null || end == null) {
            return null;
        }

        let toSearch: Node[] = [start];
        let processed: Node[] = [];

        while (toSearch.length > 0) {
            let current = toSearch[0];
            let currentIndex = 0;

            for (let i = 0; i < toSearch.length; i++) {
                const other = toSearch[i];

                if (other.f < current.f || other.f == current.f && other.h < current.h) {
                    current = other;
                    currentIndex = i;
                }
            }

            processed.push(current);
            toSearch.splice(currentIndex, 1);

            if (current.x == end.x && current.y == end.y) {
                let path: Node[] = [];
                let pathNode = end;

                while (pathNode != null && pathNode.x != start.x && pathNode.y != start.y) {
                    path.push(pathNode);
                    pathNode = pathNode.connection;
                }

                let result: Node[] = [];
                result.push(start);

                for (let i = path.length - 1; i > 0; i--) {
                    result.push(path[i]);
                }

                // Add the end node as well
                result.push(end);

                return result;
            }

            for (let neighbour of this.getNeighbours(grid, current)) {
                let isInSearch = toSearch.indexOf(neighbour) > -1;
                let isInProcessed = processed.indexOf(neighbour) > -1;

                if (neighbour == null || neighbour.blocked || isInProcessed) {
                    continue;
                }

                let costToNeighbour = current.g + this.getDistance(current, neighbour);

                if (!isInSearch || costToNeighbour < neighbour.g) {
                    neighbour.g = costToNeighbour;
                    neighbour.connection = current;

                    if (!isInSearch) {
                        neighbour.h = this.getDistance(neighbour, end);
                        toSearch.push(neighbour);
                    }
                }
            }
        }
    }
}