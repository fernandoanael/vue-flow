import type { CSSProperties, Component, VNode } from 'vue'
import type { ClassFunc, ElementData, Position, StyleFunc, Styles } from './flow'
import type { GraphNode } from './node'
import type { DefaultEdgeTypes, EdgeComponent, EdgeTextProps } from './components'
import type { CustomEvent, EdgeEventsHandler, EdgeEventsOn } from './hooks'

/** Edge markers */
export enum MarkerType {
  Arrow = 'arrow',
  ArrowClosed = 'arrowclosed',
}

/** Edge marker definition */
export interface EdgeMarker {
  /** Unique marker id */
  id?: string
  /** Marker type */
  type: MarkerType
  /** Marker color */
  color?: string
  /** Marker width */
  width?: number
  /** Marker height */
  height?: number
  /** Marker units */
  markerUnits?: string
  /** Marker orientation */
  orient?: string
  /** Marker stroke width */
  strokeWidth?: number
}

export interface MarkerProps {
  id: string
  type: MarkerType | string
  color?: string
  width?: number
  height?: number
  markerUnits?: string
  orient?: string
  strokeWidth?: number
}

export type EdgeMarkerType = string | MarkerType | EdgeMarker

export type EdgeUpdatable = boolean | 'target' | 'source'

export interface EdgeLabelOptions {
  /** Label styles (CSSProperties) */
  labelStyle?: CSSProperties
  /** Show label bg */
  labelShowBg?: boolean
  /** Label Bg styles (CSSProperties) */
  labelBgStyle?: CSSProperties
  /** Label Bg padding */
  labelBgPadding?: [number, number]
  /** Label Bg border radius */
  labelBgBorderRadius?: number
}

export interface DefaultEdge<Data = ElementData, CustomEvents extends Record<string, CustomEvent> = any>
  extends EdgeLabelOptions {
  /** Unique edge id */
  id: string
  /** An edge label */
  label?: string | VNode | Component<EdgeTextProps>
  /** Edge type, can be a default type or a custom type */
  type?: keyof DefaultEdgeTypes | string
  /** Source node id */
  source: string
  /** Target node id */
  target: string
  /** Source handle id */
  sourceHandle?: string | null
  /** Target handle id */
  targetHandle?: string | null
  /** Animated edge */
  animated?: boolean
  /** EdgeMarker */
  markerStart?: EdgeMarkerType
  /** EdgeMarker */
  markerEnd?: EdgeMarkerType
  /** Disable/enable updating edge */
  updatable?: EdgeUpdatable
  /** Disable/enable selecting edge */
  selectable?: boolean
  /** Disable/enable focusing edges (a11y) */
  focusable?: boolean
  /** Additional class names, can be a string or a callback returning a string (receives current flow element) */
  class?: string | ClassFunc<GraphEdge<Data, CustomEvents>>
  /** Additional styles, can be an object or a callback returning an object (receives current flow element) */
  style?: Styles | StyleFunc<GraphEdge<Data, CustomEvents>>
  /** Is edge hidden */
  hidden?: boolean
  /** Radius of mouse event triggers (to ease selecting edges), defaults to 2 */
  interactionWidth?: number
  /** Overwrites current edge type */
  template?: EdgeComponent
  /** Additional data that is passed to your custom components */
  data?: Data
  /** contextual and custom events of edge */
  events?: Partial<EdgeEventsHandler<CustomEvents>>
  /** Aria label for edge (a11y) */
  ariaLabel?: string | null
}

export interface SmoothStepPathOptions {
  offset?: number
  borderRadius?: number
}

export type SmoothStepEdgeType<Data = ElementData, CustomEvents extends Record<string, CustomEvent> = any> = DefaultEdge<
  Data,
  CustomEvents
> & {
  type: 'smoothstep'
  pathOptions?: SmoothStepPathOptions
}

export interface BezierPathOptions {
  curvature?: number
}

export type BezierEdgeType<Data = ElementData, CustomEvents extends Record<string, CustomEvent> = any> = DefaultEdge<
  Data,
  CustomEvents
> & {
  type: 'default'
  pathOptions?: BezierPathOptions
}

export type Edge<Data = ElementData, CustomEvents extends Record<string, CustomEvent> = any> =
  | DefaultEdge<Data, CustomEvents>
  | SmoothStepEdgeType<Data, CustomEvents>
  | BezierEdgeType<Data, CustomEvents>

export type DefaultEdgeOptions = Omit<Edge, 'id' | 'source' | 'target' | 'sourceHandle' | 'targetHandle'>

export interface EdgePositions {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
}

/** Internal edge type */
export type GraphEdge<Data = ElementData, CustomEvents extends Record<string, CustomEvent> = any> = Edge<Data, CustomEvents> & {
  selected?: boolean
  z?: number
  sourceNode: GraphNode
  targetNode: GraphNode
  data: Data
  events: Partial<EdgeEventsHandler<CustomEvents>>
} & EdgePositions

/** these props are passed to edge components */
export interface EdgeProps<Data = ElementData, CustomEvents = {}> extends EdgeLabelOptions, EdgePositions {
  id: string
  sourceNode: GraphNode
  targetNode: GraphNode
  type?: keyof DefaultEdgeTypes | string
  label?: string | VNode | Component<EdgeTextProps> | Object
  style?: CSSProperties
  selected?: boolean
  sourcePosition: Position
  targetPosition: Position
  sourceHandleId?: string
  targetHandleId?: string
  source: string
  target: string
  animated?: boolean
  updatable?: boolean
  markerStart: string
  markerEnd: string
  curvature?: number
  interactionWidth?: number
  data: Data
  /** contextual and custom events of edge */
  events: EdgeEventsOn<CustomEvents>
}

export interface BaseEdgeProps extends EdgeLabelOptions {
  labelX?: number
  labelY?: number
  path: string
  label?: any
  markerStart?: string
  markerEnd?: string
  interactionWidth?: number
}
