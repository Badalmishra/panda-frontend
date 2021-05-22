import { faPencilAlt, faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./index.css";
const Member = ({ member, turn }) => {
  return (
    <div className={"Member " + (turn &&turn.id === member.id && "active-member")}>
     {turn &&turn.id === member.id &&  <FontAwesomeIcon className='marker' icon={faPencilAlt} />}
      <span>{member.name}</span>
      <div className='point'>{member.point}</div>
    </div>
  );
};

export default Member;
