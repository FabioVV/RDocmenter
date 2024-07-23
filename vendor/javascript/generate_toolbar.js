function createButton(className, title, action, iconClass) {
    const button = document.createElement('div');
    button.className = `${className} editor-button`;
    button.title = title;
    button.setAttribute('data-action', action);

    const icon = document.createElement('i');
    icon.className = iconClass;
    button.appendChild(icon);

    return button;
}

function insertToolbox(containerId) {
    const toolbox = document.createElement('div');
    toolbox.className = 'toolbox-edit-markdown';

    const buttons = [
        { className: 'header', title: 'Insert header', action: 'insertHeader', iconClass: 'fa-solid fa-heading' },
        { className: 'bold', title: 'Insert bold text', action: 'insertBold', iconClass: 'fa-solid fa-bold' },
        { className: 'italic', title: 'Insert italic text', action: 'insertItalic', iconClass: 'fa-solid fa-italic' },
        { className: 'listul', title: 'Insert unordered list', action: 'insertUnorderedList', iconClass: 'fa-solid fa-list-ul' },
        { className: 'listol', title: 'Insert ordered list', action: 'markdown#insertOrderedList', iconClass: 'fa-solid fa-list-ol' },
        { className: 'code', title: 'Insert code block', action: 'insertCode', iconClass: 'fa-solid fa-code' },
        { className: 'link', title: 'Insert link', action: 'insertLink', iconClass: 'fa-solid fa-link' },
        { className: 'image', title: 'Insert image', action: 'insertImage', iconClass: 'fa-solid fa-images' }
    ];

    buttons.forEach(buttonInfo => {
        const button = createButton(buttonInfo.className, buttonInfo.title, buttonInfo.action, buttonInfo.iconClass);
        toolbox.appendChild(button);
    });

    const container = document.getElementById(containerId);
    if (container) {
        container.appendChild(toolbox);
    } else {
        console.error(`Container with id '${containerId}' not found.`);
    }
}

export default insertToolbox
