import NodeNames from '../../enum/NodeNames'
import { paramParser } from '../../utils/Params'
import { IExpression } from '../Params'
import { IToken } from '../Tokens'
import AbstractNode from './AbstractNode'

export default class ICondition extends AbstractNode {
  public params? : IExpression
  public consequent : AbstractNode[]
  public alternate? : AbstractNode[]

  get hasBody () : boolean {
    return true
  }

  constructor (token : IToken) {
    super(NodeNames.Condition, token)
    this.params = paramParser(token.start, token.end, token.params)
    this.consequent = []
  }

  public addToNode (child : AbstractNode) {
    this.alternate ? this.alternate.push(child) : this.consequent.push(child)
  }
}
