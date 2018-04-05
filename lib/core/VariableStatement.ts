import * as ts from 'typescript';
import { Node, NodeType } from '../base';

export class TypeReferenceNode {
  static fromTypeReferenceNode(node: ts.TypeReferenceNode) {
    if (ts.isIdentifier(node.typeName)) {
      const id = node.typeName as ts.Identifier;
      const name = ts.idText(id);
      return new TypeReferenceNode(name);
    }
    throw new Error(`node.typeName is not an identifier`);
  }

  constructor(
    public name: string,
  ) {}
}

export class VariableDeclaration {
  type?: TypeReferenceNode;

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

function parseVariableDeclaration(rawDec: ts.VariableDeclaration): VariableDeclaration {
  if (rawDec.name.kind === ts.SyntaxKind.Identifier) {
    // Name
    const name = rawDec.name as ts.Identifier;
    const dec = new VariableDeclaration(ts.idText(name));

    // Type
    if (rawDec.type && ts.isTypeReferenceNode(rawDec.type)) {
      dec.type = TypeReferenceNode.fromTypeReferenceNode(rawDec.type);
    }
    return dec;
  }
  throw new Error(`Unsupported VariableDeclaration.name.kind: ${rawDec.name.kind}`);
}

export function parseVariableStatement(node: ts.VariableStatement): VariableStatement {
  const statement = node as ts.VariableStatement;
  const decList = statement.declarationList;
  const parsedDecList = decList.declarations.map((dec) => {
    return parseVariableDeclaration(dec);
  });
  return new VariableStatement(parsedDecList);
}
