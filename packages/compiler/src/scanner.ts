import { Project, SyntaxKind } from 'ts-morph'
import { GenerateSchemaOptions } from './generator'

import crypto from 'node:crypto'

export function scanAskCalls(): GenerateSchemaOptions[] {
  const project = new Project({
    tsConfigFilePath: './tsconfig.json',
  })

  const calls: GenerateSchemaOptions[] = []

  for (const sourceFile of project.getSourceFiles()) {
    sourceFile.forEachDescendant(
      (node) => {
        if (
          !node.isKind(
            SyntaxKind.CallExpression,
          )
        ) {
          return
        }

        const callExpression =
          node.asKindOrThrow(
            SyntaxKind.CallExpression,
          )

        const expression =
          callExpression.getExpression()

        if (
          !expression.isKind(
            SyntaxKind.PropertyAccessExpression,
          )
        ) {
          return
        }

        const propertyAccess =
          expression.asKindOrThrow(
            SyntaxKind.PropertyAccessExpression,
          )

        const methodName =
          propertyAccess.getName()

        if (methodName !== 'ask') {
          return
        }

        const typeArgs = callExpression.getTypeArguments()
        if (!typeArgs.length) {
          return
        }

        const typeArg = typeArgs[0]
        const typeName = typeArg?.getText() ?? 'UnknownType'
        const typeSymbol = typeArg?.getType().getSymbol()

        if (!typeSymbol) {
          return
        }

        const declarations = typeSymbol.getDeclarations()
        if (!declarations.length) {
          return
        }

        const declaration = declarations[0]
        const declarationFilePath = declaration?.getSourceFile().getFilePath() ?? ''
        
        const sourceFile = node.getSourceFile()
        const line = node.getStartLineNumber()
        const column = node.getNonWhitespaceStart()
        const callSite = `${sourceFile.getFilePath()}:${line}:${column}`

        console.log(
          'FOUND:',
          typeName,
          'in',
          declarationFilePath,
          callSite
        )

        calls.push({
          typeId: createTypeId(declarationFilePath, typeName),
          typeName: typeName,
          declarationFilePath: declarationFilePath,
          callSite
        })
      },
    )
  }

  return calls
}

export function createTypeId(filePath: string, typeName: string) {
  return crypto
    .createHash('sha1')
    .update(
      `${filePath}::${typeName}`,
    )
    .digest('hex')
}