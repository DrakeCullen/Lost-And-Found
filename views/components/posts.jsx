import React from 'react'
import Item from './item'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function createTiles(props) {
    let rows = {};
    let counter = 1, pos = 0;
    props.posts.forEach((post, idx) => {
        rows[counter] = rows[counter] ? [...rows[counter]] : [];
        if (idx % 4 == 0 && idx !== 0) {
            counter++;
            rows[counter] = rows[counter] ? [...rows[counter]] : []
            rows[counter].push(<Item posts={post} action={props.action} phrase={props.phrase} url={props.url}/>);
        } else {
            rows[counter].push(<Item posts={post} action={props.action} phrase={props.phrase} url={props.url}/>);
        }
        pos++;
    })
    return rows;
}

function Posts(props) {
    let rows = createTiles(props);
    return (
        <div>
            {
                Object.keys(rows).map(row => {
                    return (
                        <div className="row items__row text-center" key={row}>
                            {rows[row].map(item => {
                                return <Col className="col-3 mt-5 d-flex align-items-stretch">{item}</Col>;
                            })}
                        </div>
                    )
                })
            }
        </div>
    );
}

module.exports = Posts;
