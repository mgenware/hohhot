import * as ts from 'typescript';

export enum NodeType {
  VariableStatement = 1,
}

export class Node {
  nodeType(): NodeType {
    throw new Error('Not implemented yet');
  }

  get type(): NodeType {
    return this.nodeType();
  }
}

export function ast(src: string): ts.Statement[] {
  const srcFile = ts.createSourceFile('t', src, ts.ScriptTarget.Latest);
  return [...srcFile.statements];
}

export function astNode(src: string): ts.Statement {
  return ast(src)[0];
}
