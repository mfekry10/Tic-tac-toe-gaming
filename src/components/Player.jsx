import { useState } from "react"

export default function Player({name , symbol , isActive , onChangeName}){

   const [isEditing , setIsEditing] = useState(false);
   const [playerName , setPlayerName] = useState(name);

   function handleEditClick(){
    setIsEditing((editing)=> !editing )

    if(isEditing){
        onChangeName(symbol , playerName)
    }
   
   }

   function handleChange(e){
    setPlayerName(e.target.value)
   }
  
   
    return(
        <>
            <li className={isActive ? 'active' : undefined}>
                <span className="player">
                    {isEditing ? <input type="text" required value={playerName}  onChange={handleChange}  /> : <span className="player-name">{playerName}</span>}
                    <span className="player-symbol">{symbol}</span>
                </span>
                <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
            </li>
        </>
    )
}