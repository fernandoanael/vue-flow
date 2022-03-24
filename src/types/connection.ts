import { CSSProperties } from 'vue'
import { Position } from './flow'
import { GraphNode } from './node'
import { HandleElement, HandleType } from './handle'

/** Connection line types (same as default edge types */
export enum ConnectionLineType {
  Bezier = 'default',
  Straight = 'straight',
  Step = 'step',
  SmoothStep = 'smoothstep',
}

/** Connection params that are passed when onConnect is called */
export interface Connection {
  /** Source node id */
  source: string | null
  /** Target node id */
  target: string | null
  /** Source handle id */
  sourceHandle: string | null
  /** Target handle id */
  targetHandle: string | null
}

/** The source nodes params when connection is initiated */
export type OnConnectStartParams = {
  /** Source node id */
  nodeId?: string
  /** Source handle id */
  handleId?: string
  /** Source handle type */
  handleType?: HandleType
}

/** Connection modes, when set to loose all handles are treated as source */
export enum ConnectionMode {
  Strict = 'strict',
  Loose = 'loose',
}

export type SetConnectionId = {
  connectionNodeId: string | undefined
  connectionHandleId: string | undefined
  connectionHandleType: HandleType | undefined
}

export interface ConnectionLineProps<N = any> {
  /** Source X position of the connection line */
  sourceX: number
  /** Source Y position of the connection line */
  sourceY: number
  /** Source position of the connection line */
  sourcePosition: Position
  /** Target X position of the connection line */
  targetX: number
  /** Target Y position of the connection line */
  targetY: number
  /** Target position of the connection line */
  targetPosition: Position
  connectionLineType: ConnectionLineType
  connectionLineStyle: CSSProperties
  /** All currently stored nodes */
  nodes: GraphNode<N>[]
  /** The source node of the connection line */
  sourceNode: GraphNode<N>
  /** The source handle element of the connection line */
  sourceHandle: HandleElement
}
