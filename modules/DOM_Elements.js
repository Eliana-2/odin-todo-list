function makeIcon(src, classes) {
  const icon = document.createElement('img');
  icon.src = src;
  icon.alt = '';
  icon.classList.add(...classes);
  return icon;
}

function makeTextContainer(classes, text) {
  const textContainer = document.createElement('div');
  textContainer.classList.add(...classes);
  textContainer.textContent = text;
  return textContainer;
}

function makeButton(classes, ariaLabel, eventListener) {
  const button = document.createElement('button');
  button.classList.add(...classes);
  button.ariaLabel = ariaLabel;
  button.addEventListener('click', (e) => {
    eventListener();
    e.stopPropagation();
  });
  return button;
}

function makeIconButton(src, iconClasses, buttonClasses, ariaLabel, eventListener) {
  const button = makeButton(buttonClasses, ariaLabel, eventListener);
  const buttonIcon = makeIcon(src, iconClasses)
  button.appendChild(buttonIcon);
  return button;
}

export {makeIcon, makeTextContainer, makeButton, makeIconButton};