document.addEventListener("DOMContentLoaded", function() {
    // Fetch existing items and populate the list on page load
    fetch('/getTodoList')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // console.log("Data received:", data);
            populateTodoList(data);
        })
        .catch(error => {
            console.error("Error fetching data:", error.message);
        });

    function populateTodoList(items) {
        var todoList = document.getElementById("todoList");
        todoList.innerHTML = ""; // Clear existing items

        items.forEach(function(item) {
            var listItem = document.createElement("li");
            listItem.textContent = item.Task;
            todoList.appendChild(listItem);
        });
    }

    console.log(document.getElementById("newTodo").value);


    // Uncomment and modify the code below once the initial fetching is working
    
    document.getElementById("submitbutton").onclick=  function addTodo() {
        console.log("Adding new todo");
        var newTodo = document.getElementById("newTodo").value;

        if (newTodo) {
            fetch('/addTodo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newTodo: newTodo }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(responseData => {
                console.log(responseData);

                // After adding the item, refresh the list
                fetch('/getTodoList')
                    .then(response => response.json())
                    .then(data => {
                        populateTodoList(data);
                    })
                    .catch(error => {
                        console.error("Error fetching updated data:", error.message);
                    });
            })
            .catch(error => {
                console.error("Error adding todo:", error.message);
            });

            // Clear the input box after adding the item
            document.getElementById("newTodo").value = "";
        }
    }
    
});

