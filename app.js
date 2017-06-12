class App {
    constructor(){
        this.l1 = []
        this.l2 = []
        this.l3 = []
        this.list1 = document.querySelector('#list1')
        this.list2 = document.querySelector('#list2')
        this.list3 = document.querySelector('#list3')
        this.template = document.querySelector(".template")
        document.querySelector('#entry-form').addEventListener('submit', this.addEntry.bind(this))
    }

    addEntry(ev){
        ev.preventDefault()
        const f = ev.target
        const entry = {
            id: this.max + 1,
            text: f.text.value,
            fave: false,
            category: f.category.value,
        }
        this.insert(entry)
        f.reset()
    }

    insert(entry){
        const li = this.renderListItem(entry)
        const list = this.getList(entry)
        list.insertBefore(li, list.firstChild)
    }

    renderListItem(entry){
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = entry.id
        item
            .querySelector('.text')
            .textContent = entry.text
        item
            .querySelector('.text')
            .setAttribute("title", entry.text)
        /*item
            .querySelector('.text')
            .addEventListener('keypress', this.saveOnEnter.bind(this, entry))
        /*item
            .querySelector('button.remove')
            .addEventListener('click', this.removeentry.bind(this))

        item
            .querySelector('button.fav')
            .addEventListener('click', this.faventry.bind(this, entry))

        item
            .querySelector('button.move-up')
            .addEventListener('click', this.moveUp.bind(this, entry))

        item
            .querySelector('button.move-down')
            .addEventListener('click', this.moveDown.bind(this, entry))

        item
            .querySelector('button.edit')
            .addEventListener('click', this.edit.bind(this, entry))*/

        if(entry.fave === true){
            item.classList.add("fav")
            item.querySelector("button.fav > i").classList.remove("fa-star-o")
            item.querySelector("button.fav > i").classList.add("fa-star")
        }

        return item
    }

    getList(entry){
        let list
        switch (entry.category){
            case "What": list = this.list1
            break
            case "How": list = this.list2
            break
            case "Explore": list = this.list3
            break
            default:
            break
        }
        return list
    }
}

const app = new App()