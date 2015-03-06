$(loaded);

function loaded() {
    loadTodo();

    $('#formButton').click(function () {
        saveText();
        loadTodo();
    });

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
    $(".todo").on("ifChanged", function (evt) {
        console.log(evt.currentTarget.id);
        var key = evt.currentTarget.id;
        var data = JSON.parse(escapeText(unescape(localStorage.getItem(key))));
        console.log("29", data);
        var checked = $(this).prop("checked");
        data.checked = checked;
        var val = escapeText(JSON.stringify(data));
        localStorage.setItem(key, escape(val));
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

function loadTodo() {
    var todoList = $("#todoList");
    todoList.children().remove();

    var key, value, checked, unsolved = [];
    for (var i = 0; i < localStorage.length; i++) {
        key = localStorage.key(i);
        value = JSON.parse(escapeText(unescape(localStorage.getItem(key))));
        checked = value.checked ? "checked" : "";
        unsolved.push('<input type="checkbox" class ="todo" id="' + key + '" ' + checked + '><label for="' + key + '">' + value.text + '</label>');
        
    }
    unsolved.reverse();
    todoList.append(unsolved.join(''));

    loadICheck();
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
        var value = localStorage.getItem(key);
        if (text === value) {
            alert("同じ内容は避けてください");
            return false;
        }
    }

    return true;
}

function saveData(data) {
    var time = new Date();
    var text = escapeText(JSON.stringify(data));
    console.log("save: " + text);
    localStorage.setItem(time, escape(text));
}

function loadData(text) {

}
