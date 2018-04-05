import Builder from '../lib/builder';
import { astNode, Node } from '../lib/base';
export { NodeType } from '../lib/base';

export function buildNode(src: string): Node {
  const node = astNode(src);
  return Builder.buildNode(node);
}
