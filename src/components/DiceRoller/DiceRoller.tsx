import Dice from "@/entities/Dice";
import {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  useState,
} from "react";
import { LuStepBack } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import ElevatedButton from "../ElevatedButton";

const HEADER_CLASS_NAME = "text-center text-lg font-bold mb-2 relative";
const DICES_LIST_GAP_PX = 16;
const DICES_LIST_COLUMNS = 3;
const DICES_LIST_ROWS = 2;

export interface DiceRollerProps {
  Header?: ElementType<{ className: string; children: ReactNode }>;
  DiceSelectButton?: DiceSelectButton;
  selectedDice: Dice | null;
  onDiceSelected: (dice: Dice | null) => void;
  result: number | null;
  onRoll: (dice: Dice) => void;
}

const DiceRoller = ({
  Header = "h2",
  DiceSelectButton = DefaultDiceSelectButton,
  selectedDice,
  onDiceSelected,
  result,
  onRoll,
}: DiceRollerProps) => {
  return selectedDice === null ? (
    <DiceSelector
      Header={Header}
      DiceSelectButton={DiceSelectButton}
      onDiceSelected={onDiceSelected}
    />
  ) : (
    <TheDiceRoller
      Header={Header}
      DiceSelectButton={DiceSelectButton}
      onDiceSelected={onDiceSelected}
      result={result}
      onRoll={onRoll}
      selectedDice={selectedDice}
    />
  );
};

export default DiceRoller;

export type StatefulDiceRollerProps = Omit<
  DiceRollerProps,
  "selectedDice" | "result" | "onDiceSelected" | "onRoll"
> & {
  rollDice?: (dice: Dice) => number;
  onDiceSelected?: DiceRollerProps["onDiceSelected"];
  onRoll?: (dice: Dice, result: number) => void;
};

export const StatefulDiceRoller = ({
  rollDice = defaultRollDice,
  onDiceSelected,
  onRoll,
  ...props
}: StatefulDiceRollerProps) => {
  const [selectedDice, setSelectedDice] = useState<Dice | null>(null);
  const [result, setResult] = useState<number | null>(null);

  return (
    <DiceRoller
      {...props}
      selectedDice={selectedDice}
      result={result}
      onDiceSelected={(dice) => {
        setSelectedDice(dice);
        setResult(null);
        onDiceSelected && onDiceSelected(dice);
      }}
      onRoll={(dice) => {
        const result = rollDice(dice);
        setResult(result);
        onRoll && onRoll(dice, result);
      }}
    />
  );
};

const defaultRollDice = (dice: Dice) => Math.floor(Math.random() * dice) + 1;

type ContentProps = ComponentPropsWithoutRef<"div"> & {
  DiceSelectButton: DiceSelectButton;
};

const Content = ({
  className,
  style,
  DiceSelectButton,
  ...props
}: ContentProps) => (
  <div
    {...props}
    className={twMerge("flex items-center justify-center h-36", className)}
    style={{
      minWidth: calculateContentWidthPx(DiceSelectButton),
      minHeight:
        DiceSelectButton.heightPx * DICES_LIST_ROWS +
        DICES_LIST_GAP_PX * (DICES_LIST_ROWS - 1),
      ...style,
    }}
  />
);

const calculateContentWidthPx = (DiceSelectButton: DiceSelectButton) =>
  DiceSelectButton.widthPx * DICES_LIST_COLUMNS +
  DICES_LIST_GAP_PX * (DICES_LIST_COLUMNS - 1);

export interface DiceSelectButtonProps {
  onClick: () => void;
  children: Dice;
}

export type DiceSelectButton = ElementType<DiceSelectButtonProps> & {
  widthPx: number;
  heightPx: number;
};

interface DiceSelectorProps {
  Header: ElementType<{ className: string; children: ReactNode }>;
  DiceSelectButton: DiceSelectButton;
  onDiceSelected: (dice: Dice) => void;
}

const DiceSelector = ({
  Header,
  DiceSelectButton,
  onDiceSelected,
}: DiceSelectorProps) => {
  const Dsb = DiceSelectButton as any;

  return (
    <div>
      <Header className={HEADER_CLASS_NAME}>Choose a dice</Header>

      <Content DiceSelectButton={DiceSelectButton}>
        <ul
          className="grid grid-cols-[repeat(3,_auto)] justify-center"
          style={{ gap: DICES_LIST_GAP_PX }}
        >
          <li>
            <Dsb onClick={() => onDiceSelected(4)}>{4 as Dice}</Dsb>
          </li>
          <li>
            <Dsb onClick={() => onDiceSelected(6)}>{6 as Dice}</Dsb>
          </li>
          <li>
            <Dsb onClick={() => onDiceSelected(8)}>{8 as Dice}</Dsb>
          </li>
          <li>
            <Dsb onClick={() => onDiceSelected(10)}>{10 as Dice}</Dsb>
          </li>
          <li>
            <Dsb onClick={() => onDiceSelected(12)}>{12 as Dice}</Dsb>
          </li>
          <li>
            <Dsb onClick={() => onDiceSelected(20)}>{20 as Dice}</Dsb>
          </li>
        </ul>
      </Content>
    </div>
  );
};

export type DefaultDiceSelectButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "children"
> & {
  children: Dice;
};

export const DefaultDiceSelectButton = ({
  onClick,
  disabled,
  children,
  style,
  ...props
}: DefaultDiceSelectButtonProps) => (
  <ElevatedButton
    {...props}
    onClick={onClick}
    disabled={disabled !== undefined ? disabled : !onClick}
    style={{
      width: DefaultDiceSelectButton.widthPx,
      height: DefaultDiceSelectButton.heightPx,
      ...style,
    }}
  >
    d{children}
  </ElevatedButton>
);

DefaultDiceSelectButton.widthPx = 48;
DefaultDiceSelectButton.heightPx = 48;

interface TheDiceRollerProps {
  Header: ElementType<{ className: string; children: ReactNode }>;
  DiceSelectButton: DiceSelectButton;
  selectedDice: Dice;
  onDiceSelected: (dice: Dice | null) => void;
  result: number | null;
  onRoll: (dice: Dice) => void;
}

const TheDiceRoller = ({
  Header,
  DiceSelectButton,
  onDiceSelected,
  result,
  onRoll,
  selectedDice,
}: TheDiceRollerProps) => (
  <div>
    <Header className={HEADER_CLASS_NAME}>
      <button
        className="absolute top-1/2 -translate-y-1/2 left-2"
        onClick={() => onDiceSelected(null)}
      >
        <LuStepBack />
      </button>
      Roll a dice
    </Header>

    <Content className="flex-col" DiceSelectButton={DiceSelectButton}>
      <div className="flex-grow" />
      {result === null ? (
        <p
          className="text-center text-gray-700"
          style={{ width: calculateContentWidthPx(DiceSelectButton) }}
        >
          Roll a dice to see the result.
        </p>
      ) : (
        <p>{result}</p>
      )}
      <div className="flex-grow" />
      <ElevatedButton onClick={() => onRoll(selectedDice)}>
        {result === null ? "Roll" : "Roll again"}
      </ElevatedButton>
    </Content>
  </div>
);
