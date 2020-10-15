class _Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;  // The beginning of the list
    }

    insertFirst(item) {
        this.head = new _Node(item, this.head);  // Move the head to the new first item in the list
    }

    insertBefore(item, key) {
        // If key is first item in list
        if (this.head.value === key) {
            this.insertFirst(item);
        } else {
            let currNode = this.head;
            let previousNode = this.head;

            // Cycle through list until key is found
            while((currNode !== null) && (currNode.value !== key)) {
                previousNode = currNode;
                currNode = currNode.next;
            }
            if (currNode.value === key) {
                previousNode.next = new _Node(item, currNode);
            }
            if (currNode === null) {
                console.log('key not found');
                return;
            }
        }
    }

    insertAfter(item, key) {
        let currNode = this.head;
        let nextNode = this.head.next;

        while((nextNode !== null) && (currNode.value !== key)) {
            currNode = nextNode;
            nextNode = currNode.next;
        }

        if (currNode.value === key) {
            currNode.next = new _Node(item, nextNode);
            return;
        }
        if (nextNode === null) {
            console.log('key not found');
            return;
        }
    }

    insertAt(item, position) {
        if (position === 0) {
            this.insertFirst(item);
        } else {
            let index = 1;
            let previousNode = this.head;
            let currNode = this.head.next;

            while (index <= position) {
                if (index === position) {
                    currNode = new _Node(item, currNode);
                    previousNode.next = currNode;
                    return;
                } else {
                    previousNode = currNode;
                    currNode = currNode.next;
                    index++;
                }
            }
            if (index === position) {
                console.log('position longer than list');
                return;
            }
        }
    }

    insertLast(item) {
        if (this.head === null) {  // If there are no items in the list yet
            this.insertFirst(item);
        } else {
            // Cycle through the nodes until you get to the one with a null pointer, indicating the end of the list
            let tempNode = this.head;
            while (tempNode.next !== null) {
                tempNode = tempNode.next;
            }
            // Create a new node for the new end of the list, set last item's pointer to it
            tempNode.next = new _Node(item, null);
        }
    }

    find(item) {
        // Start at the head
        let currNode = this.head;
        // If the list is empty, item does not exist
        if (!this.head) {
            return null;
        }
        // Check for the item
        while (currNode.value !== item) {
            // Return null if it's the end of the list and the item is not on the list
            if (currNode.next === null) {
                return null;
            } else {
                // Otherwise keep looking
                currNode = currNode.next;
            }
        }
        // Found it
        return currNode;
    }

    remove(item) {
        // If the list is empty
        if (!this.head) {
            return null;
        }
        // If the node to be removed is head, make the next node head
        if (this.head.value === item) {
            this.head = this.head.next;
            return;
        }
        // Start at the head
        let currNode = this.head;
        // Keep track of previous
        let previousNode = this.head;

        while((currNode !== null) && (currNode.value !== item)) {
            // Save the previous node
            previousNode = currNode;
            currNode = currNode.next;
        }
        if (currNode === null) {
            console.log('Item not found');
            return;
        }
        // Set the node before the deleted node's pointer to be the node after the deleted node
        previousNode.next = currNode.next;
    }
}



function display(linkedList) {
    let list = '';

    let curr = linkedList.head;
    while (curr !== null) {
        list = list + ' ' + curr.value;
        curr = curr.next;
    }
    console.log(list);
}

function size(linkedList) {
    let index = 0;
    let curr = linkedList.head;
    while (curr !== null) {
        index++;
        curr = curr.next;
    }
    console.log(index);
}

function isEmpty(linkedList) {
    if (linkedList.head === null) {
        console.log(true);
        return;
    }
    console.log(false);
    return;
}

function findPrevious(linkedList, item) {
    if (linkedList.head === null) {
        console.log('List is empty');
        return;
    } else if (linkedList.head.value === item) {
        console.log('Item is first in list');
        return;     
    } else {
        let previous = linkedList.head;
        let curr = previous.next;
        while (curr !== null) {
            if (curr.value === item) {
                console.log(previous.value);
                return;
            }
            previous = curr;
            curr = curr.next;
        }
        console.log('Item not found');
        return;
    }
}

function findLast(linkedList) {
    if (linkedList.head === null) {
        console.log('List is empty');
        return;
    } else {
        let curr = linkedList.head;
        while (curr.next !== null) {
            curr = curr.next;
        }
        console.log(curr.value);
        return;
    }
}

