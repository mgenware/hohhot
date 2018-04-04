import * as ts from 'typescript';
import { Parser, Node, NodeType } from '../base';

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
}

export class VariableStatementParser extends Parser {
  nodeType(): NodeType {
    return NodeType.VariableStatement;
  }

  parse(): VariableStatement {
    const statement = this.src as ts.VariableStatement;
    const decList = statement.declarationList;
    const parsedDecList = decList.declarations.map((dec) => {
      return this.parseVariableDeclaration(dec);
    });
    return new VariableStatement(parsedDecList);
  }

  private parseVariableDeclaration(dec: ts.VariableDeclaration): VariableDeclaration {
    if (dec.name.kind === ts.SyntaxKind.Identifier) {
      const decID = dec.name as ts.Identifier;
      return new VariableDeclaration(ts.idText(decID));
    }
    throw new Error(`Unsupported VariableDeclaration.name.kind: ${dec.name.kind}`);
  }
}
