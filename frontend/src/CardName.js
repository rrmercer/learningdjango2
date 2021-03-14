import {Link} from "react-router-dom";

const CardName = (item) => {
        if (item.item.editEnabled) {
        return (
        <input type="text" 
            style={{marginRight: '10px', width: '70%' }}
            defaultValue={item.item.description} 
            onChange={e => item.setCardNameCallback(item.item.id, e.target.value)}
            />
        );
        } else {
        return (
        <span
            /*className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
            }`}*/
            className={`todo-title mr-2 completed-todo`}
        >
            {item.item.description}
        </span>
        );
    }
}
export default CardName;