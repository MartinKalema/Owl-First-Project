const {Component, mount, xml, useState} = owl

class Root extends Component{
    static template = xml`
    <div>
        <div class="input-group-lg w-100 d-flex border rounded p-2 align-items-center">
            <input type="text" class="form-control-lg flex-fill border-0 me-1"
                placeholder="Add your new task" aria-label="Recipient's username"
                aria-describedby="basic-addon2"/>
            <input type="color" class="form-control-lg form-control-color border-0 bg-white m-0"
                id="exampleColorInput" value="#563d7c" title="Choose your color"/>
            <button class="btn btn-primary" type="button" id="button-addon2"><i
                    class="bi bi-plus-lg fs-3"></i></button>
        </div>
    </div>

    <ul class="d-flex flex-column mt-5 p-0">
        <t t-foreach="tasks" t-as="task" t-key="task">
            <li class="d-flex align-items-center justify-content-between border p-3 mb-2 rounded">
                <div class="form-check form-switch fs-5">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label class="form-check-label" for="flexCheckDefault">
                        Default checkbox
                    </label>
                </div>
                <div>
                    <button class="btn btn-primary me-2"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-danger"><i class="bi bi-trash"></i></button>
                </div>

            </li>
        </t>
    </ul>`

    setup(){
        this.tasks = useState([1,2,3])
    }
}

mount(Root, document.getElementById('root'))