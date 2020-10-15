const { LinkedList } = require('./LinkedList');

class HashMap {
    constructor(initialCapacity=8) {
        this.length = 0;
        this._hashTable = [];
        this._capacity = initialCapacity;
        this._deleted = 0;
    }

    get(key) {
        const [ index ] = this._findSlot(key);
        if (this._hashTable[index] === undefined) {
            return undefined;
        }
        if (!this._hashTable[index].value) {
            let curr = this._hashTable[index].head;
            while (curr !== null) {
                if (curr.value.key === key) {
                    return curr.value.value;
                }
                curr = curr.next;
            }
            return 'Key not found';
        }
        return this._hashTable[index].value;
    }

    set(key, value){
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        if (loadRatio > this.MAX_LOAD_RATIO) {
            this._resize(this._capacity * this.SIZE_RATIO);
        }
        //Find the slot where this key should be in
        const [index, linkedListNeeded] = this._findSlot(key);

        if (linkedListNeeded) {
            if (this._hashTable[index].value) {
                const linkedList = new LinkedList();
                linkedList.insertFirst(this._hashTable[index]);
                linkedList.insertLast({
                    key,
                    value,
                    DELETED: false
                });
                this._hashTable[index] = linkedList;
            } else {
                this._hashTable[index].insertLast({
                    key,
                    value,
                    DELETED: false
                });
            };
        } else {
            if(!this._hashTable[index]){
                this.length++;
            }
            this._hashTable[index] = {
                key,
                value,
                DELETED: false
            }; 
        }
    }

    setLinkedList(list) {
        const [index] = this._findSlot(list.head.next.value.key);
        this._hashTable[index] = list;
    }

    delete(key) {
        const index = this._findSlot(key);
        const slot = this._hashTable[index];
        if (slot === undefined) {
            throw new Error('Key error');
        }
        slot.DELETED = true;
        this.length--;
        this._deleted++;
    }

    printKeys() {
        for (let i = 0; i < this.length; i++) {
            if (this._hashTable[i] !== undefined) {
                console.log(this._hashTable[i].key);
            }
        }
    }

    searchForValue(value) {
        for (let item of this._hashTable) {
            if (item && item.value === value) {
                return item;
            }
        }
        return false;
    }

    _findSlot(key) {
        const hash = HashMap._hashString(key);
        const start = hash % this._capacity;

        for (let i=start; i<start + this._capacity; i++) {
            const index = i % this._capacity;
            const slot = this._hashTable[index];
            if ((slot === undefined || (slot.key === key && !slot.DELETED)) ) {
                return [index, false];
            } 
            
            return [index, true];
        }
    }

    _resize(size) {
        const oldSlots = this._hashTable;
        this._capacity = size;
        // Reset the length - it will get rebuilt as you add the items back
        this.length = 0;
        this._deleted = 0;
        this._hashTable = [];

        for (const slot of oldSlots) {
            if (slot !== undefined && !slot.DELETED) {
                if (!slot.key) {
                    this.setLinkedList(slot);
                } else {
                    this.set(slot.key, slot.value);
                }   
            }
        }
    }

    static _hashString(string) {
        let hash = 5381;
        for (let i = 0; i < string.length; i++) {
            //Bitwise left shift with 5 0s - this would be similar to
            //hash*31, 31 being the decent prime number
            //but bit shifting is a faster way to do this
            //tradeoff is understandability
            hash = (hash << 5) + hash + string.charCodeAt(i);
            //converting hash to a 32 bit integer
            hash = hash & hash;
        }
        //making sure hash is unsigned - meaning non-negtive number. 
        return hash >>> 0;
    }
}

function main() {
    const lotr = new HashMap();
    lotr.MAX_LOAD_RATIO = 0.5;
    lotr.SIZE_RATIO = 3;

    const data = [
        { "Hobbit": "Bilbo" }, 
        { "Hobbit": "Frodo" }, // Duplicate key replaces old value
        { "Wizard": "Gandalf" }, 
        { "Human": "Aragorn" }, 
        { "Elf": "Legolas" }, 
        { "Maiar": "The Necromancer" },
        { "Maiar": "Sauron" }, // Duplicate key replaces old value
        { "RingBearer": "Gollum" }, 
        { "LadyOfLight": "Galadriel" }, 
        { "HalfElven": "Arwen" },
        { "Ent": "Treebeard" },
    ];
    data.forEach(obj => {
        for (const [key, value] of Object.entries(obj)) {
            lotr.set(key, value);
        }
    });
    console.log(lotr)
    console.log(lotr.get('Human'));
}

main();