import React , {useState} from 'react';
import {Segment} from 'semantic-ui-react';
import {Form, Modal, Button, Card, Divider, Image, Placeholder } from 'semantic-ui-react';
import _ from 'lodash';
import axios from 'axios';
import { Link  } from 'react-router-dom';
import Result from '../pages/Result';
import dab from '../assets/img/dab.png';
import other from '../assets/img/votelogo.png';
import logoidsi from '../assets/img/logoidsi.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container } from 'react-bootstrap';
import swal from '@sweetalert/with-react';



const cards = [
    {
      id:1,
      avatar:dab,
      //avatar: 'https://media.istockphoto.com/vectors/vector-of-a-hand-putting-paper-with-vote-in-the-ballot-box-in-a-vector-id1226256523?k=6&m=1226256523&s=612x612&w=0&h=qH1o9XDwE4jlZJ65qXhXOfylDGNydHFlJO2Nfd9GzPg=',
      date: '1ere promotion 2017',
      header: 'DABONNE YACOUBA',
      description: 'Slogan: Plus fort ensemble !',
    },
    {
      id:2,
      //avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh_CVKSjArMFNvo_g0ikYGyQh-umjhIYDp8A&usqp=CAU',
      avatar: 'https://media.istockphoto.com/vectors/vector-of-a-hand-putting-paper-with-vote-in-the-ballot-box-in-a-vector-id1226256523?k=6&m=1226256523&s=612x612&w=0&h=qH1o9XDwE4jlZJ65qXhXOfylDGNydHFlJO2Nfd9GzPg=',
      date: 'Annulation de vote',
      header: 'BULLETIN NUL',
      description: 'Votant annulant leur bulletin !',
    }
  ]

let voteNumber = 80; //voter number
let codeElecteur = [];
for (let i = 0; i < voteNumber; i++) {codeElecteur.push(require("crypto").randomBytes(3).toString('hex').toUpperCase())}
console.log(codeElecteur)

