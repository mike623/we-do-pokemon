import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { EvYields, Stats } from "./pokemon-urql";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export function Ability({
  evYields,
  baseStats,
}: {
  evYields: EvYields;
  baseStats: Stats;
}) {
  const data = {
    labels: [
      "hp",
      "attack",
      "defense",
      "specialattack",
      "specialdefense",
      "speed",
    ],
    datasets: [
      {
        label: "Stats",
        data: [
          baseStats.hp,
          baseStats.attack,
          baseStats.defense,
          baseStats.specialattack,
          baseStats.specialdefense,
          baseStats.speed,
        ],
        backgroundColor: "rgba(166, 094,046, 0.2)",
        borderColor: "rgba(166,094,046, 1)",
        borderWidth: 1,
      },
    ],
  };
  return <Radar data={data} />;
}
export default Ability;
