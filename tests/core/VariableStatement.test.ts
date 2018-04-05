import { buildNode, NodeType } from '../base';
import { VariableStatement } from '../../lib/core/VariableStatement';

test('VariableStatement.test', () => {
  const node = buildNode('var i;') as VariableStatement;
  expect(node.type).toBe(NodeType.VariableStatement);
});
