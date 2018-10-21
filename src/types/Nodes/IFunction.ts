import NodeNames from '../../enum/NodeNames'
import { paramParser } from '../../utils/Params'
import { IExpression } from '../Params'
import { IToken } from '../Tokens'
import AbstractBodyNode from './AbstractBodyNode'

export default class IFunction extends AbstractBodyNode {
  public params? : IExpression

  constructor (token : IToken) {
    super(NodeNames.Function, token)
    this.params = paramParser(token.start, token.end, token.params)
    this.body = []
  }
}
