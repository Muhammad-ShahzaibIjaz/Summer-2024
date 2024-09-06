var ctx = document.getElementById("lineChart");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul","Aug","Sep","Okt","Nov","Dec"],
            datasets: [
                {
                    label: "My First dataset",
                    borderColor: "#007AFF",
                    borderWidth: "1",
                    backgroundColor: "rgba(0, 122, 255, 0.10)",
                    data: [4500, 5600, 9800, 9800, 9800, 9800, 9800, 9800, 9800, 9800, 22000, 22000]
                }
            ]
        },
        options: {
            legend: false,
            scales: {
                yAxes: [{
                        gridLines: {
                            color: "#e6e6e6",
                            zeroLineColor: "#e6e6e6",
                            borderDash: [2],
                            borderDashOffset: [2],
                            drawBorder: false,
                            drawTicks: false
                        },
                        ticks: {
                            padding: 20
                        }
                    }],
                xAxes: [{
                        maxBarThickness: 50,
                        gridLines: {
                            lineWidth: [0]
                        },
                        ticks: {
                            padding: 20,
                            fontSize: 14,
                            fontFamily: "'Nunito Sans', sans-serif"
                        }
                    }]
            }
        }
});