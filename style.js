document.getElementById('task-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const taskInput = document.getElementById('task-input');
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const task = createTask(taskText);
    addTaskToPendingList(task);
    taskInput.value = '';
  }
});

function createTask(text) {
  return {
    text: text,
    added: new Date(),
    completed: null
  };
}

function addTaskToPendingList(task) {
  const listItem = document.createElement('li');
  const textSpan = document.createElement('span');
  textSpan.innerText = task.text;
  listItem.appendChild(textSpan);
  
  const buttonsDiv = document.createElement('div');
  const completeButton = document.createElement('button');
  completeButton.innerText = 'Complete';
  completeButton.addEventListener('click', function() {
    completeTask(task, listItem);
  });
  buttonsDiv.appendChild(completeButton);
  
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.addEventListener('click', function() {
    deleteTask(task, listItem);
  });
  buttonsDiv.appendChild(deleteButton);
  
  listItem.appendChild(buttonsDiv);
  
  document.getElementById('pending-list').appendChild(listItem);
}

function completeTask(task, listItem) {
  task.completed = new Date();
  listItem.remove();
  addTaskToCompletedList(task);
}


function addTaskToCompletedList(task) {
  const listItem = document.createElement('li');
  const textSpan = document.createElement('span');
  textSpan.innerText = task.text;
  listItem.appendChild(textSpan);
  
  const completedTextSpan = document.createElement('span');
  completedTextSpan.innerText = ' (Completed on: ' + task.completed.toLocaleString() + ')';
  listItem.appendChild(completedTextSpan);
  
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.addEventListener('click', function() {
    deleteTask(task, listItem);
  });
  listItem.appendChild(deleteButton);
  
  document.getElementById('completed-list').appendChild(listItem);
}

function deleteTask(task, listItem) {
  listItem.remove();
  
  if (task.completed !== null) {
    const completedListItems = document.getElementById('completed-list').getElementsByTagName('li');
    for (let i = 0; i < completedListItems.length; i++) {
      if (completedListItems[i].textContent.includes(task.text)) {
        completedListItems[i].remove();
        break;
      }
    }
  }
}