// O(n^2); remove redundant values from list
function WhatDoesThisProgramDo(lst) {
    let current = lst.head;
    while (current !== null) {
        let newNode = current;
        while (newNode.next !== null) {
            if (newNode.next.value === current.value) {
                newNode.next = newNode.next.next;
            }
            else {
                newNode = newNode.next;
            }
        }
        current = current.next;
    }
}

function reverseAListIteratively(linkedList) {
    let prev = linkedList.head;
    let cur = linkedList.head.next;
    if (prev.next === null) {
        return;
    }
    while (cur.next !== null) {
        let temp = cur.next;
        if (prev === linkedList.head) {
            prev.next = null;
            cur.next = prev;
            prev = cur;
            cur = temp;
        } else {
            cur.next = prev;
            prev = cur;
            cur = temp;
        }
    }
    if (cur.next === null) {
        cur.next = prev;
        linkedList.head = cur;
    }
    return;
}

function reverseAListRecursive(list) {
    function reverse(prev, next) {
        if (prev.next === null) {
            return;
        }
        if (next.next === null) {
            list.head = next;
            return next.next = prev;

        } else {
            let temp = next.next;
            if (prev === list.head) {
                prev.next = null;
                next.next = prev;
                return reverse(next, temp);
            } else {
                next.next = prev;
                return reverse(next, temp);
            }
        }
    }
    reverse(list.head, list.head.next);
}

function thirdFromTheEnd(list) {
    let cur = list.head;

    while (cur.next.next.next !== null) {
        cur = cur.next;
    }

    console.log(cur.value);
    return;
}

function middleOfList(list) {
    let index = 0;
    let curr = list.head;
    while (curr !== null) {
        index++;
        curr = curr.next;
    }
    
    const size = index;
    
    if (size % 2 === 0) {
        console.log('List has no middle element');
        return;
    }

    const middle = size/2 - 0.5;
    curr = list.head;
    let i = 1;
    while (i <= middle) {
        curr = curr.next;
        i++
    } 

    console.log(curr.value);
    return;
}

function cycleList(list) {
    
    let outerCurr = list.head;
    while (outerCurr !== null) {
        let innerCurr = outerCurr.next;
        while (innerCurr !== null) {
            if (innerCurr.next === outerCurr) {
                return true;
            }
            innerCurr = innerCurr.next;
        }
        outerCurr = outerCurr.next;
    }
    return false;
}

function createCycle(list) {
    let curr = list.head;
    while (curr.next !== null) {
        curr = curr.next;
    }
    curr.next = list.head;
}

function sortList(list) {
    let temp;

    let curr = list.head;
    while (curr.next !== null) {
        if (curr.next.value < curr.value) {
            temp = curr.value;
            curr.value = curr.next.value;
            curr.next.value = temp;
            curr = list.head;
        } else {
            curr = curr.next;
        }
    }
}

function main() {
    const SLL = new LinkedList();

    SLL.insertLast('Apollo');
    SLL.insertLast('Boomer');
    SLL.insertLast('Helo');
    SLL.insertLast('Husker');
    SLL.insertLast('Starbuck');
    SLL.insertLast('Tauhida');
    SLL.remove('Husker');
    SLL.insertBefore('Athena', 'Boomer');
    SLL.insertAfter('Hotdog', 'Helo');
    SLL.insertAt('Kat', 3);
    SLL.remove('Tauhida');

    const empty = new LinkedList();
    display(SLL);
    size(SLL);
    isEmpty(SLL);
    isEmpty(empty);
    findPrevious(SLL, 'Apollo');
    findPrevious(SLL, 'Tauhida');
    findPrevious(SLL, 'Kat');
    findLast(SLL);
    display(SLL);
    reverseAListIteratively(SLL);
    display(SLL);
    thirdFromTheEnd(SLL)
    middleOfList(SLL);
    console.log(cycleList(SLL));
    createCycle(SLL)
    console.log(cycleList(SLL));
    const nums = new LinkedList();
    nums.insertLast(3)
    nums.insertLast(2)
    nums.insertLast(5)
    nums.insertLast(7)
    nums.insertLast(1)
    sortList(nums)
    display(nums)
}


module.exports = {
    _Node,
    LinkedList
};