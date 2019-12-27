$(() => {
    const H = 1;
    const V = 2;
    const HV = 3;
    const SIZE = 80;
    const BORDER = 2;
    const MARGIN = 2;

    const addCell = (row, col, type, text) => {
        let width = SIZE,
            height = SIZE,
            top = MARGIN * row + (SIZE * (row - 1) + BORDER * 2 * row),
            left = MARGIN * col + (SIZE * (col - 1) + BORDER * 2 * col),
            rectangle = SIZE * 2 + BORDER * 2 + MARGIN;
        switch (type) {
            case H: width = rectangle; break;
            case V: height = rectangle; break;
            case HV: height = width = rectangle; break;
        }
        const cell = $('<div class="item figure-' + type + '"/>').css({
            top: top,
            left: left,
            width: width,
            height: height
        }).append('<span class="text">'+text+'</span>');
        $('#game').append(cell);
    };

    addCell(1, 1, V, '&#x1f33f;');
    addCell(1, 2, HV, '&#x1f43c;');
    addCell(1, 4, V, '&#x1f33f;');
    addCell(3, 1, V, '&#x1f33f;');
    addCell(3, 4, V, '&#x1f33f;');
    addCell(3, 2, H, '&#x1f343;');
    addCell(4, 2, null, '&#x1f9a5;');
    addCell(4, 3, null, '&#x1f99c;');
    addCell(5, 1, null, '&#x1f98e;');
    addCell(5, 4, null, '&#x1f41b;');

    const isIntersect = (pos, a, b) => {
        let aTop = pos.top,
            aLeft = pos.left,
            aBottom = aTop + a.height(),
            aRight = aLeft + a.width(),
            bTop = b.position().top,
            bLeft = b.position().left,
            bBottom = bTop + b.height(),
            bRight = bLeft + b.width();
        return !(
            bLeft > aRight ||
            bRight < aLeft ||
            bTop > aBottom ||
            bBottom < aTop
        );
    };

    $('.item').draggable({
        containment: "parent",
        stack: ".items",
        grid: [86, 86],
        drag: function(evt, ui) {
            let prev = $(this).data('prevPosition'),
                curr = ui.position,
                allowDrag = true,
                draggedItem = $(this);
            if (!prev) {
                $(this).data('prevPosition', ui.position);
                prev = ui.position;
            }
            if (prev && (curr.left !== prev.left || curr.top !== prev.top)) {
                $('.item').not(draggedItem).each(function(index, item){
                    if (isIntersect(curr, draggedItem, $(item))) {
                        return (allowDrag = false);
                    }
                });
                if (!allowDrag) {
                    return false;
                }
                $(this).data('prevPosition', ui.position);
            }
        }
    });
});
