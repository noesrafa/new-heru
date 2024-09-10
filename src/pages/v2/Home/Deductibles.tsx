import React from "react";
import Container from "../../../components/Container";
import { MedalMilitary, Ranking } from "@phosphor-icons/react";

const Deductibles = () => {
  return (
    <Container className="flex items-center gap-4">
      <div className="flex justify-center items-center bg-blue-100 rounded-full p-3">
        <MedalMilitary className="size-6 text-blue-500" />
      </div>
      <div className="flex flex-col gap-1">
        <p>
          Tienes más deducibles que el <b>86%</b> de los usuarios.
        </p>
        <button className="text-blue-500 w-fit font-medium ">
          Comparar mis deducibles
        </button>
      </div>
    </Container>
  );
};

export default Deductibles;
