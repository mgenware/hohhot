import { Node } from './base';
import * as ts from 'typescript';
import { parseVariableStatement } from './core/VariableStatement';

export default class Builder {
  static buildNode(node: ts.Node): Node {
    switch (node.kind) {
      case ts.SyntaxKind.VariableStatement: return parseVariableStatement(node as ts.VariableStatement);
    }

    throw new Error(`node.type not supported: ${node.kind}`);
  }
}
