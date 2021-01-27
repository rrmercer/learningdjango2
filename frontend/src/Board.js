import React from 'react';

export default () => (
    <section>
        <form action="http://localhost:8000/boards">
        <p>
            <label>
              Tile:
              <input type="text" name="title" />
            </label>
        </p>
        <p>
            <label>
              Description:
              <input type="text" name="description" />
            </label>
        </p>
        <input type="submit" value="Submit" />
      </form>
    </section>
);
