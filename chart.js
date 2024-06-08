function renderChart(currentPokemon) {
  const ctx = document.getElementById("myChart");
  
  // Extrahiere die Namen der Stats und deren Werte
  const statNames = currentPokemon.stats.map((stat) => stat.stat.name);
  const statValues = currentPokemon.stats.map((stat) => stat.base_stat);

  // Berechne die Summe der Basisstatistiken
  const totalBaseStats = currentPokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0);

  // Definiere die Randfarben für jeden Balken
  const borderColors = [
     // Farbe für den ersten Balken
    "#ff7793", // Farbe für den ersten Balken
    "#ffc791", // Farbe für den zweiten Balken
    "#ffd984", // Farbe für den dritten Balken
    "#66c8c8", // Farbe für den vierten Balken
    "#53aeee", // Farbe für den fünften Balken
    "#b087ff", // Farbe für den sechsten Balken
    "#e5e6e8", // Farbe für den siebten Balken
    "#ff4500"  // Farbe für den achten Balken (Total)
  ];

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: [...statNames, "Total".toUpperCase()],
      datasets: [
        {
          label: "Base Stats",
          data: [...statValues, totalBaseStats],
          borderWidth: 1, // Anpassung der Randgröße
          borderColor: borderColors,
          backgroundColor: [
            "#ffe1e6",
            "#ffecdb",
            "#d9ecfb",
            "#fff4df",
            "#def2f2",
            "#ebe0ff",
            "#f4f5f5",
            "#ffc6b0"
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
          "blue",
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