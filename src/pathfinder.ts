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

    public async findPath(grid: Grid, startNode: Node, endNode: Node): Promise<Node[]> {
        if (startNode == null || endNode == null) {
            return null;
        }

        let toSearch: Node[] = [startNode];
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

            if (current == endNode) {
                let path: Node[] = [];
                let pathNode = endNode;

                while (pathNode != null && pathNode != startNode) {
                    path.push(pathNode);
                    pathNode = pathNode.connection;
                }

                let result: Node[] = [startNode];

                for (let i = path.length - 1; i > 0; i--) {
                    result.push(path[i]);
                }

                // Add the end node as well
                result.push(endNode);

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
                        neighbour.h = this.getDistance(neighbour, endNode);
                        toSearch.push(neighbour);
                    }
                }
            }
        }
    }
}