function TodoFactory(title, description, dueDate, priority, isComplete, notes) {
  function getTitle() {return title};
  function getDescription() {return description};
  function getDueDate() {return dueDate};
  function getPriority() {return priority};
  function getIsComplete() {return isComplete};
  function getNotes() {return notes};
  function setTitle(newTitle) {title = newTitle}
  function setDescription(newDescription) {description = newDescription};
  function setDueDate(newDueDate) {dueDate = newDueDate};
  function setPriority(newPriority) {priority = newPriority};
  function setIsComplete(newIsComplete) {isComplete = newIsComplete};
  function setNotes(newNotes) {notes = newNotes};

  return {getTitle, getDescription, getDueDate, getPriority, getIsComplete, getNotes,
          setTitle, setDescription, setDueDate, setPriority, setIsComplete, setNotes};
}

export {TodoFactory}