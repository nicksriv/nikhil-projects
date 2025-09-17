/**
  * <EditForm />
  */

 import React from 'react';
 import store from './stores/store';
 
 export default function editForm(props){

    function generateDataItems() {
        if(!props.hasOwnProperty('editJSON') || !props.editJSON){
            alert("JSON not found!");
            return;
        }

        const json = props.editJSON;
        store.dispatch('updateOrder', json.list);
    }

    return (
        <button className="btn btn-default float-right" style={{ marginRight: '10px' }} onClick={()=> generateDataItems()}>Edit Form</button>
    );
 }
 