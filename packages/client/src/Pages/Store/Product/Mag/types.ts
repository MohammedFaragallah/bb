import { CSSProperties } from 'react';

export type Width = CSSProperties['width'];
export type Height = CSSProperties['height'];
export type Position = number;
export type Opacity = CSSProperties['opacity'];
export type Duration = CSSProperties['transitionDuration'];
export type Color = CSSProperties['color'];

export interface Dimensions {
	width: Width;
	height: Height;
}
