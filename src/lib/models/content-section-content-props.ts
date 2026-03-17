import type { Milestone } from './milestone';

export interface ContentProps<T extends Milestone = Milestone> {
	selectedItem?: T | null;
	onSelect?: (milestone: T) => void;
	onDeselect?: () => void;
}
