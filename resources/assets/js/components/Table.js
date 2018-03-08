import React from 'react'
import PropTypes from 'prop-types'

const Table = function(props){

  return (
    // console.log(props);
    // render(){
      <div>
        {props.data.Date}
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Open</th>
              <th scope="col">High</th>
              <th scope="col">Low</th>
              <th scope="col">Close</th>
              <th scope="col">Volume values</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map(function(el, i){
              return (
                <tr key={i}>
                      <td>{el.Date}</td>
                      <td>{el.Open}</td>
                      <td>{el.High}</td>
                      <td>{el.Low}</td>
                      <td>{el.Close}</td>
                      <td>{el.Volume}</td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
    )
  // }

}

export default Table
