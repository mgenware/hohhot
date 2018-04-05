import { buildNode, NodeType } from '../base';
import { VariableStatement } from '../../lib/core/VariableStatement';

test('Single var', () => {
  const node = buildNode('var xy;') as VariableStatement;
  expect(node.type).toBe(NodeType.VariableStatement);

  const decList = node.declarationList;
  expect(decList.length).toBe(1);

  const dec = decList[0];
  expect(dec.id).toBe('xy');
});
