function renderChart(currentPokemon) {
  const ctx = document.getElementById("myChart");
  
  // Extrahiere die Namen der Stats und deren Werte
  const statNames = currentPokemon.stats.map((stat) => stat.stat.name);
  const statValues = currentPokemon.stats.map((stat) => stat.base_stat);

  // Berechne die Summe der Basisstatistiken
  const totalBaseStats = currentPokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: [...statNames, "Total".toUpperCase()],
      datasets: [
        {
          label: "Base Stats",
          data: [...statValues, totalBaseStats],
          borderWidth: 0.6,
          backgroundColor: [
            "red",
            "blue",
            "yellow",
            "green",
            "purple",
            "orange",
            "gray",
          ],
        },
      ],
    },
    options: {
      indexAxis: "y",
      scales: {
        x: {
          beginAtZero: true,
        },
      },
    },
  });
}


function movesChart(currentPokemon) {
  const ctx = document.getElementById("myChartMoves");

  // Extrahiere die Namen der Moves und deren Anzahl
  const moveNames = currentPokemon.moves.map((move) => move.move.name);
  const moveCounts = currentPokemon.moves.map(
    (move) => move.version_group_details.length
  );

  // Erstelle das Datenobjekt für das Chart.js-Diagramm
  const data = {
    labels: moveNames,
    datasets: [
      {
        label: "Move Counts",
        data: moveCounts,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
         
          "rgb(14, 43, 14)",
          "rgb(149, 46, 11)",
          "rgb(7, 70, 147)",
          "rgb(58, 54, 54)",
          "rgb(228, 210, 6)",
          "rgb(28, 161, 139)",
          "rgb(181, 35, 9)",
          "rgb(138, 56, 205)",
          "rgb(149, 92, 27)",
          "rgb(133, 53, 37)",
          "rgb(133, 190, 246)",
          "rgb(181, 160, 76)",
          "rgb(234, 88, 115)",
          "rgb(133, 56, 134)",
          "rgb(70, 100, 185)",
          "rgb(152, 152, 180)",
          "rgb(222, 121, 216)",
          "rgb(77, 51, 53)",
          "green",
          "green",
          "green",
          "blue",
          "blue",
          "red",
          "red",
          "red",
          "red",
        ],
        hoverOffset: 4,
      },
    ],
  };

  // Erstelle das Doughnut-Diagramm mit den Moves des aktuellen Pokémons
  new Chart(ctx, {
    type: "line",
    data: data,
  });
}


function EvaluationChart(currentPokemon) {
  const ctx = document.getElementById("myChartEvaluation");

  // Überprüfen Sie, ob currentPokemon.evolution vorhanden ist, andernfalls verwenden Sie eine leere Liste
  const evolutionNames = currentPokemon.evolution ? currentPokemon.evolution.map((evolution) => evolution.evolution.name) : [];
  const evolutionCounts = currentPokemon.evolution ? currentPokemon.evolution.map((evolution) => evolution.version_group_details.length) : [];

  // Erstellen Sie das Datenobjekt für das Chart.js-Diagramm
  const data = {
    labels: evolutionNames,
    datasets: [
      {
        label: "Evolution Counts",
        data: evolutionCounts,
        borderWidth: 0.6,
        backgroundColor: [
          "red",
          "blue",
          "yellow",
          "green",
          "purple",
          "orange",
          "purple",
          // Fügen Sie weitere Farben hinzu, falls erforderlich
        ],
      },
    ],
  };

  // Erstellen Sie das Balkendiagramm mit den Evolutionen des aktuellen Pokémons
  new Chart(ctx, {
    type: "bar",
    data: data,
  });
}
























































































































//   man kann auch die funktionen so schreiben


/*
function renderChart(currentPokemon) {
  const ctx = document.getElementById("myChart");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "HP",
        "Attack",
        "Defense",
        "Sp-Attack",
        "Speed",
        "Weight",
        "Total",
      ],
      datasets: [
        {
          label: "Base Stats",
          data: [
            currentPokemon.stats[0].base_stat,
            currentPokemon.stats[1].base_stat,
            currentPokemon.stats[2].base_stat,
            currentPokemon.stats[3].base_stat,
            currentPokemon.stats[4].base_stat,
            currentPokemon.weight,
            currentPokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0),
          ],
          borderWidth: 0.6,
          backgroundColor: [
            "red",
            "blue",
            "yellow",
            "green",
            "purple",
            "orange",
            "purple",
          ],
        },
      ],
    },
    options: {
      indexAxis: "y",
      scales: {
        x: {
          beginAtZero: true,
        },
      },
    },
  });
}
*/

