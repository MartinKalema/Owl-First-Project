const {Component, mount, xml, useState} = owl

class Task extends Component{
    static template = xml`
    <li t-attf-style="background-color:#{state.color}" class="d-flex align-items-center    justify-content-between border p-3 mb-2 rounded">
        <div t-if="state.isEditing" class="d-flex align-items-center flex-grow-1">
            <input type="text" class="form-control me-2" t-model="state.name"/>
            <input type="color" style="width:60px" class="form-control-lg form-control-color border-0 bg-white m-0" title="Choose your color" t-model="state.color" />
        </div>
        <div t-if="!state.isEditing" class="form-check form-switch fs-5">
            <input class="form-check-input" type="checkbox" value="" t-att-checked="state.isCompleted" t-att-id="state.id" t-on-click="toggleTask" t-model="state.isCompleted"/>
            <label class="form-check-label" t-att-for="state.id" t-attf-class="#{state.isCompleted ? 'text-decoration-line-through' : ''}">
                <t t-esc="state.name"/>
            </label>
        </div> 
        <div>
            <button t-if="!state.isEditing" class="btn btn-primary me-2" t-on-click="editTask"><i class="bi bi-pencil"></i></button>
            <button t-if="state.isEditing" class="btn btn-primary me-2" t-on-click="saveTask"><i class="bi bi-check-lg"></i></button>
            <button class="btn btn-danger" t-on-click="deleteTask"><i class="bi bi-trash"></i></button>
        </div>

    </li>`

    static props =  ['task', 'onDelete', 'onEdit']

    setup(){
        this.state = useState({
            isEditing:false,
            id:this.props.task.id,
            name:this.props.task.name,
            color:this.props.task.color,
            isCompleted:this.props.task.isCompleted,

        })
    }

    editTask(){
        this.state.isEditing = true
    }

    saveTask(){
        this.state.isEditing = false
        this.props.onEdit(this.state)
    }

    toggleTask(){
        this.state.isCompleted = !this.state.isCompleted
    }

    deleteTask(){
        this.props.onDelete(this.props.task)
    }
}


class Root extends Component{
    static template = xml`
    <div>
        <div class="input-group-lg w-100 d-flex border rounded p-2 align-items-center">
            <input type="text" class="form-control-lg flex-fill border-0 me-1"
                placeholder="Add your new task" aria-label="Recipient's username"
                aria-describedby="basic-addon2" t-model="state.name" t-attf-value="state.name"/>
            <input type="color" class="form-control-lg form-control-color border-0 bg-white m-0"
             value="#563d7c" title="Choose your color" t-model="state.color" t-attf-value="state.color"/>
            <button class="btn btn-primary" type="button" id="button-addon2" t-on-click="addTask"><i
                    class="bi bi-plus-lg fs-3"></i></button>
        </div>
    </div>

    <ul class="d-flex flex-column mt-5 p-0">
        <t t-foreach="tasks" t-as="task" t-key="task.id">
            <Task task="task" onDelete.bind="deleteTask" onEdit.bind="editTask"/>
        </t>
    </ul>`

    //notes
    // t-model stores the values being selected.

    static components = {Task}

    setup(){
        // state of each task
        this.state = useState({
            name:"",
            color:"#fff000",
            isCompleted:false,
        })
        // store details for each task created
        this.tasks = useState([

        ])
    }
    
    //method to add tasks to the tasks array.
    addTask(){
        if(!this.state.name){
            alert("Please provide name of task")
            return
        }
        // generate random id
        const id= Math.random().toString().substring(2,6)

        this.tasks.push({
            id:id,
            name:this.state.name,
            color:this.state.color,
            isCompleted:this.state.isCompleted,
        })

        let state = this.state
        this.state = {...state, name:"", color:"#fff000"}

        console.log(this.tasks)

    }

    deleteTask(task){
        const index = this.tasks.findIndex(t=>t.id == task.id)
        this.tasks.splice(index, 1)
    }

    editTask(task){
        const index = this.tasks.findIndex(t=>t.id == task.id)
        this.tasks.splice(index, 1, task)
    }



    
}

mount(Root, document.getElementById('root'))