import { buildNode, NodeType } from '../base';
import { VariableStatement, TypeReferenceNode } from '../../lib/core/VariableStatement';

test('Single var', () => {
  const node = buildNode('var xy;') as VariableStatement;
  expect(node.type).toBe(NodeType.VariableStatement);

  const decList = node.declarationList;
  expect(decList.length).toBe(1);

  const dec = decList[0];
  expect(dec.id).toBe('xy');
  expect(dec.type).toBeUndefined();
});

test('Multiple vars', () => {
  const node = buildNode('var a,b,c;') as VariableStatement;
  expect(node.type).toBe(NodeType.VariableStatement);

  const decList = node.declarationList;
  expect(decList.length).toBe(3);

  const values = ['a', 'b', 'c'];
  for (let i = 0; i < decList.length; i++) {
    expect(decList[i].id).toBe(values[i]);
    expect(decList[i].type).toBeUndefined();
  }
});

test('Multiple vars with types', () => {
  const node = buildNode('var a:Type1,b,c:Type2;') as VariableStatement;
  expect(node.type).toBe(NodeType.VariableStatement);

  const decList = node.declarationList;
  expect(decList.length).toBe(3);

  const values = ['a', 'b', 'c'];
  const types = ['Type1', undefined, 'Type2'];

  for (let i = 0; i < decList.length; i++) {
    const dec = decList[i];
    expect(dec.id).toBe(values[i]);

    const typeName = types[i];
    if (typeName) {
      const typeNode = dec.type as TypeReferenceNode;
      expect(typeNode.name).toBe(typeName);
    } else {
      expect(dec.type).toBeUndefined();
    }
  }
});
