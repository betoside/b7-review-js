let selec = (e)=>document.querySelector(e);
let selecAll = (e)=>document.querySelectorAll(e);

// selec('.neutralArea').addEventListener('click', (e)=>{
//     e.target.style.border = '1px solid yellow';
//     console.log('Target:', e.target);
//     console.log('Current target:', e.currentTarget);
// });

let areas = {
    a:null,
    b:null,
    c:null
}

selecAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart)
    item.addEventListener('dragend', dragEnd)
});

selecAll('.area').forEach(area => {
    area.addEventListener('dragover', dragOver);
    area.addEventListener('dragleave', dragLeave);
    area.addEventListener('drop', drop);
});

selec('.neutralArea').addEventListener('dragover', dragOverNeutral);
selec('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
selec('.neutralArea').addEventListener('drop', dropNeutral);

// function item
function dragStart(e){
    e.currentTarget.classList.add('dragging');
}

function dragEnd(e){
    e.currentTarget.classList.remove('dragging');

}


// function area
function dragOver(e){
    if(e.currentTarget.querySelector('.item') === null){
        e.preventDefault();
        e.currentTarget.classList.add('hover');
    }}

function dragLeave(e){
    e.currentTarget.classList.remove('hover');
}

function drop(e){
    e.currentTarget.classList.remove('hover');
    let currentDrop = e.currentTarget;

    if(e.currentTarget.querySelector('.item') === null){
        let dragItem = selec('.item.dragging');
        e.currentTarget.appendChild( dragItem );
        updateAreas();
    }
}

// function neutral area
function dragOverNeutral(e){
    e.preventDefault();
    e.currentTarget.classList.add('hover');
}

function dragLeaveNeutral(e){
    e.currentTarget.classList.remove('hover');
}

function dropNeutral(e){
    e.currentTarget.classList.remove('hover');
    let dragItem = selec('.item.dragging');
    e.currentTarget.appendChild( dragItem );
    updateAreas();
}

// logic functions
function updateAreas(){
    selecAll('.area').forEach(area => {
        let name = area.getAttribute('data-name');

        if(area.querySelector('.item') !== null){
            areas[name] = area.querySelector('.item').innerHTML;
        } else {
            areas[name] = null;
        }
    });
    console.log(areas);

    if(areas.a === '1' && areas.b === '2' && areas.c === '3'){
        selec('.areas').classList.add('correct');
    } else {
        selec('.areas').classList.remove('correct');
    }
}