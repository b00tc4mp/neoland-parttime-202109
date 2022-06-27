import { useState, useEffect } from 'react'
import { monthlyExpenses } from '../logic'
// import { Chart as ChartJS, BarElement } from 'chart.js'
import { Chart, registerables } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

Chart.register(
    ...registerables
)

const DoughnutChart = () => {
    const [chart, setChart] = useState([])

    useEffect(() => {
        try {
            monthlyExpenses(sessionStorage.token, 2022)
                .then(chart => {
                    setChart(chart)
                    console.log(chart.length)
                    console.log(chart)
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, []) //chart???

    var data = {
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        // labels: ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] ,
        labels: chart ,
        datasets: [{
            label: 'Monthly expenses',
            data: chart,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }

    var options = {
        maintainAspectRadio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        legend: {
            labels: {
                fontSize: 26
            }
        }
    }

    return (
        <div>
            <Doughnut
                data={data}
                height={400}
                options={options}
            />
        </div>
    )

}
export default DoughnutChart