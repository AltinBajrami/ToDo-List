import React from 'react'
import styled from 'styled-components'
import { useAddUserToTask } from '../ReachQueryCustomHook';
import { FaTimes } from 'react-icons/fa'

const UserList = ({ users, taskId, setShowUserList, activeUserId }) => {
    const { addUserToTask } = useAddUserToTask();

    return (
        <div className="users">
            <div className='user-center'>
                <ul>
                    {users.map((user) => (
                        <li key={user._id} className={`${activeUserId === user._id ? 'active' : ''}`}
                            onClick={() => {
                                addUserToTask({ taskId, userId: user._id })
                                setShowUserList(false)
                            }}>
                            {user.name}
                        </li>
                    ))}
                </ul>
                <button className="remove-userList-btn" onClick={() => setShowUserList(false)}><FaTimes /></button>
            </div>
        </div>
    )
}

const Wrapper = styled`
    width: 200px;
    height: 300px;
    background-color: red;
`
export default UserList