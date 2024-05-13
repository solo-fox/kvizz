'use client'

import styled from "styled-components"

export default function UsersComponent(){
  return(
    <Users>
      <Table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Points</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Dom</td>
                <td>6000</td>
            </tr>
            <tr>
                <td>Melissa</td>
                <td>5150</td>
            </tr>
            <tr>
                <td>Melissa</td>
                <td>5150</td>
            </tr>
            <tr>
                <td>Melissa</td>
                <td>5150</td>
            </tr>
            <tr>
                <td>Melissa</td>
                <td>5150</td>
            </tr>
            <tr>
                <td>Melissa</td>
                <td>5150</td>
            </tr>
            <tr>
                <td>Melissa</td>
                <td>5150</td>
            </tr>
            <tr>
                <td>Melissa</td>
                <td>5150</td>
            </tr>
        </tbody>
      </Table>
    </Users>
  )
}

const Users = styled.div`
display:flex;
align-items:center;
flex-direction: column;
width:100vw;
height:50vh;
overflow-y:scroll;
padding:1rem 0px 5rem 0px;
`

const Table = styled.table`
-webkit-box-shadow: 10px 10px 210px 0px rgba(3,1,44,0.76);
-moz-box-shadow: 10px 10px 210px 0px rgba(3,1,44,0.76);
box-shadow: 10px 10px 210px 0px rgba(3,1,44,0.76);
width:50vw;
thead tr {
    background-color: #002A22;
    color: #ffffff;
    text-align: left;
}
th,
td {
    padding: 12px 15px;
}
tbody tr {
    border-bottom: 1px solid #dddddd;
}
tbody tr {
    margin:1rem 0px;
    background-color: #f3f3f3;
}
tbody tr:last-of-type {
    border-bottom: 2px solid #002A22;
}
@media only screen and (max-width: 768px) {
  width:80vw;
}
`