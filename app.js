class App {
    constructor(){
        this.max = 0
        this.l1 = []
        this.l2 = []
        this.l3 = []
        this.list1 = document.querySelector('#list1')
        this.list2 = document.querySelector('#list2')
        this.list3 = document.querySelector('#list3')
        this.template = document.querySelector(".template")
        document.querySelector('#entry-form').addEventListener('submit', this.addEntry.bind(this))
        this.load()
        this.max = JSON.parse(localStorage.getItem("max"))
        document.querySelector(".button.clear").addEventListener("click", function() {
            localStorage.removeItem("l1")
            localStorage.removeItem("l2")
            localStorage.removeItem("l3")
            localStorage.removeItem("max")
            location.reload()
        })
    }

    save(){
        localStorage.setItem("l1", JSON.stringify(this.l1))
        localStorage.setItem("l2", JSON.stringify(this.l2))
        localStorage.setItem("l3", JSON.stringify(this.l3))
    }

    load(){
        const l1 = JSON.parse(localStorage.getItem('l1'))
        const l2 = JSON.parse(localStorage.getItem('l2'))
        const l3 = JSON.parse(localStorage.getItem('l3'))
        if(l1){
            l1.reverse().map(this.insert.bind(this))
        }
        if(l2){
            l2.reverse().map(this.insert.bind(this))
        }
        if(l3){
            l3.reverse().map(this.insert.bind(this))
        }
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
        if (entry.id > this.max) {
            this.max = entry.id
        }
        this.getL(entry).unshift(entry)
        this.save()
        localStorage.setItem("max", JSON.stringify(this.max))
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
        item
            .querySelector('.text')
            .addEventListener('keypress', this.saveOnEnter.bind(this, entry))
        item
            .querySelector('button.remove')
            .addEventListener('click', this.remove.bind(this, entry))

        item
            .querySelector('button.fav')
            .addEventListener('click', this.fave.bind(this, entry))

        item
            .querySelector('button.move-up')
            .addEventListener('click', this.moveUp.bind(this, entry))

        item
            .querySelector('button.move-down')
            .addEventListener('click', this.moveDown.bind(this, entry))

        item
            .querySelector('button.edit')
            .addEventListener('click', this.edit.bind(this, entry))

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

    getL(entry){
        let list
        switch (entry.category){
            case "What": list = this.l1
            break
            case "How": list = this.l2
            break
            case "Explore": list = this.l3
            break
            default:
            break
        }
        return list
    }

    saveOnEnter(entry, ev){
        if(ev.key === 'Enter'){
            this.edit(entry, ev)
        }
    }

    edit(entry, ev){
        const li = ev.target.closest(".entry")
        const text = li.querySelector(".text")
        const btn = li.querySelector(".edit.button")
        const icon = btn.querySelector("i")
        if(text.isContentEditable){
            text.contentEditable = false;
            icon.classList.remove("fa-check")
            icon.classList.add("fa-pencil")
            entry.text = text.textContent
            this.save()
        }else{
            text.contentEditable = true;
            text.focus()
            icon.classList.remove("fa-pencil")
            icon.classList.add("fa-check")
        }
    }

    remove(entry, ev){
        const li = ev.target.closest('.entry')
        const index = this.getL(entry).findIndex((curr, i) => {
            return curr.id === entry.id
        })

        this.getL(entry).splice(index, 1)

        li.remove()
        this.save()
    }

    fave(entry, ev){
        const li = ev.target.closest('.entry')
        entry.fave = !entry.fave
        li.classList.toggle("fav")
        if(li.classList.contains("fav")){
            li.querySelector("button.fav > i").classList.remove("fa-star-o")
            li.querySelector("button.fav > i").classList.add("fa-star")
        }else{
            li.querySelector("button.fav > i").classList.remove("fa-star")
            li.querySelector("button.fav > i").classList.add("fa-star-o")
        }
        this.save()
    }

    moveUp(entry, ev){
        const li = ev.target.closest('.entry')

        const l = this.getL(entry)

        const index = l.findIndex((curr, i) => {
            return curr.id === entry.id
        })

        const list = this.getList(entry)

        if(index > 0){
            list.insertBefore(li, li.previousElementSibling)
            const prev = l[index-1]
            l[index-1] = entry
            l[index] = prev
            this.save()
        }
    }

    moveDown(entry, ev){
        const li = ev.target.closest('.entry')

        const l = this.getL(entry)

        const index = l.findIndex((curr, i) => {
            return curr.id === entry.id
        })

        const list = this.getList(entry)

        if(index < l.length-1){
            list.insertBefore(li.nextElementSibling, li)
            const next = l[index+1]
            l[index+1] = entry
            l[index] = next
            this.save()
        }
    }
}

const app = new App()