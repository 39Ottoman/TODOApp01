$(loaded);

function loaded() {
    loadTodo();

    $('#formButton').click(function () {
        saveText();
        loadTodo();
    });
}

function loadTodo() {
    var todoList = $("#todoList");
    todoList.children().remove();
    var solvedTodoList = $("#solvedTodoList");
    solvedTodoList.children().remove();

    var key, value, unsolved = [], solved = [];
    for (var i = 0; i < localStorage.length; i++) {
        key = localStorage.key(i);
        value = loadData(key);
        
        if(value.checked) {
            solved.push('<input type="checkbox" class ="todo" id="' + key + '" checked><label for="' + key + '">' + value.text + '</label>');
        } else {
            unsolved.push('<input type="checkbox" class ="todo" id="' + key + '"><label for="' + key + '">' + value.text + '</label>');
        }
    }
    unsolved.reverse();
    todoList.append(unsolved.join(''));
    solved.reverse();
    solvedTodoList.append(solved.join(''));
    
    loadICheck();
}

function loadICheck() {
    $(".todo").each(function () {
        var self = $(this);
        var label = self.next();
        var labelText = label.text();

        label.remove();
        self.iCheck({
            checkboxClass: 'icheckbox_line-aero',
            insert: '<div class="icheck_line-icon"></div>' + labelText
        });
    });
    setChangedEvent();
}

function setChangedEvent() {
    $(".todo").on("ifChanged", function (evt) {
        var key = evt.currentTarget.id;
        var data = loadData(key);
        var checked = $(this).prop("checked");
        data.checked = checked;
        saveData(data, key);
        loadTodo();
    });
}

function saveText() {
    var text = $("#formText");

    if (checkText(text.val())) {
        var data = {
            text: text.val(),
            checked: false
        };
        saveData(data);
        text.val("");
    }
}

function escapeText(text) {
    return $('<div>').text(text).html();
}

function checkText(text) {
    if (0 === text.length || 20 < text.length) {
        alert("文字数は1～20字にしてください");
        return false;
    }

    var length = localStorage.length;
    for (var i = 0; i < length; i++) {
        var key = localStorage.key(i);
        var value = loadData(key).text;
        if (text === value) {
            alert("同じ内容は避けてください");
            return false;
        }
    }
    return true;
}

function saveData(data, time) {
    time = (time === undefined)? new Date(): time;
    var text = escapeText(JSON.stringify(data));
    console.log("save: " + text);
    localStorage.setItem(time, escape(text));
}

function loadData(time) {
    return JSON.parse(escapeText(unescape(localStorage.getItem(time))));
}
