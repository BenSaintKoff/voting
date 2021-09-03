import React  from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Divider, Segment, Feed, Card} from 'semantic-ui-react';
import { PieChart } from 'react-minimal-pie-chart';
import "../assets/css/material-dashboard-react.css?v=1.10.0";
import "../assets/jss/material-dashboard-react";
import logoidsi from '../assets/img/logoidsi.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container } from 'react-bootstrap';
import dab from '../assets/img/dab.png';








function Result() {

    const [results, setResults] =  useState([]);
    
    useEffect(() => {
        axios.get("https://610ab42152d56400176aff20.mockapi.io/vote").then(
            (Response) => {
                console.log(Response.data);
                setResults(Response.data)
            },
            (error)=>{
                console.log(error);
            }
        );
       
    }, []);


const totalVotesA = results
             .map((item) => item.partyA.voteForA)
             .reduce((prev, curr) => prev + curr, 0);

const totalVotesB = results
             .map((item) => item.partyB.voteForB)
             .reduce((prev, curr) => prev + curr, 0);



const data = {
        labels: ['Dabonné Yacouba', 'Bulletin null'],
            datasets: [
                {
                label: 'Résultat de vote',
                data: [totalVotesA, totalVotesB],
                backgroundColor: [
                    '#900C3F',
                    '#2874A6',  
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
                },
            ],
              };

const  dtgg = {    
      series: [totalVotesA, totalVotesB],
      options: {
        chart: {
          type: 'donut',
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }};
      
   function roundDecimal(nombre, precision){
      var precision = precision || 2;
      var tmp = Math.pow(10, precision);
    return Math.round( nombre*tmp )/tmp;
}

const options = {
        indexAxis: 'y',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
            bar: {
            borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
            position: 'right',
            },
            title: {
            display: true,
           // text: 'Chart.js Horizontal Bar Chart',
            },
        },
    };

    return (
        <div className='container'>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src= {logoidsi}
              width="40"
              height="40"
              className="d-inline-block align-top"
            />{' '}
            ALUMNI IDSI
          </Navbar.Brand>
        </Container>
      </Navbar>
           <Segment color='yellow'>
            <div className='header text-center'>
            <span className="badge rounded-pill bg-danger">
                <h3 className='title'>RESULTATS STATISTIQUES DES VOTES </h3>
            </span>
            <Divider/>
            </div>
           <div className='row'>
                <div className ='col-8'>
                    <Bar data={data} options={options} style={{'height':'300px'}} /> 
                </div>
                <div className='col-4'>
                <Card>
                <Card.Content>
                  <Card.Header>Pourcentage des voix obtenues</Card.Header>
                </Card.Content>
                <Card.Content>
                  <Feed>
                    <Feed.Event>
                      <Feed.Label image= {dab}  style={{height:"14%", width:"34%"}}/>
                      <Feed.Content>
                        <Feed.Date content='DABONNE YACOUBA' />
                        <Feed.Summary>
                        <h1>{roundDecimal((totalVotesA*100/(totalVotesA+totalVotesB)),2)}</h1>
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
            
                    <Feed.Event>
                      <Feed.Label image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjfb4boKKaHu5x1oFASsO92hJb-78nyVcFKRT_WxvRf1O165kUOYWfa0uGn12tfdw8uRU&usqp=CAU' style={{height:"160px", width:"100px"}} />
                      <Feed.Content>
                        <Feed.Date content='BULLETIN NULL' />
                        <Feed.Summary>
                        <h1>{roundDecimal((totalVotesB*100/(totalVotesA+totalVotesB)),2)}</h1>
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
                </Card.Content>
              </Card>
                </div>
           </div>
          </Segment> 
        </div>
    )
}

export default Result
