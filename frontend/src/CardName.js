import {Link} from "react-router-dom";

const CompleteCheckBox = (item) => {
    return (
        <input className={`mr-2`} 
            type="checkbox" 
            id={item.item.id} 
            name="complete" 
            defaultChecked={item.item.completed ? "true" : ''}
            onChange={() => {}}
            value="complete"></input>
    );
}

const CardName = (item) => {
        if (item.item.editEnabled) {
        return (
            <span
                style={{marginRight: '10px', width: '79%' }}
                className={`todo-title mr-2 completed-todo`}>
                <CompleteCheckBox item={item} />
                <input type="text" 
                    style={{marginRight: '10px', width: '90%' }}
                    defaultValue={item.item.description} 
                    onChange={e => item.setCardNameCallback(item.item.id, e.target.value)}
                    />
            </span>
        );
        } else {
        return (
        <span
            className={`todo-title mr-2 completed-todo`}>
            <CompleteCheckBox item={item} />
            {item.item.description}
        </span>
        );
    }
}
export default CardName;