import type { SvelteComponent } from 'svelte';
import { BANNERS } from "~/lib/shared/utils";

export type SvelteComponentGeneric = typeof SvelteComponent<Record<string, unknown>>;

export type Modal = {
	/** An ID is autogenerated when calling `openModal` */
	id: number;
	/**
	 * The component that is rendered.
	 * This component should be wrapped in <C.Modal> ... </C.Modal>
	 */
	component: SvelteComponentGeneric;
	/** Props passed to the component */
	props?: Record<string, unknown>;
};

export type User = {
	id: number;
	googleId: string;
	username: string;
	playerTag: string | null;
	level: number | null;
}

export type Session = {
	id: string;
	userId: number;
	expiresAt: Date;
}

export type TownHall = {
	level: number;
	maxBarracks: number;
	maxDarkBarracks: number;
	maxLaboratory: number;
	maxSpellFactory: number;
	maxDarkSpellFactory: number;
	maxWorkshop: number;
	troopCapacity: number;
	spellCapacity: number;
	siegeCapacity: number;
};

export type UnitType = 'Troop' | 'Siege' | 'Spell';

export type UnitLevel = {
	id: number;
	unitId: number;
	level: number;
	spellFactoryLevel: number | null;
	barrackLevel: number | null;
	laboratoryLevel: number | null;
}

export type Unit = {
	/** ID of the unit in the `units` table */
	id: number;
	type: UnitType;
	name: string;
	objectId: number;
	housingSpace: number;
	trainingTime: number;
	productionBuilding: string;
	isSuper: boolean;
	isFlying: boolean;
	isJumper: boolean;
	airTargets: boolean;
	groundTargets: boolean;
	levels: UnitLevel[];
}

/**
 * An army unit with complete data.
 */
export type ArmyUnit = Unit & {
	/** ID of the unit in the `army_units` table */
	id: number;
	armyId: number;
	/** ID of the unit in the `units` table */
	unitId: number;
	amount: number;
	levels: never;
};

/**
 * A complete saved army
 */
export type Army = {
	id: number;
	name: string;
	townHall: number;
	banner: Banner;
	units: ArmyUnit[];
	username: string;
	createdBy: number;
	createdTime: string;
	updatedTime: string;
	troopCapacity: number;
	siegeCapacity: number;
	spellCapacity: number;
};

export type AppState = {
	// frequently used data (cache)
	units: Unit[];
	townHalls: TownHall[];
	// user state
	townHall: number | null;
	barrack: number | null;
	darkBarrack: number | null;
	laboratory: number | null;
	spellFactory: number | null;
	darkSpellFactory: number | null;
	workshop: number | null;
	armyCapacity: { troop: number; spell: number; siege: number };
	// general app state
	modals: Modal[];
	openModal(component: Modal['component'], props?: Modal['props']): void;
	user: User | null;
};

export type Banner = typeof BANNERS[number];

export type FetchErrors = Record<string | number | symbol, string[] | undefined> | string;
