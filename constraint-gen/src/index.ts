import { Types, PluginFunction, getBaseType } from '@graphql-codegen/plugin-helpers';
import { ArgumentNode,  DirectiveNode,  GraphQLSchema, InputObjectTypeDefinitionNode, InputValueDefinitionNode } from 'graphql';
import fs from 'fs';
import path from 'path';

type ConstrainedFieldType = 'string' | 'number'

const getConstrainedFieldType = (value: string): ConstrainedFieldType | null => {
  switch (value) {
    case 'String':
      return 'string'
    case 'Int':
      return 'number'
  }
  return null;
}

interface ConstrainedField {
  name: string,
  required: boolean,
  type: ConstrainedFieldType
  args: ReadonlyArray<ArgumentNode>
}

const getConstraintDirective = (field: InputValueDefinitionNode): DirectiveNode | null => {
  if (field.directives) {
    const constraintDir = field.directives.filter(directives => { return directives.name.value === 'constraint' })
    if (constraintDir.length > 0) {
      return constraintDir[0];
    }
  }
  return null
}

const getConstrainedFields = (node: InputObjectTypeDefinitionNode): ReadonlyArray<ConstrainedField> => {
  const fields = (node.fields || []).filter(field => {
    return getConstraintDirective(field);
  });

  return fields.map(field => {
    let required = false;
    let type: ConstrainedFieldType | null = null;

    if (field.type.kind === 'NonNullType') {
      required = true;
      if (field.type.type.kind === 'NamedType') {
        type = getConstrainedFieldType(field.type.type.name.value)
      }
    }
    else if (field.type.kind === 'NamedType') {
      type = getConstrainedFieldType(field.type.name.value)
    }

    if (type === null) {
      throw Error(`Unsupported field type ${field.name.value}`)
    }

    return {
      name: field.name.value,
      required,
      type,
      args: getConstraintDirective(field)!.arguments || []
    }
  });
}

export const plugin: PluginFunction = (
  schema: GraphQLSchema,
  documents: Types.DocumentFile[],
  config
) => {
  const output: Array<String> = [];

  const inputNode: Array<InputObjectTypeDefinitionNode> = []

  const typesMap = schema.getTypeMap();
  for (let key in typesMap) {
    const node = typesMap[key]
    if (node.astNode && node.astNode.kind == 'InputObjectTypeDefinition') {
      inputNode.push(node.astNode)
    }
  }


  output.push(`import Joi from 'joi'`)
  output.push('')
  output.push(fs.readFileSync(path.join(__dirname, './lib.ts'), 'utf-8'))

  inputNode.forEach(node => {
    const directive = node.directives?.find((node) => node.name.value === 'constraint')
    const arg = directive?.arguments?.find((arg) => arg.name.value === 'errorType')
    const errorType = arg?.value.kind === 'StringValue' ? arg.value.value : null

    const name = node.name.value.charAt(0).toLocaleLowerCase() + node.name.value.slice(1)
    output.push(`export const ${name}Schema = new In(`)
    output.push(`  '${errorType}',`)
    output.push(`  Joi.object({`)
    getConstrainedFields(node).forEach(field => {
      const constraints = field.args.map(constraint => {
        if (constraint.name.value === 'joi' && constraint.value.kind === 'StringValue') {
          return constraint.value.value;
        }
        return undefined;
      })
      output.push(`    ${field.name}: ` +
                         `Joi.${field.type}()` +
                         `${field.required ? '.required()' : ''}` +
                         `${constraints.join('')},`)
    })
    output.push(`  })`)
    output.push(`);`)
    output.push('')
  })

  return output.join('\n');
}
