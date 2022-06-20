type dragEventHandler = (event: DragEvent, node: HTMLElement, { data, store }?) => void

export function draggable(node: HTMLElement, { data, store }) {
   node.style.cursor = "grab"
   node.draggable = true
   node.dataset.drag = JSON.stringify(data);
   node.addEventListener('dragstart', (e) => dragStart(e, node, { data, store }))
}

export function dropzone(node: HTMLElement, store: any) {
   node.addEventListener('dragenter', (e) => dragEnter(e, node))
   node.addEventListener('dragover', (e) => dragOver(e, node))
   node.addEventListener('dragleave', (e) => dragLeave(e, node))
   node.addEventListener('dragend', (e) => dragEnd(e, node))
   node.addEventListener('drop', (e) => drop(e, node, {data: null, store}))
}

const dragStart: dragEventHandler = (event, node, { data, store }) => {
   event.dataTransfer.setData('text/plain', node.dataset.drag)
   event.dataTransfer.dropEffect = 'move'
   // store.remove(data)
}

const dragEnter: dragEventHandler = (event, node) => {
   event.preventDefault()
   event.dataTransfer.dropEffect = "move"
   // event.dataTransfer.effect = "move"
   node.style['background-color'] = node.dataset.dropbg
}

const dragOver: dragEventHandler = (event, _) => {
   event.preventDefault()
   event.dataTransfer.dropEffect = "move"
}

const dragLeave: dragEventHandler = (_, node) => {
   node.style['background-color'] = null
}

const drop: dragEventHandler = (event, node, {store}) => {
   const data = event.dataTransfer.getData('text/plain')
   store.add(JSON.parse(data))
   node.style['background-color'] = null
}

const dragEnd: dragEventHandler = (_, node) => {
   node.style['background-color'] = null
}