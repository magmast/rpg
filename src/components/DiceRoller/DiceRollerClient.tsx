"use client";

import { StatefulDiceRoller, StatefulDiceRollerProps } from ".";

export type DiceRollerClientProps = StatefulDiceRollerProps;

/**
 * Dice roller that can be used in server components.
 */
const DiceRollerClient = (props: StatefulDiceRollerProps) => (
  <StatefulDiceRoller {...props} />
);

export default DiceRollerClient;
