import React from 'react'
import './CardItem.css'
import { Button, Card } from "react-bootstrap";
import {useNavigate} from 'react-router-dom';

const CardItem = ({item, añadirItem}) => {
    return (
        <Card style={{ width: '18rem', border: '2px solid black' }}>
            <Card.Body>
                <Card.Title>{item.nombre}</Card.Title>
                <Card.Text>{item.descripcion}</Card.Text>
                <Card.Text>Valor: ${item.precio}</Card.Text>
                <Card.Text>Stock: {item.stock}</Card.Text>
                <Card.Text>Categoria: {item.idcategoria}</Card.Text>
                <Button variant="primary" onClick={() => añadirItem(item)}>+</Button>
                <Button variant="primary">guardar</Button>
            </Card.Body>
        </Card>
    );
};
export default CardItem