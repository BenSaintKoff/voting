import React from 'react';
import {Button, Image, Card} from 'semantic-ui-react';
import { Link  } from 'react-router-dom';
import './Accueil.css';
import logoidsi from '../assets/img/logoidsi.jpg';




function Accueil() {
    return (
        <div className='Accueil' style={{height:'800px'}}>
            <div className="container text-center row align-items-center">
                <Card  style={{ marginLeft:'35%', width:'40%', 'margin-top':'5%'}}>
                <Image src={logoidsi} wrapped ui={false} />
                <Card.Content>
                <Card.Header>Assemblée Générale des Alumni de l'IDSI</Card.Header>
                <Card.Meta>
                    <span className='date'>Samedi 21 Août 2021</span>
                </Card.Meta>
                <Card.Description>
                   L'art de faire parler les données
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Link to ='/home'>
                    <button type="button" class="btn btn-danger btn-lg"><h1>Get Start</h1></button>
                    {/*<Button primary size='large'> <h1>Get Start</h1></Button>*/}
                    </Link>
                </Card.Content>
            </Card>
        </div>
        </div>
    )
}

export default Accueil
