import { React } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import url from '../../url/http';
import { faPen, faTrashAlt} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function EducationInner(props) {

  let buttonTag
  
  if (props.currentUser === props.targetId) {
    buttonTag = 
    <div className="d-flex justify-content-end align-items-end" style={{width: '100%'}}>
      <Button variant="" onClick={()=>{
        props.changeTargetIndex(props.index);
        props.changeMode('EDIT');
      }}>
        <FontAwesomeIcon icon={faPen} size='lg' />
      </Button>
      <Button variant="" onClick={()=>{
        axios.delete(url + `education/post/${props.postId}`, props.header)
        .then(res=>{
          props.changeProjectData(res.data.res);
        }).catch(err=>{
          console.log(err);
        });
      }}>
        <FontAwesomeIcon icon={faTrashAlt} size='lg' />
      </Button>
    </div>
  } else {
    buttonTag = <></>
  }

  return(
    <Card key={props.index} className="mb-2" >
      <Card.Body className="d-flex">
        <div style={{width: '100%'}}>
          <Card.Text>
            학교 : {props.schoolName}
          </Card.Text>
          <Card.Text>
            전공 : {props.major}
          </Card.Text>
          <Card.Text>
            {props.degree}
          </Card.Text>
        </div>
        {buttonTag}
      </Card.Body>
    </Card>
  );
  
}

export default EducationInner;