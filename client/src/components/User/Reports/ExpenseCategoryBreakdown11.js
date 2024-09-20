import React, { useEffect, useState } from "react";
import DynamicChart from "../../DynamicChart";

const ExpenseCategoryBreakdown = (props) => {
  const [data, setData] = useState("");
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    fetchReportData();
  });

  const formatMonthLabel = (month, year) => {
    const monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug","Sep", "Oct", "Nov","Dec",
    ];
    return `${monthNames[month - 1]} ${year}`;
  };

  const fetchChatReportwithMonthAndYear = async (response) => {
    
  };

  const fetchReportData = async () => {
    try {
        console.log(props.response);
        // if (props.response) {
        //     const data = null; // = await response.data;
        //     setData(data);
        //     setChartData({
        //       labels: data.map((item) => `${item.categoryName}_${Math.random(455)}`), // Adjust based on actual data structure
        //       datasets: [
        //         {
        //           label: data.categoryName,
        //           data: data.map((item) => data.totalExpenses),
        //           borderColor: "rgba(75, 192, 192, 1)",
        //           backgroundColor: "rgba(75, 192, 192, 1)",
        //         },
        //         // {
        //         //   label: "Expenses",
        //         //   data: data.map((item) => item.totalExpenses),
        //         //   borderColor: "rgba(255, 99, 132, 1)",
        //         //   backgroundColor: "rgba(255, 99, 132, 1)",
        //         // },
        //       ],
        //     });
        //   }
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="text-center">
            <h3>Visual Chart Display</h3>
            {chartData.labels.length > 0 &&  <DynamicChart data={chartData} />}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="text-center">
            <h3>Expense Category Report for</h3>
          </div>
          <div className="card">
            <div className="card-body">
              <table className="table table-hover table-striped">
                <thead>
                  <th>SN</th>
                  <th>Expense Category</th>
                  <th>Expense Amount</th>
                </thead>
                <tbody>
                    {
                        data.map((item) => {
                            <tr>
                                <td> 1</td>
                                <td>{item.categoryName}</td>
                                <td>{item.totalExpenses}</td>
                            </tr>
                        })
                    }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCategoryBreakdown;