function Cards() {
   
   const [loading, setLoading] = useState(false);
   const [voteForA, setVoteForA] = useState(0);
   const [voteForB, setVoteForB] = useState(0);
   const [voted, setVoted] = useState(false); 
   const [open, setOpen] = useState(false);
   const [openVotedAlert, setOpenVotedAlert] = useState(false);
   const [codeVotant, setCodeVotant] = useState('');
    
    const submitVote = (code) => {

        if(codeElecteur.includes(code)){

            codeElecteur = codeElecteur.filter(function(element) {return element !== code})
            console.log('Nouveau code votant:',codeElecteur)
            axios
            .post("https://610ab42152d56400176aff20.mockapi.io/vote", {
                partyA:{voteForA},
                partyB: {voteForB},
                codeVotant: {codeVotant},
            })
            .then((response) => {
                console.log(response);
                console.log(voteForA)
            }, 
            (error) => { 
                console.log(error);
            }
          );   
        } else{
            //alert("Code dejà utilié ou inexistant !")
            {/*<SweetAlert
                show={openVotedAlert}
                title="Demo Complex"
                text="SweetAlert in React"
                showCancelButton
                onConfirm={() => {
                console.log('confirm');
                openVotedAlert;
                }}
                onCancel={() => {
                console.log('cancel');
                openVotedAlert;
                }}
                onEscapeKey={() => openVotedAlert}
                onOutsideClick={() => openVotedAlert}
            /> */}
            swal(
                <div>
                <img src="https://www.freeiconspng.com/thumbs/warning-icon-png/sign-warning-icon-png-7.png" alt="" width='10%' height='10%' />
                  <h3>Attention, code erronée !</h3>        
                  <p>Vérifier que le code entré est conforme.</p>
                </div>)
        }
    };

    return (
        <div className = 'container'>
           <Segment  padded color='olive'>
                <div>   
                   <div className='row text-center' style={{marginLeft:'25%'}}>
                        <Card.Group doubling itemsPerRow={3} stackable >
                        {_.map(cards, (card) => (
                        <Card key={card.header}>
                            {loading ? (
                            <Placeholder>
                                <Placeholder.Image square />
                            </Placeholder>
                            ) : (
                            <Image src={card.avatar} style={{width: '100%', height:"60%", 'box-shadow': '5px 10px 20px 1px rgba(255, 255, 255, 0.273)',
                            transition: 'all 0.7s linear !important'}} />
                            )}

                            <Card.Content>
                            {loading ? (
                                <Placeholder>
                                <Placeholder.Header>
                                    <Placeholder.Line length='very short' />
                                    <Placeholder.Line length='medium' />
                                </Placeholder.Header>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line length='short' />
                                </Placeholder.Paragraph>
                                </Placeholder>
                            ) : (
                                <div style={{height:'40px'}}>
                                    <Card.Header><h3>{card.header}</h3></Card.Header>
                                    <Card.Meta>{card.date}</Card.Meta>
                                    <Card.Description>{card.description}</Card.Description>
                                </div>
                            )}
                            </Card.Content>

                            <Card.Content extra style={{marginTop:"5px"}}>
                            <Button disabled={loading} 
                                onClick={()=>[card.id ===1?
                                    setVoteForA(voteForA+1):
                                    setVoteForB(voteForB+1), 
                                    setVoted(true), setOpen(true)]} primary>
                                Voter
                            </Button>
                            <Button disabled={
                                (card.id === 1 && voteForA<=0? true:false) || 
                                 (card.id === 2 && voteForB<=0? true:false) } 
                                 onClick={()=>[card.id ===1?
                                    setVoteForA(voteForA-1):
                                    setVoteForB(voteForB-1),
                                    setVoted(false),]}>
                                    Annuler
                                    </Button>
                            </Card.Content>
                        </Card>
                        ))}
                    </Card.Group>
                   {/* <Modal
                        basic
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        size='small'
                        //trigger={<Button>Basic Modal</Button>}
                        >
                        <Header icon>
                        <Icon name='archive' />
                           -- Validation du vote --
                        </Header>
                        <Modal.Content>
                        <p className="text-center">Entrer votre code électeur, puis valider !</p>
                        <Divider/>
                        <Form>
                            <Form.Field>
                            <input placeholder='Code électeur'
                            value={codeVotant}
                            onChange={e => setCodeVotant(e.target.value)}
                            />
                            </Form.Field>                        
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                        <Button basic color='red' inverted 
                             onClick={() => setOpen(false)}>
                            <Icon name='remove'/> Annuler
                        </Button>
                        <Button color='green' inverted 
                             onClick={() => [setOpen(false), submitVote(codeVotant)]}>
                            <Icon name='checkmark'/> Valider
                        </Button>
                        </Modal.Actions>
                    </Modal>*/}

                    {/* Deuxiem modal*/}
                    {
                        <Modal
                            onClose={() => setOpen(false)}
                            onOpen={() => setOpen(true)}
                            open={open}
                            size='small'
                           // trigger={<Button>Show Modal</Button>}
                            >
                            <Modal.Header>VALIDATION DU VOTE</Modal.Header>
                            <Modal.Content image>
                            <Image size='medium' src= {other} wrapped/>
                                <Modal.Description>
                                <p>Entrer votre code électeur, puis valider !</p>
                                <Form>
                                <Form.Field>
                                    <input className='form-control form-control-lg' placeholder='Code électeur'
                                    value={codeVotant}
                                    onChange={e => setCodeVotant(e.target.value)}
                                    />
                                    </Form.Field>                        
                                </Form>
                                </Modal.Description>
                                <Divider/>
                           
                            </Modal.Content>
                            <Modal.Actions>
                                <Button onClick={() => setOpen(false)}>Cancel</Button>
                                <Button onClick={() => [setOpen(false), submitVote(codeVotant)]} positive>
                                Ok
                                </Button>
                            </Modal.Actions>
                         </Modal>
                        }
                   </div>
                </div>
                <Divider/>
                <Link to= {codeElecteur.length>0? "/result":"/home"} >
                  <button className='btn btn-warning' type="button">Résultats</button>
                </Link>
            </Segment>
        </div>
    )
}

export default Cards
