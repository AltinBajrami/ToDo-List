import React, { useState } from 'react'
import Form from './Form'
import Items from './Items'

const Tasks = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [item, setItem] = useState({ name: '', id: '' });

    return (
        <section className='section-center'>
            <Form isEditing={isEditing} item={item} setItem={setItem} setIsEditing={setIsEditing} />
            <Items setIsEditing={setIsEditing} setItem={setItem} />
        </section>
    );

}

export default Tasks