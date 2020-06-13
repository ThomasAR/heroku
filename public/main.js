var WEB_SERVER_URL = "http://192.168.1.116:3005"


let loadTasks = () => {
    $.ajax({
        url: WEB_SERVER_URL + "/getTasks",
        success: function(res){
            console.log(res)
            let task_list = "";
            res.forEach(t => {
                task_list += `
                <div class="card">
                    <div class="card-body">
                        ${t.name}
                    </div>
                </div>
                `
            })
            $("#task-cards").html(task_list)
      },
      error: function(err){
          console.log(err);
      }
    });
}

let newTask = (name, category, description) => {
    // let qqs = "?&name=" + name;
    // qqs += "&category=" + category;
    // qqs += "&description=" + description;
    $.ajax({
        url: WEB_SERVER_URL + "/newTask",
        data: {
            name: name,
            category: category,
            description: description
        },
        // dataType: "json",
        success: function(res){
            console.log("success")
            console.log(res);
      },
      error: function(err){
          console.log("error")
          console.log(err);
      }
    });
}

$(document).ready(function() {
    console.log("serving")

    loadTasks();

    $("#add-new-task").on("click", () => {
        let task_name = $("#task-name").val();
        let task_category = $("#task-category-select").val();
        let task_description = $("#task-description").val();

        newTask(task_name, task_category, task_description)
        loadTasks();
    })
})
