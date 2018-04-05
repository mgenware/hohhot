import * as ts from 'typescript';
import { Node, NodeType } from '../base';

export class TypeReferenceNode {
  static fromNode(node: ts.TypeReferenceNode) {
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
  static fromNode(rawDec: ts.VariableDeclaration): VariableDeclaration {
    if (rawDec.name.kind === ts.SyntaxKind.Identifier) {
      // Name
      const name = rawDec.name as ts.Identifier;
      const dec = new VariableDeclaration(ts.idText(name));

      // Type
      if (rawDec.type && ts.isTypeReferenceNode(rawDec.type)) {
        dec.type = TypeReferenceNode.fromNode(rawDec.type);
      }
      return dec;
    }
    throw new Error(`Unsupported VariableDeclaration.name.kind: ${rawDec.name.kind}`);
  }

  type?: TypeReferenceNode;

  constructor(
    public id: string,
  ) {}
}

export class VariableStatement extends Node {
  static fromNode(node: ts.VariableStatement): VariableStatement {
    const statement = node as ts.VariableStatement;
    const decList = statement.declarationList;
    const parsedDecList = decList.declarations.map((dec) => {
      return VariableDeclaration.fromNode(dec);
    });
    return new VariableStatement(parsedDecList);
  }

  constructor(
    public declarationList: VariableDeclaration[],
  ) {
    super();
  }

  nodeType(): NodeType {
    return NodeType.VariableStatement;
  }
}
