import { React, useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import url from '../url/http';
import EducationInner from './EducationInner';
import EducationForm from './EducationForm';

function Education(props) {

  var [targetIndex, setTargetIndex] = useState('');
  var [mode, setMode] = useState('READ');
  var [eduData, setEduData] = useState([]);
  
  let header

  useEffect(()=>{
    if (props.accessToken) {
      axios.get(url + 'post/education', {
        headers: {
          Authorization: `Bearer ${props.accessToken}`
        }
      })
      .then(response=>{
        setEduData(response.data.result);
        
      }).catch((e)=>{
        console.log(e)
      })
    }
  }, [props.accessToken]);

  header = {
    headers: {
      Authorization: `Bearer ${props.accessToken}`
    }
  }

  var createForm = '';
  
  var innerTag = eduData.map((data, index)=>
    <EducationInner key={index} changeTargetIndex={(data)=>{
      setTargetIndex(data);
    }} changeEduData={(data)=>{
      setEduData(data);
    }} changeMode={(data)=>{
      setMode(data);
    }} index={index} postId={data[0]} schoolName={data[2]}
    major={data[3]} degree={data[1]} header={header} />
  )

  if(mode === 'CREATE') {
    createForm = <EducationForm formMode="제출" schoolName="" major="" checkedItem=""
    header={header}
    changeEduData={function(data) {
      setEduData(data)
    }} changeMode={(data)=>{
      setMode(data);
    }} />
  } else if(mode === 'EDIT') {
    createForm = <EducationForm formMode="저장"
    postId = {eduData[targetIndex][0]} 
    schoolName={eduData[targetIndex][2]} 
    major={eduData[targetIndex][3]} 
    checkedItem={eduData[targetIndex][1]} 
    header={header}
    changeEduData={function(data) {
      setEduData(data)
    }} changeMode={(data)=>{
      setMode(data);
    }} />
  }
  
  return (
    <div>
      <Card style={{ width: '50rem' }}>
        <Card.Body>
          <Card.Title>학력</Card.Title>
          {innerTag}
          {createForm}
          <div className="d-flex justify-content-end">
            <Button variant="primary" onClick={function(){
              if(mode === 'READ') {
                setMode('CREATE');
              } else {
                setMode('READ');
              }
            }}>
                        추가
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Education;