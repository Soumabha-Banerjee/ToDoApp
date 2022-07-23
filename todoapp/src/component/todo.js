import React, { useState, useEffect } from 'react'
import "./styletodo.css"

const Todo = () => {
    // Getting Local Storage Data
    const getLocalData = () => {
        const lists = localStorage.getItem('todolist');
        if( lists ) {
            return JSON.parse(lists);
        } else {
            return [];
        }
    };
    
    // Needed State Hooks
    const[inputData, setInputData] = useState('');
    const[items, setItems] = useState(getLocalData());
    const[isEditItem, setIsEditItem] = useState('');
    const[toggleBtn, setToggleBtn] = useState(false);

    // Adding Items From Input Data to Items State Array
    const addItem = () => {
        if(!inputData) {
            alert('⚠ Please fill the data then add');
        }
        else if(inputData && toggleBtn) {
            setItems(
                items.map((currElm) => {
                    if( currElm.id == isEditItem ) {
                        return {...currElm, name : inputData}
                    }
                    return currElm;
                })
            );
            setInputData('');
            setIsEditItem(null);
            setToggleBtn(false);
        }
        else {
            const inputDataObj = {
                id : new Date().getTime().toString(),
                name : inputData
            }
            setItems([...items, inputDataObj]);
            setInputData('');
        }
    };

    // Enable Editting Features
    const editItem = (index) => {
        const editedItem = items.find((currElm) => {return currElm.id == index});
        setInputData(editedItem.name);
        setIsEditItem(index);
        setToggleBtn(true);
    };
    
    // Deleting Items
    const deleteItem = (index) => {
        const updatedItems = items.filter((currElm) => {
            return currElm.id != index
        });
        setItems(updatedItems);
    };
    
    // Removing All Items
    const removeAll = () => {
        setItems([]);
    };

    // Adding Local Storage
    useEffect(() => {
        localStorage.setItem('todolist', JSON.stringify(items));
    }, [items]);
    
    // Returning The Main HTML
    return (
    <>
        <div className='main-div'>
            <div className='child-div'>
                {/* Heading & Logo of Page */}
                <figure>
                    <img src='./Image/pic3.svg' alt='todologo' />
                    <figcaption>Please Add Your List Here 👀</figcaption>
                </figure>

                {/* Taking Notes Input */}
                <div className='addItems'>
                    <input type='text' placeholder='✍ Add Items' className='form-control' value={inputData} onChange={(event) => setInputData(event.target.value)}/>
                    {toggleBtn ? <i className='far fa-edit add-btn' onClick={addItem}></i> : <i className='fa fa-plus add-btn' onClick={addItem}></i>}
                </div>

                {/* Showing The Notes and Edit & Delete Option */}
                <div className='showItems'>
                {
                    items.map((currElm, index) => {
                        return(
                            <div className='eachItem' key={ currElm.id }>
                                <h3>{ currElm.name }</h3>
                                <div className='todo-btn'>
                                    <i className='far fa-edit add-btn' onClick={() => editItem(currElm.id)}></i>
                                    <i className='far fa-trash-alt add-btn' onClick={() => deleteItem(currElm.id)}></i>
                                </div>
                            </div>
                        );
                    })
                }
                </div>

                {/* Remove All Notes Button */}
                <div className='showItems'>
                    <button className='btn effect04' data-sm-link-text='Remove All' onClick={ removeAll }><span>CHECK LIST</span></button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Todo