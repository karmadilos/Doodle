import { React } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import url from '../url/http';

function AwardInner(props) {

    return(
      <Card key={props.index} className="mb-2" >
        <Card.Body className="d-flex">
          <div style={{width: '100%'}}>
            <Card.Text>
              {props.name}
            </Card.Text>
            <Card.Text>
              {props.description}
            </Card.Text>
          </div>
          <div className="d-flex justify-content-end align-items-center" style={{width: '100%'}}>
            <Button variant="primary" onClick={()=>{
              props.changeTargetIndex(props.index);
              props.changeMode('EDIT');
            }}>수정</Button>
            <Button variant="danger" onClick={()=>{
              axios.delete(url + `post/award/${props.postId}`, props.header)
              .then(res=>{
                props.changeAwardData(res.data.res);
              }).catch(err=>{
                console.log(err);
              });
            }}>삭제</Button>
          </div>
        </Card.Body>
      </Card>
    );
  
}

export default AwardInner;