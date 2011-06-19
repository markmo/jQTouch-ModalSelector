function ModalSelector(options) {
    var selector = $('.selector');
    if (selector.length) {
        selector.show();
    } else {
        this.createSelector(options);
    }
}

ModalSelector.prototype.createSelector = function(options) {
    var selector = $('<div/>').addClass('selector');
    var header = $('<div/>').addClass('header').addClass('glossBlue');
    header.text(options.headerText);
    selector.append(header);
    var wrapper = $('<div id="wrapper"/>');
    var scroller = $('<div id="scroller"/>');
    var list = $('<ul id="selectorlist"/>');
    var ms = this;
    if (options.items && options.items.length > 0) {
        $.each(options.items, function(index, value) {
            // list.append(ms.createItem(index, value, ['acctName'], '100.00', ['acctAmountNoArrow', 'posbalance']));
            list.append(ms.createItem(index, value[0], value[1].split(' '), value[2], value[3].split(' ')));
        });
    } else {
        list.append('<li>' + options.noItemsMessage + '</li>');
    }
    scroller.append(list);
    wrapper.append(scroller);
    selector.append(wrapper);
    var footer = $('<div/>').addClass('footer')
        .append('<span id="selectorBtn" class="button glossBlue">' +
                options.btnTitle + '</span>');
    selector.append(footer);
    $('body').append(selector);
    var myScroll = new iScroll('wrapper', {
        hScroll: false,
        vScrollbar: true,
        pullToRefresh: 'up',
        onPullUp: function() {
            alert('Pull Up called');
            myScroll.refresh(); // IMPORTANT!
        }
    });
    var btn = $('#selectorBtn');
    btn.bind('touchdown mousedown', function() {
        $(this).removeClass('glossBlue');
        $(this).addClass('glossBlueActive');
    });
    btn.bind('touchup mouseup', function() {
        $(this).removeClass('glossBlueActive');
        $(this).addClass('glossBlue');
    });
    new FastButton(btn.get(0), function(event) {
        selector.hide();
        if (options.cancelCallback != undefined)
            options.cancelCallback();
    });
    list.find('.item').each(function(index, elem) {
        new FastButton(elem, function() {
            selector.hide();
            if (options.selectedItemCallback != undefined)
                options.selectedItemCallback(index);
        });
    });
    selector.show();
};

ModalSelector.prototype.createItem = function(index, title, titleClasses, amount, amountClasses) {
    var li = $('<li/>');
    var a = $('<span id="item_' + index + '"/>').addClass('item');
    var titleDiv = $('<div/>');
    if ($.isArray(titleClasses)) {
        $.each(titleClasses, function(index, value) {
            titleDiv.addClass(value);
        });
    } else
    if (titleClasses.length > 0) {
        titleDiv.addClass(titleClasses);
    }
    titleDiv.addClass('left');
    titleDiv.text(title);
    a.append(titleDiv);
    var amountDiv = $('<div/>');
    if ($.isArray(amountClasses)) {
        $.each(amountClasses, function(index, value) {
            amountDiv.addClass(value);
        });
    } else
    if (amountClasses.length > 0) {
        amountDiv.addClass(amountClasses);
    }
    amountDiv.addClass('right');
    amountDiv.text(amount);
    a.append(amountDiv);
    li.append(a);
    return li;
};
