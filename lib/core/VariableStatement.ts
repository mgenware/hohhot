import * as ts from 'typescript';
import { Node, NodeType } from '../base';

export class VariableDeclaration {
  constructor(
    public id: string,
  ) {}
}

export class VariableStatement extends Node {
  constructor(
    public declarationList: VariableDeclaration[],
  ) {
    super();
  }

  nodeType(): NodeType {
    return NodeType.VariableStatement;
  }
}

function parseVariableDeclaration(dec: ts.VariableDeclaration): VariableDeclaration {
  if (dec.name.kind === ts.SyntaxKind.Identifier) {
    const decID = dec.name as ts.Identifier;
    return new VariableDeclaration(ts.idText(decID));
  }
  throw new Error(`Unsupported VariableDeclaration.name.kind: ${dec.name.kind}`);
}

export function parseVariableStatement(node: ts.VariableStatement): VariableStatement {
  const statement = node as ts.VariableStatement;
  const decList = statement.declarationList;
  const parsedDecList = decList.declarations.map((dec) => {
    return parseVariableDeclaration(dec);
  });
  return new VariableStatement(parsedDecList);
}
