const CardActions = (item) => {
    if (item.item.editEnabled) {
      return (
        <span>  
          <button className="btn btn-secondary mr-2" onClick={() => {
                    item.editCallback(item.item.id);
                    item.saveCallback(item.item.id, item.item.description);
                }
            }> Save </button>
          <button className="btn btn-danger" onClick={() => item.deleteCallback(item.item.id)}>Delete </button>
        </span>
      );
    } else {
      return (
        <span>  
          <button className="btn btn-secondary mr-2" onClick={() => item.editCallback(item.item.id)}> Edit </button>
          <button className="btn btn-danger" onClick={() => item.deleteCallback(item.item.id)}>Delete </button>
        </span>
      );
    }
  }
export default CardActions;