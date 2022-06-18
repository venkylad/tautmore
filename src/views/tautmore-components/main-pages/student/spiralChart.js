import Chart from "react-apexcharts";
import React from "react";

const SpiralChart = () => {
  var constant = {
    series: [44, 55, 67],
    options: {
      legend: {
        show: true,
        horizontalAlign: "center",
        position: "right",
        fontSize: "18px",
        fontFamily: "Helvetica, Arial",
        fontWeight: 400,
        labels: {
          colors: undefined,
          useSeriesColors: true,
        },
        itemMargin: {
          horizontal: 5,
          vertical: 15,
        },
        markers: {
          width: 16,
          height: 16,
          strokeWidth: 0,
          strokeColor: "#fff",
          fillColors: undefined,
          radius: 0,
          customHTML: undefined,
          onClick: undefined,
          offsetX: 0,
          offsetY: 0,
        },
      },
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
            },

            total: {
              show: false,
              label: "Total",
              formatter: function (w) {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return 249;
              },
            },
          },
        },
      },
      labels: ["Science", "Mathematics", "Social Science"],
    },
  };
  return (
    <div className="spiral-divwrapper">
      <Chart
        options={constant.options}
        series={constant.series}
        type="radialBar"
        height={350}
      />
    </div>
  );
};

export default SpiralChart;
