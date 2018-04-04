import * as ts from 'typescript';

export enum NodeType {
  VariableStatement = 1,
}

export class Node {
  nodeType(): NodeType {
    throw new Error('Not implemented yet');
  }
}

export class Parser {
  src: ts.Node;

  parse(): Node {
    throw new Error('Not implemented yet');
  }
}
