import DiceRollerClient from "@/components/DiceRoller/DiceRollerClient";

const IndexPage = () => (
  <div className="h-screen w-screen flex justify-center items-center">
    <div className="shadow bg-gray-100 p-2">
      <DiceRollerClient />
    </div>
  </div>
);

export default IndexPage;
