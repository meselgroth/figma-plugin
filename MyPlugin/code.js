// This file holds the main code for the plugin. It has access to the *document*.
// You can access browser APIs such as the network by creating a UI which contains
// a full browser environment (see documentation).
figma.showUI(__html__);
let loop;
figma.ui.onmessage = msg => {
    if (msg.type === 'stop') {
        clearInterval(loop);
        figma.ui.postMessage('stopped');
    }
    if (msg.type === 'start') {
        loop = setInterval(addRect, 1000);
        figma.ui.postMessage('running');
    }
};
figma.on('selectionchange', () => {
    const selection = figma.currentPage.selection;
    if (selection.length > 0)
        selection[0].remove();
});
function addRect() {
    const shape = figma.createShapeWithText();
    shape.shapeType = 'ROUNDED_RECTANGLE';
    shape.x = figma.viewport.center.x;
    shape.y = figma.viewport.center.y;
    shape.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
    figma.currentPage.appendChild(shape);
}
